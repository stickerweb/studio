var PageTransitions = (function() {
	var $main = $( '#pages-container' ),
		$pages = $main.children( 'div.page-container' ),
		$iterate = $( '.global-menu__wrap a' ),
		animcursor = 1,
		pagesCount = $pages.length,
		current = 0,
		nextCurrent = 0,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;
	function init() {
		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );
		$pages.eq( current ).addClass( 'page-container-current' );		
        var animcursorCheck = function() {
            if( isAnimating ) {
                return false;
            }
            return animcursor;
        };
        $iterate.on( 'click', function(e) {
			e.preventDefault();
			nextCurrent = parseInt($(this).attr("data-num-id"));
			if(nextCurrent == current)
			{
				return false;
			}
			nextPage( animcursorCheck() );
        } );
	}
	function nextPage(options ) {
		var animation = (options.animation) ? options.animation : options;
		if( isAnimating ) {
			return false;
		}
		$(document).trigger("pageChanging");
		isAnimating = true;
		var $currPage = $pages.eq( current );
		current = nextCurrent;
		var $nextPage = $pages.eq( current ).addClass( 'page-container-current' ),
			outClass = '', inClass = '';
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-moveFromTopFade';
		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );
		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );
		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}
	}
	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
		$(document).trigger("pageChanged");
	}
	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' page-container-current' );
	}	
	init();	
	return {
		init : init,
		nextPage : nextPage
	};
})();

/* new page transation */
var PageTransitions2 = [];
$(".page-type-blog").each(function(){
	var newselector = ".page-type-blog[data-blog-id='"+$(this).attr("data-blog-id")+"']";
	PageTransitions2.push((function() {
		var $main = $( newselector + ' .inner-pages-container' ),
			$pages = $main.children( newselector + ' div.inner-page-container' ),
			$iterate = $( newselector + ' .blog-navigation' ),
			animcursor = 1,
			nextanim = 1,
			pagesCount = $pages.length,
			current = 0,
			nextCurrent = 0,
			isAnimating = false,
			endCurrPage = false,
			endNextPage = false,
			animEndEventNames = {
				'WebkitAnimation' : 'webkitAnimationEnd',
				'OAnimation' : 'oAnimationEnd',
				'msAnimation' : 'MSAnimationEnd',
				'animation' : 'animationend'
			},
			// animation end event name
			animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
			// support css animations
			support = Modernizr.cssanimations;	
		function init() {	
			$pages.each( function() {
				var $page = $( this );
				$page.data( 'originalClassList', $page.attr( 'class' ) );
			} );	
			$pages.eq( current ).addClass( 'inner-page-container-current' );			
			var animcursorCheck = function() {
				if( isAnimating ) {
					return false;
				}
				return animcursor;
			};	
			$iterate.on( 'click', function(e) {
				e.preventDefault();
				if($(this).hasClass("navigation-prev"))
				{
					if(current == 0)
					{
						nextCurrent = pagesCount-1;
					}
					else
					{
						nextCurrent--;
					}
					nextanim = 0;
				}
				if($(this).hasClass("navigation-next"))
				{
					if(current == pagesCount-1)
					{
						nextCurrent = 0;
					}
					else
					{
						nextCurrent++;
					}
					nextanim = 1;
				}
				nextPage(animcursorCheck());				
			} );	
		}	
		function nextPage(options ) {
			var animation = (options.animation) ? options.animation : options;	
			if( isAnimating ) {
				return false;
			}	
			isAnimating = true;	
			var $currPage = $pages.eq( current );	
			current = nextCurrent;			
			var $nextPage = $pages.eq( current ).addClass( 'inner-page-container-current' ),
				outClass = '', inClass = '';	
				if(nextanim == 1)
				{
					outClass = 'pt-page-moveToLeft';
					inClass = 'pt-page-moveFromRight';
				}
				else
				{
					outClass = 'pt-page-moveToRight';
					inClass = 'pt-page-moveFromLeft';
				}				
			$currPage.addClass( outClass ).on( animEndEventName, function() {
				$currPage.off( animEndEventName );
				endCurrPage = true;
				if( endNextPage ) {
					onEndAnimation( $currPage, $nextPage );
				}
			} );	
			$nextPage.addClass( inClass ).on( animEndEventName, function() {
				$nextPage.off( animEndEventName );
				endNextPage = true;
				if( endCurrPage ) {
					onEndAnimation( $currPage, $nextPage );
				}
			} );	
			if( !support ) {
				onEndAnimation( $currPage, $nextPage );
			}	
		}	
		function onEndAnimation( $outpage, $inpage ) {
			endCurrPage = false;
			endNextPage = false;
			resetPage( $outpage, $inpage );
			isAnimating = false;
		}	
		function resetPage( $outpage, $inpage ) {
			$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
			$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' inner-page-container-current' );
		}	
		init();	
		return {
			init : init,
			nextPage : nextPage
		};	
	})());	
});
<?php
if(!empty($_POST)){	
	$name = trim($_POST["name"]);
	$email = trim($_POST["email"]);
	$message = trim($_POST["message"]);		
	$recipient = "@"; // to email address
	$sender = '@'; //from email address
	$subject = 'Inquiry from website'; //email subject
	$message = '
		<html>
			<head> 
				<title>Inquiry from website</title>
			</head>
			<body> 
				<p><b>Name:</b> '.$name.'</p>
				<p><b>Email:</b> '.$email.'</p>
				<p><b>Message:</b> '.$message.'</p>				
			</body>
		</html>'; 
	$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
	$headers .= "From: $sender \r\n";	
	mail($recipient, $subject, $message, $headers);
	echo json_encode(array('status' => 'success'));	
	}else{
		echo json_encode(array('status' => 'error'));
	}
?>
<!DOCTYPE html>

<html>

<body>
<?php
echo 'unssetSession';
session_start();
	if(isset($_SESSION['email'])){
        
        unset($_SESSION['email']);
        header("location: ./SignIn/SignIn.php");
        }
        // unset($_SESSION['email']);
        // header("location: ./SignIn/SignIn.php");
 ?>
</body>
</html>
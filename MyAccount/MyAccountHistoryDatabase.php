<?php
$dbhost = "localhost";
$dbname = "c105dbSchema_1163093_1161564";
$dbuser = "c105_1163093_19";
$dbpass = "comp334!";

$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
$sqlStatement = "";
session_start();
if($_SESSION['email'] != "admin@store.ps") {
    $sqlStatement = ("SELECT * FROM orders WHERE customerID=".$_SESSION['customerID']."");
}else {
    $sqlStatement = ("SELECT * FROM orders");
}

$result = $pdo->query($sqlStatement);
$rows = $result->fetchAll();



echo json_encode($rows);
?>
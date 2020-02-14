<?php
session_start();
$dbhost = "localhost";
$dbname = "c105dbSchema_1163093_1161564";
$dbuser = "c105_1163093_19";
$dbpass = "comp334!";

$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);

$time = $_GET['time'];
$string =  json_decode($_GET['items']);

$status = "";
$sqlStatement = "INSERT INTO orders (customerID, productID, quantity, orderTime, orderDate) VALUES (?,?,?,?,?)";

foreach ($string as $str => $str_value) {
    $stmt = $pdo->prepare($sqlStatement);
    $status = $stmt->execute([$_SESSION['customerID'], $str_value->productID, $str_value->quantity, $time, date("Y/m/d")]);
}

echo json_encode($status);

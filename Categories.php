<?php

$dbhost = "localhost";
$dbname = "c105dbSchema_1163093_1161564";
$dbuser = "c105_1163093_19";
$dbpass = "comp334!";

$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);

// SELECT DISTINCT `category` FROM `products`
$sqlStatement = ("SELECT DISTINCT category FROM products ");

$result = $pdo->query($sqlStatement);
$rows = $result->fetchAll();

echo json_encode($rows);
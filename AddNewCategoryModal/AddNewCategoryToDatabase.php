<?php
$dbhost = "localhost";
$dbname = "c105dbSchema_1163093_1161564";
$dbuser = "c105_1163093_19";
$dbpass = "comp334!";

$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);

$sqlStatement = "INSERT INTO Categories (CategoryID, CategoryName, CategoryImg) VALUES (?,?,?)";
$stmt = $pdo->prepare($sqlStatement);
$status = $stmt->execute([$_GET['categoryID'], $_GET['categoryName'], $_GET['categoryImg']]);

echo json_encode($status);
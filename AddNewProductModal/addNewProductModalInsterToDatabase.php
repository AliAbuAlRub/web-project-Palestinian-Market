<?php

$dbhost = "localhost";
$dbname = "c105dbSchema_1163093_1161564";
$dbuser = "c105_1163093_19";
$dbpass = "comp334!";

$productName = $_GET['productName'];
$category = $_GET['category'];
$size = $_GET['size'];
$price = $_GET['price'];
$remarks = $_GET['remarks'];
$description = $_GET['description'];
$pictures = $_GET['images'];

$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);

$sqlStatement = "INSERT INTO products (productName, category, briefDescription, price, size, remarks, pictures) VALUES (?,?,?,?,?,?,?)";
$stmt = $pdo->prepare($sqlStatement);
$status = $stmt->execute([$productName, $category, $description, $price, $size, $remarks, $pictures]);

echo json_encode($status);
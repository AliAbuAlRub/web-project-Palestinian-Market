<?php

$dbhost = "localhost";
$dbname = "c105dbSchema_1163093_1161564";
$dbuser = "c105_1163093_19";
$dbpass = "comp334!";

$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);

$sqlStatement = ("UPDATE products SET  productName='" . $_GET['productName'] . "',
                 category='" . $_GET['category'] . "',
                 briefDescription='" . $_GET['description'] . "',
                 price='" . $_GET['price'] . "',
                 size='" . $_GET['size'] . "',
                 remarks='" . $_GET['remarks'] . "',
                 pictures='" . $_GET['images'] . "'
                 WHERE productID=" . $_GET['id'] . "
                 ");

$stmt = $pdo->prepare($sqlStatement);
$status = $stmt->execute();

echo json_encode($status);

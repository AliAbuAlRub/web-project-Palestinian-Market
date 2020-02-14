<?php

$dbhost = "localhost";
$dbname = "c105dbSchema_1163093_1161564";
$dbuser = "c105_1163093_19";
$dbpass = "comp334!";

$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);

$sqlStatement = ("UPDATE Categories SET  CategoryName='" . $_GET['categoryName'] . "',
                 CategoryImg='" . $_GET['categoryImg'] . "'
                 WHERE CategoryID='" . $_GET['categoryID'] . "'
                 ");

$stmt = $pdo->prepare($sqlStatement);
$status = $stmt->execute();

echo json_encode($status);
<?php
$dbhost = "localhost";
$dbname = "c105dbSchema_1163093_1161564";
$dbuser = "c105_1163093_19";
$dbpass = "comp334!";

$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);

$sqlStatement = ("SELECT * FROM Categories  WHERE CategoryID='" .  $_GET['categoryID'] . "'");

$result = $pdo->query($sqlStatement);
$row = $result->fetch();

echo json_encode($row);
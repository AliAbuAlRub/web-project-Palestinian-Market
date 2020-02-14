<?php
$dbhost = "localhost";
$dbname = "c105dbSchema_1163093_1161564";
$dbuser = "c105_1163093_19";
$dbpass = "comp334!";

$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);

$string =  json_decode($_GET['checkoutItems']);
$cartItemsArray = array();
$test = "";

foreach ($string as $str => $str_value) {
    $sqlStatement = ("SELECT * FROM products  WHERE productID='" .  $str_value->productID . "'");

    $result = $pdo->query($sqlStatement);
    $rows = $result->fetchAll();

    $prdoucts = getProducts($rows, $str_value->quantity);

    $cartItemsArray[] = $prdoucts;
}

echo json_encode($cartItemsArray);

function getProducts($rows, $quantity)
{

    $rows["quantity"] = $quantity;

    return $rows;
}

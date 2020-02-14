<?php
session_start();

$isAdminn = false;

if (isset($_SESSION['email'])) {
    if ($_SESSION['email'] == "admin@store.ps") {
        $isAdminn = true;
    }
}

echo json_encode($isAdminn);
?>
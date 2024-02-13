<?php
    include_once "../includes/function.php";
    include_once "../includes/connect.php";
    try {
        echo insertion($bdd, $_POST, $_GET['page']);
    } catch (Exception $th) {
        echo $th->getMessage();
    }
?>
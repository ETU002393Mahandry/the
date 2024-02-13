<?php
    include_once "../includes/function.php";
    include_once "../includes/connect.php";
    try {
        signup($bdd, $_POST);
    } catch (Exception $th) {
        echo $th->getMessage();
    }
?>
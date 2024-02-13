<?php
    include_once "../includes/function.php";
    include_once "../includes/connect.php";
    try {
        echo supprimer_def($bdd, $_GET['page']);
    } catch (Exception $th) {
        echo $th->getMessage();
    }
?>
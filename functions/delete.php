<?php
    include_once "../includes/function.php";
    include_once "../includes/connect.php";
    $condition=array();
    $condition[$_GET['col']]=$_GET['val'];
    try {
        echo supprimer($bdd, $condition,$_GET['page']);
    } catch (Exception $th) {
        echo $th->getMessage();
    }
?>
<?php
    include_once "../includes/function.php";
    include_once "../includes/connect.php";
    $condition=array();
    $condition[$_GET['col']]=$_GET['val'];
    try {
        echo modification($bdd,$_POST,$_GET['page'],$condition);
    } catch (Exception $th) {
        echo $th->getMessage();
    }
?>
<?php
    include_once "../includes/function.php";
    include_once "../includes/connect.php";
    
    
    /*try {
        echo supprimer($bdd,array(),$_GET['page']);
    } catch (Exception $th) {
        echo $th->getMessage();
    }*/
    $query = "DELETE FROM The_Saison";

    if ($bdd-> query($query) === true) {
        
    }
?>
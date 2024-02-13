<?php 
    include_once "../includes/function.php";
    include_once "../includes/connect.php";
    try {
        echo json_encode(recupererDonnees($bdd, $_GET['page']));
    } catch (Exception $th) {
        echo $th->getMessage();
    }

?>
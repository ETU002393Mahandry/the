<?php 
    include_once "../includes/function.php";
    include_once "../includes/connect.php";
    try {
        echo json_encode(recupererUnDonnee($bdd, $_GET['page'],$_GET['col'],$_GET['val']));
    } catch (Exception $th) {
        echo $th->getMessage();
    }

?>

<?php
    include_once "../includes/function.php";
    include_once "../includes/connect.php";

    header('Content-Type: application/json'); 

    $dateDebut = $_POST['datedebut_paiement'];
    $dateFin = $_POST['datefin_paiement'];

    $resultat = getListePaiement($bdd, $dateDebut, $dateFin);    
    
    echo json_encode($resultat); 

?>
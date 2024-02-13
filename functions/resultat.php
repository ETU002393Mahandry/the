<?php
include_once "../includes/function.php";
include_once "../includes/connect.php";
try {
    $poidsTotal = getPoidsTotal($bdd, $_POST['datedebut'], $_POST['datefin']);
    $poidsrestant = getPoidsRestant($bdd, $_POST['datedebut'], $_POST['datefin']);
    $prixRevient = getCoutRevient($bdd, $_POST['datedebut'], $_POST['datefin']);
    $tableau = array('poidsTotal'=> $poidsTotal, 'poidsrestant'=> $poidsrestant, 'prixRevient'=> $prixRevient);
    echo json_encode($tableau);
} catch (Exception $th) {
    echo $th->getMessage();
}
?>

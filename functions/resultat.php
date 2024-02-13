<?php
include_once "../includes/function.php";
include_once "../includes/connect.php";
try {
    echo json_encode(resultatGlobale($bdd,$_POST['datedebut'], $_POST['datefin']));
} catch (Exception $th) {
    echo $th->getMessage();
}
?>

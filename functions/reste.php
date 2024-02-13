<?php
include_once "../includes/function.php";
include_once "../includes/connect.php";
try {
    // $date = $_POST['datecueillette'];
    // $dateCourante = new DateTime($date); 
    // $mois = $dateCourante->format('m');
    // $annee = $dateCourante->format('Y');
    echo $_POST['datecueillette'];
    // $dateDebutMois = $annee . '-' . $mois . '-' . '01';
    // $poidsrestant = getPoidsRestant($bdd, $dateDebutMois, $date);
    // die($date);
    // echo json_encode($poidsrestant);
} catch (Exception $th) {
    echo $th->getMessage();
}
?>

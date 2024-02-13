<?php
    include_once "../includes/function.php";
    include_once "../includes/connect.php";

    try {
        echo json_encode(getnecessaryPrevisionGlobal($bdd, $_POST['date_prevision']));
    } catch (Exception $th) {
        echo $th->getMessage();
    }
?>
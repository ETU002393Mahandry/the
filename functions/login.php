<?php
    include_once "../includes/function.php";
    include_once "../includes/connect.php";

    $email = $_POST['email'];
    $mdp = $_POST['mdp'];
    try {
        echo json_encode(login($bdd, $email, $mdp));
    } catch (Exception $th) {
        echo $th->getMessage();
    }
?>
<?php
    session_start();
    require_once("../mvc/controllers/UserController.php");
    $user = new UserController();
    function pathwayController($user) {
        $result = $user->login($_POST);
        if($result) { foreach($result as $key => $value) { $_SESSION[$key] = $value; }; };
        ($result) ? die(json_encode(["status" => true, "message" => "Connexion effectuée.", "session" => $_SESSION])) : die(json_encode(["status" => false, "message" => "Erreur lors de la tentative de connexion."]));
    };
    pathwayController($user);
?>
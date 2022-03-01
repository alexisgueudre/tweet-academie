<?php
    require_once("../mvc/controllers/UserController.php");
    $user = new UserController();
    function pathwayController($user) {
        define("PATH", dirname(getcwd()));
        $result = $user->register($_POST, $_FILES, PATH . "/");
        $success = "Inscription réussie !";
        $failure = "Inscription échouée !";
        ($result) ? die(json_encode(["status" => true, "message" => $success])) : die(json_encode(["status" => false, "message" => $failure]));
    };
    function checkEmail($user) {
        $result = $user->isTaken("WHERE email = '" . $_GET["email"] . "'");
        $success = "Cette adresse email est disponible.";
        $failure = "Cette adresse email est déjà utilisée !";
        ($result) ? die(json_encode(["status" => true, "message" => $success])) : die(json_encode(["status" => false, "message" => $failure]));
    };
    function checkPhone($user) {
        $result = $user->isTaken("WHERE phone = '" . $_GET["phone"] . "'");
        $success = "Ce numéro de téléphone est disponible.";
        $failure = "Ce numéro de téléphone est déjà utilisé !";
        ($result) ? die(json_encode(["status" => true, "message" => $success])) : die(json_encode(["status" => false, "message" => $failure]));
    };
    (isset($_POST) && !empty($_POST)) ? pathwayController($user) : null;
    (isset($_GET["email"]) && !empty($_GET["email"])) ? checkEmail($user) : null;
    (isset($_GET["phone"]) && !empty($_GET["phone"])) ? checkPhone($user) : null;
?>
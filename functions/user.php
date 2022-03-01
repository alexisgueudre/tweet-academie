<?php
    require_once("../mvc/controllers/UserController.php");
    $user = new UserController();
    function pathwayController($user) {
        $result = $user->getResearchAndMentions("WHERE username LIKE '%" . $_POST["mention"] . "%'");
        die(json_encode(["mentions" => $result]));
    };
    (isset($_POST["mention"])) ? pathwayController($user) : null;
?>
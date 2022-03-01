<?php
    session_start();
    require_once("../mvc/controllers/UserController.php");
    $user = new UserController();
    function pathwayController($user) {
        $result = $user->deleteUser("WHERE user_id = " . $_GET["user"]);
        ($result) ? session_destroy() : null;
        die(json_encode(["status" => $result]));
    };
    pathwayController($user);
?>
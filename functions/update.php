<?php
    session_start();
    require_once("../mvc/controllers/UserController.php");
    $user = new UserController();
    function pathwayController($user) {
        define("PATH", dirname(getcwd()));
        $result = $user->updateProfile($_POST, $_FILES, $_SESSION["user_id"], $_SESSION["username"], PATH . "/");
        if($result) { foreach($result as $key => $value) { $_SESSION[$key] = $value; }; };
        ($result) ? die(json_encode(["status" => true])) : null;
    };
    pathwayController($user);
?>
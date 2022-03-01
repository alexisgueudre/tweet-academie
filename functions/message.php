<?php
    session_start();
    require_once("../mvc/controllers/MessageController.php");
    $message = new MessageController();
    function pathwayController($message, $action) {
        switch($action) {
            case "send":
                $result = $message->sendMessage($_SESSION["user_id"] . ", " . $_POST["receiver"] . ", '" . addslashes($_POST["message"]) . "'");
                die(json_encode(["status" => $result]));
            case "retrieve":
                $result = $message->getMessages($_SESSION["user_id"], $_GET["receiver"]);
                die(json_encode(["messages" => $result]));
            default :
                break;
        };
    };
    (isset($_SESSION["user_id"]) && isset($_POST["message"]) && isset($_POST["receiver"])) ? pathwayController($message, "send") : null;
    (isset($_SESSION["user_id"]) && empty($_POST) && isset($_GET["action"]) && $_GET["action"] == "retrieve" && isset($_GET["receiver"])) ? pathwayController($message, "retrieve") : null;
?>
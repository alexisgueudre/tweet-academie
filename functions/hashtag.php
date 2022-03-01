<?php
    session_start();
    require_once("../mvc/controllers/HashtagController.php");
    $hashtag = new HashtagController();
    function pathwayController($hashtag, $action) {
        switch($action) {
            case "save":
                $result = $hashtag->saveHashtags($_POST["hashtags"], $_POST["tweet"]);
                die(json_encode(["status" => $result]));
            default :
                break;
        };
    };
    (isset($_GET["action"]) && $_GET["action"] == "save") ? pathwayController($hashtag, "save") : null;
?>
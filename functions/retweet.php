<?php
    session_start();
    require_once("../mvc/controllers/TweetController.php");
    $tweet = new TweetController();
    function pathwayController($tweet) {
        $result = $tweet->retweet($_SESSION["user_id"], $_GET["tweet"]);
        ($result) ? die(json_encode(["status" => true, "message" => "Le retweet a été validé."])) : die(json_encode(["status" => false, "message" => "Le retweet a échoué."]));
    };
    (isset($_SESSION["user_id"]) && isset($_GET["action"]) && $_GET["action"] == "retweet" && isset($_GET["tweet"])) ? pathwayController($tweet) : null;
?>
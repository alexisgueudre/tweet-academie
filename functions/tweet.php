<?php
    session_start();
    require_once("../mvc/controllers/TweetController.php");
    $tweet = new TweetController();
    function pathwayController($tweet, $action) {
        switch($action) {
            case "tweet":
                $result = $tweet->tweet($_POST["tweet"], $_SESSION["user_id"]);
                die(json_encode(["status" => $result]));
            case "count":
                $count = (isset($_GET["user"])) ? $tweet->getTweets("WHERE tweets.user_id = " . $_GET["user"]) : $tweet->getTweets("WHERE tweets.user_id = " . $_SESSION["user_id"]);
                die(json_encode(["tweets" => sizeof($count)]));
            case "retrieve":
                $tweets = $tweet->getTweets();
                die(json_encode(["tweets" => $tweets, "logged" => $_SESSION["user_id"]]));
            case "profile":
                $tweets = (isset($_GET["user"])) ? $tweet->getTweets("WHERE tweets.user_id = " . $_GET["user"]) : $tweet->getTweets("WHERE tweets.user_id = " . $_SESSION["user_id"]);
                die(json_encode(["tweets" => $tweets, "logged" => $_SESSION["user_id"]]));
            case "upload":
                define("PATH", dirname(getcwd()));
                $picture = $tweet->checkPictures($_FILES, PATH . "/");
                ($picture != null && $picture != "" && $picture != false) ? die(json_encode(["status" => true, "file" => $picture])) : die(json_encode(["status" => false]));
            case "delete":
                $result = $tweet->deleteTweet($_GET["id"]);
                die(json_encode(["status" => $result]));
            default :
                break;
        };
    };
    (isset($_SESSION["user_id"]) && isset($_POST["tweet"])) ? pathwayController($tweet, "tweet") : null;
    (isset($_SESSION["user_id"]) && isset($_GET["action"]) && $_GET["action"] == "count") ? pathwayController($tweet, "count") : null;
    (isset($_SESSION["user_id"]) && isset($_GET["action"]) && $_GET["action"] == "retrieve") ? pathwayController($tweet, "retrieve") : null;
    (isset($_SESSION["user_id"]) && isset($_GET["action"]) && $_GET["action"] == "profile") ? pathwayController($tweet, "profile") : null;
    (isset($_SESSION["user_id"]) && isset($_FILES["tweetPicture"])) ? pathwayController($tweet, "upload") : null;
    (isset($_SESSION["user_id"]) && isset($_GET["action"]) && $_GET["action"] == "delete" && isset($_GET["id"])) ? pathwayController($tweet, "delete") : null;
?>
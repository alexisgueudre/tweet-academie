<?php
    session_start();
    require_once("../mvc/controllers/CommentController.php");
    $comment = new CommentController();
    function pathwayController($comment, $action) {
        switch($action) {
            case "comment":
                $result = $comment->comment($_POST["tweet"], $_SESSION["user_id"], $_POST["content"]);
                die(json_encode(["status" => $result]));
            case "count":
                $count = (isset($_GET["user"])) ? $comment->getComments(null, "WHERE tweets.user_id = " . $_GET["user"]) : $comment->getComments(null, "WHERE tweets.user_id = " . $_SESSION["user_id"]);
                die(json_encode(["comment" => sizeof($count)]));
            case "retrieve":
                $comments = $comment->getComments("INNER JOIN users ON users.user_id = comments.user_id WHERE tweet_id = " . $_GET["tweet"] . " ORDER BY comment_date DESC");
                die(json_encode(["comments" => $comments]));
            case "delete":
                $result = $comment->deleteComments($_GET["id"]);
                die(json_encode(["status" => $result]));
            default :
                break;
        };
    };
    (isset($_POST["tweet"])&& isset($_POST["content"]) && isset($_SESSION["user_id"])) ? pathwayController($comment, "comment") : null;
    (isset($_GET["action"])&& $_GET["action"] == "retrieve" && isset($_GET["tweet"])) ? pathwayController($comment, "retrieve") : null;
?>
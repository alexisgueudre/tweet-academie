<?php
    session_start();
    require_once("../mvc/controllers/FollowController.php");
    $follow = new FollowController();
    function pathwayController($follow, $action) {
        switch($action) {
            case "follow":
                $check = $follow->checkFollow($_SESSION["user_id"], $_GET["user"]);
                (!$check) ? $follow->follow($_SESSION["user_id"], $_GET["user"]) : null;
                (!$check) ? die(json_encode(["status" => true])) : die(json_encode(["status" => "error", "message" => "Vous suivez déjà cet utilisateur."]));
                break;
            case "unfollow":
                $check = $follow->checkFollow($_SESSION["user_id"], $_GET["user"]);
                ($check) ? $follow->unfollow($_SESSION["user_id"], $_GET["user"]) : null;
                ($check) ? die(json_encode(["status" => true])) : die(json_encode(["status" => "error", "message" => "Vous ne suivez pas cet utilisateur."]));
                break;
            case "check":
                $check = $follow->checkFollow($_SESSION["user_id"], $_GET["user"]);
                ($check) ? die(json_encode(["status" => true, "message" => "Vous suivez déjà cet utilisateur."])) : die(json_encode(["status" => false, "message" => "Vous ne suivez pas cet utilisateur."]));
                break;
            case "count":
                if(!isset($_GET["user"])) {
                    $followings = $follow->getFollows("LEFT JOIN users ON users.user_id = follows.user_id WHERE follows.follower_id = " . $_SESSION["user_id"]);
                    $followers = $follow->getFollows("LEFT JOIN users ON users.user_id = follows.follower_id WHERE follows.user_id = " . $_SESSION["user_id"]);
                } else {
                    $followings = $follow->getFollows("LEFT JOIN users ON users.user_id = follows.user_id WHERE follows.follower_id = " . $_GET["user"]);
                    $followers = $follow->getFollows("LEFT JOIN users ON users.user_id = follows.follower_id WHERE follows.user_id = " . $_GET["user"]);
                };
                die(json_encode(["followings" => sizeof($followings), "followingsData" => $followings, "followers" => sizeof($followers), "followersData" => $followers]));
            default :
                break;
        };
    };
    (isset($_SESSION["user_id"]) && isset($_GET["user"]) && !empty($_GET["user"]) && isset($_GET["action"]) && $_GET["action"] == "follow") ? pathwayController($follow, "follow") : null;
    (isset($_SESSION["user_id"]) && isset($_GET["user"]) && !empty($_GET["user"]) && isset($_GET["action"]) && $_GET["action"] == "unfollow") ? pathwayController($follow, "unfollow") : null;
    (isset($_SESSION["user_id"]) && isset($_GET["user"]) && !empty($_GET["user"]) && isset($_GET["action"]) && $_GET["action"] == "checkFollow") ? pathwayController($follow, "check") : null;
    (isset($_SESSION["user_id"]) && isset($_GET["action"]) && $_GET["action"] == "count") ? pathwayController($follow, "count") : null;
?>
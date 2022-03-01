<?php
    session_start();
    require_once("../mvc/controllers/UserController.php");
    require_once("../mvc/controllers/HashtagController.php");
    $user = new UserController();
    $hashtag = new HashtagController();
    function pathwayController($instance, $research) {
        switch ($research) {
            case "username":
                $result = $instance->getResearchAndMentions("WHERE username LIKE BINARY '%" . $_POST["value"] . "%'");
                break;
            case "hashtags":
                $result = $instance->getHashtags("WHERE hashtag LIKE BINARY '%" . $_POST["value"] . "%'");
                break;
            default:
                break;
        };
        ($result) ? die(json_encode(["status" => true, "result" => $result])) : die(json_encode(["status" => false, "message" => "Aucun résultat trouvé."]));
    };
    (isset($_POST["research"]) && $_POST["research"] == "username") ? pathwayController($user, "username") : null;
    (isset($_POST["research"]) && $_POST["research"] == "hashtags") ? pathwayController($hashtag, "hashtags") : null;
?>
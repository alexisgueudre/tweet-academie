<?php
    (file_exists("../models/Tweet.php")) ? require_once("../models/Tweet.php") : null;
    (file_exists("mvc/models/Tweet.php")) ? require_once("mvc/models/Tweet.php") : null;
    (file_exists("../mvc/models/Tweet.php")) ? require_once("../mvc/models/Tweet.php") : null;
    class TweetController {
        protected $user;
        protected $content;
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        /* Tweet method(s) */
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        public function tweet($data, $userId) {
            $this->setData($data, $userId);
            $result = $this->sendData();
            return $result;
        }
        public function setData($data, $userId) {
            $this->user = $userId;
            $this->content = $data;
        }
        public function sendData() {
            $tweet = new Tweet();
            $result = $tweet->insert("$this->user, '" . addslashes($this->content) . "'");
            return $result;
        }
        public function deleteTweet($id) {
            $tweet = new Tweet();
            $result = $tweet->delete("WHERE tweet_id = " . $id);
            return $result;
        }
        public function retweet($user, $tweetId) {
            $tweet = new tweet();
            $result = $tweet->insert($user . ", 'RT:" . $tweetId . "'");
            return $result;
        }
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        /* Pictures method(s) */
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        public function checkPictures($pictures, $folder) {
            $unique = substr(md5(uniqid(mt_rand(), true)), 0, 6);
            $picture = (isset($pictures["tweetPicture"]) && $pictures["tweetPicture"]["size"] != 0 && ($pictures["tweetPicture"]["type"] == "image/jpeg" || $pictures["tweetPicture"]["type"] == "image/png")) ? $this->savePicture($pictures, "tweetPicture", $folder, $unique) : null;
            return $picture;
        }
        public function savePicture($picture, $type, $folder, $unique) {
            (!file_exists($folder . "tweetpics/")) ? mkdir($folder . "tweetpics/") : null;
            $uploadFolder = $folder . "tweetpics/" . $unique . ".jpg";
            copy($picture["tweetPicture"]["tmp_name"], $uploadFolder);
            $link = "tweetpics/" . $unique . ".jpg";
            $this->picture = $link;
            return $this->picture;
        }
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        /* Informations method(s) */
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        public function getTweets($condition = null) {
            $tweet = new Tweet();
            $tweets = $tweet->selectAll($condition);
            $result  = [];
            foreach($tweets as $tweetValues) {
                if(preg_match("/^RT\:.*$/", $tweetValues["content"])) {
                    $newValue = [];
                    $newValue["retweet"] = true;
                    $newValue["user_retweet"] = $tweetValues["user_id"];
                    $newValue["user_fullname"] = $tweetValues["fullname"];
                    $response = $this->getRetweets(strstr($tweetValues["content"], ":"));
                    if($response) {
                        foreach($response as $key => $value) {
                            $newValue[$key] = ($key == "tweet_id") ? $tweetValues["tweet_id"] : $newValue[$key] = $value;
                        };
                        array_push($result, $newValue);
                    } else {
                        array_push($result, $tweetValues);
                    };
                } else {
                    array_push($result, $tweetValues);
                };
            };
            return $result;
        }
        public function getRetweets($content) {
            $tweet = new tweet();
            $content = str_replace(":", "", $content);
            $result =  $tweet->select("WHERE tweets.tweet_id = " . $content);
            return $result;
        }
    }
?>
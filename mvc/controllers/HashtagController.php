<?php
    (file_exists("../models/Hashtag.php")) ? require_once("../models/Hashtag.php") : null;
    (file_exists("mvc/models/Hashtag.php")) ? require_once("mvc/models/Hashtag.php") : null;
    (file_exists("../mvc/models/Hashtag.php")) ? require_once("../mvc/models/Hashtag.php") : null;
    class HashtagController {
        public function saveHashtags($hashtags, $tweet) {
            $hashtag = new Hashtag();
            $hashtags = array_unique($hashtags);
            foreach($hashtags as $element) {
                $check = $this->searchHashtag($element);
                (!$check) ? $hashtag->insert($element) : null;
                $getHashtag = $hashtag->select("WHERE hashtag LIKE BINARY '%" . $element . "%'");
                $this->linkHashtagsAndTweets($getHashtag["hashtag_id"], $tweet);
            };
        }
        public function linkHashtagsAndTweets($hashtag, $tweet) {
            $link = new Hashtag();
            $result = $link->insert("$tweet, $hashtag", "link");
            return $result;
        }
        public function searchHashtag($search) {
            $hashtag = new Hashtag();
            $result = $hashtag->select("WHERE hashtag LIKE BINARY '%" . $search . "%'");
            return $result;
        }
        public function getHashtags($condition) {
            $hashtag = new Hashtag();
            $result = $hashtag->selectAll($condition);
            return $result;
        }
    }
?>
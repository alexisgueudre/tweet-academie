<?php
    (file_exists("../models/Follow.php")) ? require_once("../models/Follow.php") : require_once("../mvc/models/Follow.php");
    class FollowController {
        protected $follower;
        protected $followed;
        public function follow($userId1, $userId2) {
            $this->setData($userId1, $userId2);
            $this->sendData();
        }
        public function checkFollow($userId1, $userId2) {
            $follow = new Follow();
            $result = $follow->select("WHERE follower_id = " . $userId1 . " AND user_id = " . $userId2);
            return $result;
        }
        public function setData($userId1, $userId2) {
            $this->follower = $userId1;
            $this->followed = $userId2;
        }
        public function sendData() {
            $follow = new Follow();
            $result = $follow->insert("$this->follower, $this->followed");
            return $result;
        }
        public function getFollows($condition = null) {
            $follow = new Follow();
            $follows = $follow->selectAll($condition);
            return $follows;
        }
        public function unfollow($userId1, $userId2) {
            $follow = new Follow();
            $result = $follow->delete("WHERE follower_id = " . $userId1 . " AND user_id = " . $userId2);
            return $result;
        }
    }
?>
<?php
(file_exists("../models/Comment.php")) ? require_once("../models/Comment.php") : require_once("../mvc/models/Comment.php");
class CommentController {
    protected $tweet;
    protected $user;
    protected $content;
    public function comment($tweetId, $userId, $content) {
        $this->setData($tweetId, $userId, $content);
        $result = $this->sendData();
        return $result;
    }
    public function setData($tweetId, $userId, $content) {
        $this->tweet = $tweetId;
        $this->user = $userId;
        $this->content = $content;
    }
    public function sendData() {
        $comment = new Comment();
        $result = $comment->insert("$this->tweet," . "$this->user, '" . addslashes($this->content) . "'");
        return $result;
    }
    public function getComments($condition = null) {
        $comment = new Comment();
        $comments = $comment->selectAll($condition);
        return $comments;
    }
    public function deleteComment($condition) {
        $comment = new comment();
        $result = $comment->delete($condition);
        return $result;
    }
}
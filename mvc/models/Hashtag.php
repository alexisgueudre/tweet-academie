<?php
    require_once("Database.php");
    class Hashtag extends Database {
        protected $table = null;
        public function __construct() {
            $this->connectDatabase();
            $this->table = "hashtags";
            $this->table2 = "tweets_hashtags";
        }
        public function insert($values, $action = null) {
            $request = ($action == null) ? $this->database->prepare("INSERT INTO " . $this->table . "(hashtag) VALUES ('" . $values . "');") : $this->database->prepare("INSERT INTO " . $this->table2 . "(tweet_id, hashtag_id) VALUES (" . $values . ");");
            $result = $request->execute();
            return $result;
        }
        public function select($condition) {
            $request = $this->database->prepare("SELECT * FROM " . $this->table . " " . $condition . ";");
            $request->execute();
            $result = $request->fetch(PDO::FETCH_ASSOC);
            return $result;
        }
        public function selectAll($condition) {
            $request = $this->database->prepare("SELECT * FROM " . $this->table . " " . $condition . ";");
            $request->execute();
            $result = $request->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }
    }
?>
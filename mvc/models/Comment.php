<?php
    require_once ("Database.php");
    class Comment extends Database {
        protected $table = null;
        public function __construct() {
            $this->connectDatabase();
            $this->table = "comments";
        }
        public function insert($values) {
            $request = $this->database->prepare("INSERT INTO " . $this->table . "( tweet_id,user_id,content) VALUES (" . $values . ");");
            $result = $request->execute();
            return $result;
        }
        public function selectAll($condition = null) {
            $request = ($condition == null) ? $this->database->prepare("SELECT * FROM " . $this->table .";") : $this->database->prepare("SELECT * FROM " . $this->table . " " . $condition . ";");
            $request->execute();
            $result = $request->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }
        public function delete($condition) {
            $request = $this->database->prepare("DELETE FROM " . $this->table . " " . $condition . ";");
            $result = $request->execute();
            return $result;
        }
    }
?>
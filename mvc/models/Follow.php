<?php
    require_once("Database.php");
    class Follow extends Database {
        protected $table = null;
        public function __construct() {
            $this->connectDatabase();
            $this->table = "follows";
        }
        public function insert($values) {
            $request = $this->database->prepare("INSERT INTO " . $this->table . "(follower_id, user_id) VALUES (" . $values . ");");
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
        public function delete($condition) {
            $request = $this->database->prepare("DELETE FROM " . $this->table . " " . $condition);
            $result = $request->execute();
            return $result;
        }
    }
?>
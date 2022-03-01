<?php
    require_once("Database.php");
    class Tweet extends Database {
        protected $table = null;
        public function __construct() {
            $this->connectDatabase();
            $this->table = "tweets";
        }
        public function insert($values) {
            $request = $this->database->prepare("INSERT INTO " . $this->table . "(user_id, content) VALUES (" . $values . ");");
            $result = ["value" => $request->execute(), "tweet" => $this->database->lastInsertId()];
            return $result;
        }
        public function select($condition) {
            $request = $this->database->prepare("SELECT * FROM " . $this->table . " INNER JOIN users ON " . $this->table . ".user_id = users.user_id " . $condition . ";");
            $request->execute();
            $result = $request->fetch(PDO::FETCH_ASSOC);
            return $result;
        }
        public function selectAll($condition = null) {
            if($condition == null) {
                $request = $this->database->prepare("SELECT * FROM " . $this->table . " INNER JOIN users ON " . $this->table . ".user_id = users.user_id ORDER BY tweet_date;");
            } else {
                $request = $this->database->prepare("SELECT * FROM " . $this->table . " INNER JOIN users ON " . $this->table . ".user_id = users.user_id " . $condition . " ORDER BY tweet_date;");
            };
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
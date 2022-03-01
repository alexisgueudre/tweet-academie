<?php
    require_once("Database.php");
    class User extends Database {
        protected $table = null;
        public function __construct() {
            $this->connectDatabase();
            $this->table = "users";
            return;
        }
        public function insert($values) {
            $request = $this->database->prepare("INSERT INTO " . $this->table . "(fullname, birthdate, phone, email, password, picture, banner, biography, username) VALUES (" . $values . ");");
            $result = $request->execute();
            return $result;
        }
        public function select($condition) {
            $request = $this->database->prepare("SELECT * FROM " . $this->table . " " . $condition . ";");
            $request->execute();
            $result = $request->fetch(PDO::FETCH_ASSOC);
            return $result;
        }
        public function selectAll($condition = null) {
            if($condition) {
                $request = $this->database->prepare("SELECT * FROM " . $this->table . " " . $condition . ";");
            } else {
                $request = $this->database->prepare("SELECT * FROM " . $this->table . ";");
            };
            $request->execute();
            $result = $request->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }
        public function update($values, $id) {
            $request = $this->database->prepare("UPDATE " . $this->table . " SET " . $values . " WHERE user_id = " . $id . ";");
            $result = $request->execute();
            return $result;
        }
        public function delete($condition) {
            $request = $this->database->prepare("DELETE FROM " . $this->table . " " . $condition . ";");
            $result = $request->execute();
            return $result;
        }
    }
?>
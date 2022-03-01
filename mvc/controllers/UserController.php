<?php
    (file_exists("../models/User.php")) ? require_once("../models/User.php") : null;
    (file_exists("mvc/models/User.php")) ? require_once("mvc/models/User.php") : null;
    (file_exists("../mvc/models/User.php")) ? require_once("../mvc/models/User.php") : null;
    class UserController {
        protected $fullname;
        protected $birthdate;
        protected $phone;
        protected $email;
        protected $password;
        protected $picture;
        protected $banner;
        protected $biography;
        protected $username;
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        /* Register method(s) */
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        public function register($post, $pictures, $folder) {
            $this->setData($post);
            $this->generateUsername($post["fullname"]);
            $this->securePassword($post["password"]);
            (!empty($pictures)) ? $this->checkPictures($pictures, $folder) : null;
            $result = $this->sendData();
            return $result;
        }
        public function isTaken($condition) {
            $user = new User();
            $result = $user->select($condition);
            return $result;
        }
        public function setData($post) {
            $this->fullname = $post["fullname"];
            $this->birthdate = $post["birthdate"];
            $this->phone = ((empty($post["phone"])) ? null : $post["phone"]);
            $this->email = ((empty($post["email"])) ? null : $post["email"]);
            $this->biography = ((empty($post["biography"])) ? null : $post["biography"]);
        }
        public function generateUsername($fullname) {
            static $count = 0;
            $user = new User();
            $users = $user->selectAll(null);
            $username = "@" . str_replace(" ", "", $fullname) . $count;
            foreach($users as $user) {
                ($username == $user["username"]) ? $count++ : null;
                $username = "@" . str_replace(" ", "", $fullname) . $count;
            };
            $this->username = $username;
        }
        public function securePassword($password) {
            $hash = hash("ripemd160", $password);
            $this->password = crypt($hash, "vive le projet tweet_academy");
        }
        public function sendData() {
            $user = new User();
            $result = $user->insert("'$this->fullname', '$this->birthdate', '$this->phone', '$this->email', '$this->password', '$this->picture', '$this->banner', '$this->biography', '$this->username'");
            return $result;
        }
        public function deleteUser($condition) {
            $user = new User();
            $result = $user->delete($condition);
            return $result;
        }
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        /* Pictures method(s) */
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        public function checkPictures($pictures, $folder) {
            (isset($pictures["picture"]) && $pictures["picture"]["size"] != 0 && ($pictures["picture"]["type"] == "image/jpeg" || $pictures["picture"]["type"] == "image/png")) ? $this->savePicture($pictures, "picture", $folder) : null;
            (isset($pictures["banner"]) && $pictures["banner"]["size"] != 0 && ($pictures["banner"]["type"] == "image/jpeg" || $pictures["banner"]["type"] == "image/png")) ? $this->savePicture($pictures, "banner", $folder) : null;
        }
        public function savePicture($pictures, $type, $folder) {
            ($type == "picture" && !file_exists($folder . "assets/images/uploads/")) ? mkdir($folder . "assets/images/uploads/") : null;
            ($type == "banner" && !file_exists($folder . "assets/images/uploads/banners/")) ? mkdir($folder . "assets/images/uploads/banners/") : null;
            $uploadFolder = $folder . "assets/images/uploads/" . (($type == "banner") ? "banners/" . $this->username . ".jpg" : $this->username . ".jpg");
            copy($pictures[$type]["tmp_name"], $uploadFolder);
            $picture = "assets/images/uploads/" . (($type == "banner") ? "banners/" . $this->username . ".jpg" : $this->username . ".jpg");
            ($type == "picture") ? $this->picture = $picture : $this->banner = $picture;
        }
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        /* Login method(s) */
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        public function login($post) {
            $user = new User();
            $this->securePassword($post["password"]);
            if(isset($post["email"])) {
                return $this->loginWithEmail($user, $post);
            };
            if(isset($post["phone"])) {
                return $this->loginWithPhone($user, $post);
            };
        }
        public function loginWithEmail($user, $post) {
            $result = $user->select("WHERE email = '" . $post["email"] . "'");
            return ($result) ? (($this->checkCredentials($result, $post, "email")) ? $result : false) : false;
        }
        public function loginWithPhone($user, $post) {
            $result = $user->select("WHERE phone = '" . $post["phone"] . "'");
            return ($result) ? (($this->checkCredentials($result, $post, "phone")) ? $result : false) : false;
        }
        public function checkCredentials($user, $post, $loginOption) {
            return ($this->password == $user["password"] && isset($post[$loginOption]) && $post[$loginOption] == $user[$loginOption]) ? true : false;
        }
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        /* Update method(s) */
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        public function updateProfile($post, $pictures, $id, $username, $folder) {
            $user = new User();
            $this->username = $username;
            if($pictures["picture"]["size"] != 0 || $pictures["banner"]["size"] != 0) {
                $this->checkPictures($pictures, $folder);
                ($this->picture == "" && $this->banner != "") ? $values = "banner = '" . $this->banner . "', biography = '" . $post["biography"] . "'" : null;
                ($this->picture != "" && $this->banner == "") ? $values = "picture = '" . $this->picture . "', biography = '" . $post["biography"] . "'" : null;
                ($this->picture != "" && $this->picture != "") ? $values = "picture = '" . $this->picture . "', banner = '" . $this->banner . "', biography = '" . $post["biography"] . "'" : null;
            } else {
                $values = "biography = '" . addslashes($post["biography"]) . "'";
            };
            $user->update($values, $id);
            $updatedUser = $this->getUser($id);
            return $updatedUser;
        }
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        /* Informations method(s) */
        /* ---------------------------------------------------------------------------------------------------------------------------------------- */
        public function getUser($id) {
            $user = new User();
            $result = $user->select("WHERE user_id = " . $id);
            return $result;
        }
        public function getResearchAndMentions($condition) {
            $user = new User();
            $result = $user->selectAll($condition);
            return $result;
        }
    }
?>
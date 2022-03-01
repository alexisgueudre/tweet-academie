<?php
    (file_exists("../models/Message.php")) ? require_once("../models/Message.php") : require_once("../mvc/models/Message.php");
    class MessageController {
        public function getMessages($loggedUser, $receiver) {
            $message = new Message();
            $messages = $message->selectAll("WHERE user_id = " . $loggedUser . " AND receiver_id = " . $receiver . " OR user_id = " . $receiver . " AND receiver_id = " . $loggedUser);
            return $messages;
        }
        public function sendMessage($values) {
            $message = new Message();
            $result = (isset($values) && !empty($values)) ? $message->insert($values) : null;
            return $result;
        }
        public function deleteMessage($id) {
            $message = new Message();
            $result = $message->delete("WHERE message_id = " . $id);
            return $result;
        }
    }
?>
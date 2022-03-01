<?php
    function logout() {
        (isset($_SESSION["user_id"])) ? session_destroy() : null;
        header("Location:index.php");
    };
    logout();
?>
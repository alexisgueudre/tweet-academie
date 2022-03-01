<script id="jqScript" src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<?php
    if(!isset($_SESSION["user_id"]) && (!isset($_GET["page"]) || (isset($_GET["page"]) && $_GET["page"] == "Accueil"))) {
        echo "<script src='assets/javascripts/home.js'></script>";
        echo "<script src='assets/javascripts/register.js'></script>";
    } else if(isset($_GET["page"]) && $_GET["page"] == "Connexion") {
        echo "<script src='assets/javascripts/login.js'></script>";
    } else if(isset($_SESSION["user_id"]) && (!isset($_GET["page"]) || (isset($_GET["page"]) && ($_GET["page"] == "Accueil" || $_GET["page"] == "Profil")))) {
        echo ($_GET["page"] == "Accueil") ? "<script src='assets/javascripts/home.js'></script>" : "";
        echo ($_GET["page"] == "Profil") ? "<script src='assets/javascripts/profile.js'></script>" : "";
        echo "<script src='assets/javascripts/tweet.js'></script>";
    };
    echo "<script src='assets/javascripts/menu.js'></script>";
    echo "<script src='assets/javascripts/alert.js'></script>";
    echo "<script src='assets/javascripts/footer.js'></script>";
?>
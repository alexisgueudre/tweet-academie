<?php
    $whiteList = ["Accueil", "Connexion", "Profil", "Déconnexion"];
    (!isset($_GET["page"]) || (isset($_GET["page"]) && !in_array($_GET["page"], $whiteList))) ? header("Location:index.php?page=Accueil") : null;
    (isset($_GET["page"]) && isset($_SESSION["user_id"]) && ($_GET["page"] == "Connexion"  || $_GET["page"] == "Inscription")) ? header("Location:index.php?page=Profil") : null;
    (!isset($_SESSION["user_id"]) && isset($_GET["page"]) && $_GET["page"] == "Profil") ? header("Location:index.php?page=Connexion") : null;
?>
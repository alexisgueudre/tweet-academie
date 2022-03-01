<body data-theme="light">
    <?php require_once("includes/menu.inc.php"); ?>
    <?php require_once("includes/nav.inc.php"); ?>
    <?php if(!isset($_GET["page"])) { require_once("mvc/views/home.php"); }; ?>
    <?php if(isset($_GET["page"]) && $_GET["page"] == "Accueil") { require_once("mvc/views/home.php"); }; ?>
    <?php if(isset($_GET["page"]) && $_GET["page"] == "Profil") { require_once("mvc/views/profile.php"); }; ?>
    <?php if(isset($_GET["page"]) && $_GET["page"] == "Connexion") { require_once("mvc/views/login.php"); }; ?>
    <?php if(isset($_GET["page"]) && $_GET["page"] == "Déconnexion") { require_once("functions/logout.php"); }; ?>
    <div id="id_view_image_body"></div>
    <div id="id_view_image"></div>
    <?php require_once("includes/footer.inc.php"); ?>
    <?php require_once("includes/scripts.inc.php"); ?>
</body>
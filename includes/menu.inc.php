<nav class="menu">
    <a class="siteLogo" href="index.php">
        <img src="assets/images/logos/logo.png" alt="Logo du site">
    </a>
    <ul>
        <li>
            <a href="index.php">Accueil</a>
        </li>
        <?php if(isset($_SESSION["user_id"])) { ?>
            <li>
                <a href="index.php?page=Profil">Profil</a>
            </li>
            <li>
                <a href="index.php?page=Déconnexion">Déconnexion</a>
            </li>
        <?php } else { ?>
            <li>
                <a href="index.php?page=Connexion">Connexion</a>
            </li>
        <?php }; ?>
    </ul>
    <button class="closeMenuButton">
        <i class="fas fa-chevron-up"></i>
    </button>
</nav>
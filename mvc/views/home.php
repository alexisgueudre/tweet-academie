<div class="homeContainer">
    <?php if(!isset($_SESSION["user_id"])) { ?>
        <header class="homeHeader">
            <div>
                <p class="skeleton-hidden-md">Bienvenue sur</p>
                <h1>Tweet<br>Academy<img class="skeleton-hidden skeleton-visible-md" src="assets/images/logos/logo.png" alt="Logo du site."></h1>
                <button class="registerButton skeleton-hidden-sm">Inscrivez-vous</button>
            </div>
            <div class="headerForm">
                <form action="index.php" method="POST">
                    <button class="headerText skeleton-hidden-sm">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <h2>Inscription</h2>
                    <div>
                        <div class="skeleton-container-full">
                            <div>
                                <i class="fas fa-user"></i>
                                <input type="text" name="fullname" placeholder="Prenom & Nom">
                            </div>
                            <div>
                                <input type="date" name="birthdate">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="skeleton-container-full">
                            <div>
                                <i class="fas fa-at"></i>
                                <input type="email" name="email" placeholder="Adresse emaill">
                            </div>
                            <a class="getPhoneInput" href="#">Par téléphone</a>
                        </div>
                        <div class="skeleton-container-full">
                            <div>
                                <i class="fas fa-phone"></i>
                                <input type="text" name="phone" placeholder="Téléphone">
                            </div>
                            <a class="getEmailInput" href="#">Par email</a>
                        </div>
                    </div>
                    <div>
                        <div class="skeleton-container-full">
                            <div>
                                <i class="fas fa-eye"></i>
                                <input type="password" name="password" placeholder="Mot de passe">
                            </div>
                            <div>
                                <input type="password" name="passwordConf" placeholder="Confimation du mot de passe">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="skeleton-container-full">
                            <div>
                                <input type="file" name="picture">
                            </div>
                            <a class="getBiographyInput" href="#">Passer</a>
                        </div>
                    </div>
                    <div>
                        <div class="skeleton-container-full">
                            <div>
                                <textarea name="biography" placeholder="Biographie"></textarea>
                            </div>
                            <a class="getSubmitInput" href="#">Passer</a>
                        </div>
                    </div>
                    <div>
                        <div class="skeleton-container-full">
                            <input type="submit" value="S'inscrire">
                        </div>
                    </div>
                    <div class="dots"></div>
                </form>
            </div>
        </header>
        <div class="fakeBest">
            <div class="skeleton-container-full">
                <div class="row">
                    <div class="skeleton-col-12">
                        <i class="fas fa-trophy"></i>
                        <p>Meilleur réseau social au monde !<br>Nous ne revendons pas vos données personnelles ;)</p>
                        <p>Développé par la team : <span>Matrix</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="separator">
            <span class="line"></span>
            <span class="triangle">&#9660;</span>
            <span class="line"></span>
        </div>
        <div class="matrixTeam">
            <div class="skeleton-container-full">
                <div class="row">
                    <div class="skeleton-col-12 skeleton-col-sm-6 skeleton-col-lg-3">
                        <a href="https://www.linkedin.com/in/amine-belkheiri/" target="_blank">
                            <img src="assets/images/uploads/@AmineBelkheiri0.jpg" alt="Photo de Neo.">
                        </a>
                        <h4>Neo</h4>
                        <p>" J'ai des collègues timbré(e)s "</p>
                    </div>
                    <div class="skeleton-col-12 skeleton-col-sm-6 skeleton-col-lg-3">
                        <a href="https://www.linkedin.com/in/ophelie-diomar-680162209/">
                            <img src="assets/images/uploads/@OphelieDiomar0.jpg" alt="Photo de Trinity.">
                        </a>
                        <h4>Trinity</h4>
                        <p>" Tom Holland > Tobey Maguire > Andrew Garfield "</p>
                    </div>
                    <div class="skeleton-col-12 skeleton-col-sm-6 skeleton-col-lg-3">
                        <a href="https://www.linkedin.com/in/alexis-gueudre/" target="_blank">
                            <img src="assets/images/uploads/@AlexisGueudre0.jpg" alt="Photo de Morpheus.">
                        </a>
                        <h4>Morpheus</h4>
                        <p>" Dans l'informatique, il n'y a rien de magique ! "</p>
                    </div>
                    <div class="skeleton-col-12 skeleton-col-sm-6 skeleton-col-lg-3">
                        <a href="https://www.linkedin.com/in/fatoumata-g/" target="_blank">
                            <img src="assets/images/uploads/@FatoumataGandega0.jpg" alt="Photo de Niobe.">
                        </a>
                        <h4>Niobe</h4>
                        <p>" Superman > Batman "</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="separator">
            <span class="line"></span>
            <span class="triangle">&#9650;</span>
            <span class="line"></span>
        </div>
    <?php } else { ?>
        <div class="loggedContent">
            <div class="skeleton-container-full">
                <div class="row">
                    <div class="skeleton-hidden skeleton-visible-lg skeleton-col-md-4 skeleton-col-lg-3"></div>
                    <div class="loggedUser skeleton-col-12 skeleton-col-md-8 skeleton-col-lg-6">
                        <div class="row">
                            <div class="skeleton-col-12">
                                <img src="<?php echo (isset($userInfos)) ? (empty($userInfos["picture"]) ? "assets/images/uploads/avatar.jpg" : $userInfos["picture"]) : (empty($_SESSION["picture"]) ? "assets/images/uploads/avatar.jpg" : $_SESSION["picture"]); ?>" alt="Photo de <?php echo $_SESSION["fullname"]; ?>.">
                                <div class="infos">
                                    <div>
                                        <a class="userTag" href="index.php?page=Profil"><?php echo $_SESSION["username"]; ?></a>
                                        <p class="userId skeleton-hidden skeleton-visible-sm">#<?php echo $_SESSION["user_id"]; ?></p>
                                    </div>
                                    <div>
                                        <p class="skeleton-hidden skeleton-visible-sm">Nous vous souhaitons une agréable journée <span><?php echo explode(" ", $_SESSION["fullname"])[0]; ?></span>.</p>
                                        <p class="skeleton-visible skeleton-hidden-sm">Bonne journée !</p>
                                    </div>
                                </div>
                            </div>
                            <div class="tweetFormContainer skeleton-col-12">
                                <textarea class="tweetForm"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="searchInputContainer skeleton-hidden skeleton-visible-md skeleton-col-md-4 skeleton-col-lg-3">
                        <div class="row">
                            <div class="searchInputFormContainer skeleton-col-12">
                                <form>
                                    <input type="text" name="research" placeholder="Recherche">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php }; ?>
</div>
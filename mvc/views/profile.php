<?php require_once("mvc/controllers/UserController.php"); ?>
<?php $user = new UserController(); ?>
<?php $userInfos = (isset($_GET["user"])) ? $user->getUser($_GET["user"]) : null; ?>
<?php (isset($_GET["user"]) && $userInfos == null) ? header("Location:index.php?page=Accueil", true) : null; ?>
<div class="profileContainer">
    <div class="profileContent">
        <div class="skeleton-container-full">
            <div class="row">
                <div class="details skeleton-hidden skeleton-visible-lg skeleton-col-md-4 skeleton-col-lg-3">
                    <div class="row">
                        <div class="profileDetails skeleton-col-12">
                            <div>
                                <i class="fas fa-birthday-cake"></i>
                                <p>Né(e) le <?php echo (isset($userInfos)) ? ucwords(utf8_encode(strftime("%d %B %G", strtotime($userInfos["birthdate"])))) : ucwords(utf8_encode(strftime("%d %B %G", strtotime($_SESSION["birthdate"])))); ?></p>
                            </div>
                            <div>
                                <i class="fa fa-calendar"></i>
                                <p>Rejoint le <?php echo (isset($userInfos)) ? ucwords(utf8_encode(strftime("%d %B %G", strtotime($userInfos["register_date"])))) : ucwords(utf8_encode(strftime("%d %B %G", strtotime($_SESSION["register_date"])))); ?></p>
                            </div>
                        </div>
                        <div class="biography skeleton-col-12">
                            <div>
                                <p><?php echo (isset($userInfos)) ? (empty($userInfos["biography"]) ? "Aucune Bio" : $userInfos["biography"]) : (empty($_SESSION["biography"]) ? "Aucune Bio" : $_SESSION["biography"]); ?></p>
                            </div>
                        </div>
                        <div class="followingsList skeleton-col-12">
                            <h5>Abonnement(s)</h5>
                            <div></div>
                        </div>
                        <div class="followersList skeleton-col-12">
                            <h5>Abonné(e)(s)</h5>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div class="profile skeleton-col-12 <?php echo ((isset($_GET["user"]) && $_GET["user"] != $_SESSION["user_id"])) ? "skeleton-col-sm-12" : "skeleton-col-sm-9"; ?> skeleton-col-md-8 skeleton-col-lg-6">
                    <div class="row">
                        <div class="profileHeader skeleton-col-12">
                            <div class="profileBanner">
                                <button id="themeSwitch">
                                    <i class="fas fa-sun"></i>
                                </button>
                                <?php if((isset($_SESSION["user_id"]) && !isset($_GET["user"])) || (isset($_SESSION["user_id"]) && isset($_GET["user"]) && $_GET["user"] == $_SESSION["user_id"])) { ?>
                                    <button id="settings">
                                        <i class="fas fa-cog"></i>
                                    </button>
                                    <button id="deleteAccount">Supprimer mon compte</button>
                                <?php }; ?>
                                <img id="banner" src="<?php echo (isset($userInfos)) ? (empty($userInfos["banner"]) ? "assets/images/uploads/banners/banner.jpg" : $userInfos["banner"]) : (empty($_SESSION["banner"]) ? "assets/images/uploads/banners/banner.jpg" : $_SESSION["banner"]); ?>" alt="Bannière de <?php echo (isset($userInfos)) ? $userInfos["fullname"] : $_SESSION["fullname"]; ?>.">
                                <img id="avatar" data-logged-user="<?php echo (!isset($_GET["user"]) || $_GET["user"] == $_SESSION["user_id"]) ? $_SESSION["user_id"] : null; ?>" src="<?php echo (isset($userInfos)) ? (empty($userInfos["picture"]) ? "assets/images/uploads/avatar.jpg" : $userInfos["picture"]) : (empty($_SESSION["picture"]) ? "assets/images/uploads/avatar.jpg" : $_SESSION["picture"]); ?>" alt="Photo de <?php echo (isset($userInfos)) ? $userInfos["fullname"] : $_SESSION["fullname"]; ?>.">
                            </div>
                            <div class="profileButtons">
                                <?php echo ((isset($_SESSION["user_id"]) && !isset($_GET["user"])) || $_SESSION["user_id"] == $_GET["user"]) ? "<button id='editProfile'>Éditer le profil</button>" : "<button id='followUser'>Suivre</button><button id='unfollowUser' style='display: none;'>Ne plus suivre</button>"; ?>
                            </div>
                            <div class="profileInfos">
                                <h2 id="fullname"><?php echo (isset($userInfos)) ? $userInfos["fullname"] : $_SESSION["fullname"]; ?></h2>
                                <a id="username" href="index.php?page=Profil<?php echo (isset($userInfos)) ? "&user=" . $userInfos["user_id"] : null; ?>"><?php echo (isset($userInfos)) ? $userInfos["username"] : $_SESSION["username"]; ?></a>
                            </div>
                            <div class="profileStats">
                                <div class="row">
                                    <div id="followings" class="skeleton-col-4">
                                        <h5>Abonnement(s)</h5>
                                    </div>
                                    <div id="followers" class="skeleton-col-4">
                                        <h5>Abonné(e)(s)</h5>
                                    </div>
                                    <div id="tweets" class="skeleton-col-4">
                                        <h5>Tweet(s)</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="messages skeleton-col-sm-3 skeleton-col-md-4 skeleton-col-lg-3">
                    <?php if(!isset($_GET["user"]) || (isset($_GET["user"]) && $_GET["user"] == $_SESSION["user_id"])) { ?>
                        <div class="row">
                            <div class="messagesContainer skeleton-col-12">
                                <h5>Message(s)</h5>
                                <div></div>
                            </div>
                        </div>
                    <?php }; ?>
                </div>
            </div>
        </div>
    </div>
</div>
<?php if(!isset($_GET["user"]) || $_GET["user"] == $_SESSION["user_id"]) { ?>
    <div id="chatBox">
        <h4>Conversation<span></span></h4>
        <div class="currentUser">
            <div class="avatar">
                <img src="" alt="">
            </div>
            <div class="fullname">
                <h5></h5>
            </div>
        </div>
        <div class="messages"></div>
        <div class="input">
            <i class="fas fa-paper-plane"></i>
            <input type="text" name="message">
        </div>
    </div>
<?php }; ?>
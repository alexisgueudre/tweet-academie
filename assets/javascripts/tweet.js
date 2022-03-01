/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Url params */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
function getUserParam() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const user = urlParams.get('user');
    return user;
};
function getPageParam() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get('page');
    return page;
};
function getHashtagParam() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const hashtag = urlParams.get('hashtag');
    return hashtag;
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Onload stuff */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
var tweetsCount = 0;
$(document).ready(() => { getTweets(); });
function startInterval() {
    setInterval(() => {
        let user = getUserParam();
        let page = getPageParam();
        let hashtag = getHashtagParam();
        $.ajax({
            url: `functions/tweet.php?action=${((page == "Profil")) ? "profile" : "retrieve"}${((user != null) ? "&user=" + user : "")}`,
            method: "GET",
            success: (data) => {
                let parseData = JSON.parse(data);
                tweetsCount = parseData.tweets.length;
                if(tweetsCount < $(".tweetCard").length) {
                    getTweets();
                } else if(tweetsCount > $(".tweetCard").length) {
                    createTweet(parseData.tweets[parseData.tweets.length - 1], parseData.logged, page);
                    zoomPictures(parseData.tweets[parseData.tweets.length - 1]);
                };
            },
            complete: () => {
                $(".tweetCard").each((key, element) => {
                    if(hashtag) {
                        if(!$(element).children(".tweetContent").children("div").html().match("#" + hashtag)) {
                            $(element).css({ display: "none" });
                        };
                        $("#wysiwyg").css({ display: "none" });
                    };
                });
            }
        });
    }, 1000);
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Getting tweets */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
var interval = 0;
function getTweets() {
    let selector = ($(".profileHeader").length > 0) ? "profileHeader" : "tweetFormContainer";
    (tweetsCount < $(".tweetCard").length) ? $("." + selector).nextAll().addClass("fadeOut") : $("." + selector).nextAll().removeClass("fadeOut");
    interval++;
    setTimeout(() => {
        ($("." + selector).nextAll().hasClass("fadeOut")) ? $("." + selector).nextAll().remove() : null;
        let user = getUserParam();
        let page = getPageParam();
        $.ajax({
            url: `functions/tweet.php?action=${((page == "Profil")) ? "profile" : "retrieve"}${((user != null) ? "&user=" + user : "")}`,
            method: "GET",
            success: (data) => {
                let parseData = JSON.parse(data);
                parseData.tweets.forEach(element => {
                    createTweet(element, parseData.logged, page);
                });
            }
        });
    }, 500);
    (interval == 1) ? startInterval() : null;
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Showing tweets */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
function createTweet(element, loggedUser, page) {
    let tweetDate = new Date(element.tweet_date);
    let selector = ($(".profileHeader").length > 0) ? "profileHeader" : "tweetFormContainer";
    $("." + selector).after(`<div class="tweetCard skeleton-col-12 fadeIn" data-id="${element.tweet_id}" data-user-id="${element.user_id}" data-user-retweet="${element.user_retweet}">
        <div class="tweetAuthor">
            <img src="${(element.picture) ? element.picture : "assets/images/uploads/avatar.jpg"}" alt="Photo de ${element.fullname}.">
            <div>
                <div>
                    <h3>${element.fullname}</h3>
                    ${(element.user_retweet == loggedUser && element.retweet) ? "<p>Vous avez retweeté.</p>" : ""}
                    ${(element.user_retweet != loggedUser && element.retweet) ? "<p>RT : <a href='index.php?page=Profil&user=" + element.user_retweet + "'>" + element.user_fullname + "</a></p>" : ""}
                </div>
                <div>
                    <a href="index.php?page=Profil&user=${element.user_id}">${element.username}</a>
                    <p class="skeleton-hidden skeleton-visible-md">&nbsp;• ${((tweetDate.getDate() < 10) ? "0" + tweetDate.getDate() : tweetDate.getDate()) + "/" + (((tweetDate.getMonth() + 1) < 10) ? "0" + (tweetDate.getMonth() + 1) : (tweetDate.getMonth() + 1)) + "/" + tweetDate.getFullYear() + " " + ((tweetDate.getHours() < 10) ? "0" + tweetDate.getHours() : tweetDate.getHours()) + ":" + ((tweetDate.getMinutes() < 10) ? "0" + tweetDate.getMinutes() : tweetDate.getMinutes())}</p>
                </div>
            </div>
        </div>
        <div class="tweetContent">
            <div>
                ${(element.content.match(/^RT\:.*$/)) ? (($(`div[data-id="${element.content.replace("RT:", "")}"]`).length > 0) ? $(`div[data-id="${element.content.replace("RT:", "")}"] > .tweetContent`).html() : "Le tweet n'est plus disponible.") : element.content}
            </div>
        </div>
        <div class="comment">
            <input type="text" name="comment" id="${element.tweet_id}" placeholder="Commentaire" autocomplete="off">
        </div>
        <div class="tweetButtons">
            <div>
                ${(element.retweet) ? "" : "<button class='retweet' onclick=\"\sendRetweet(" + element.tweet_id + ", '" + page + "')\"><i class='fas fa-retweet'></i></button>"}
                <button class='comment' onclick=\"\showComments(${element.tweet_id})\">
                    <i class="fas fa-comment"></i>
                </button>
            </div>
            <div>
                ${((element.user_id == loggedUser && !element.retweet) || (element.retweet && element.user_retweet == loggedUser)) ? "<button class='deleteTweet' onclick=\"\deleteTweet(" + element.tweet_id + ", '" + page + "')\">Supprimer</button>" : ""}
            </div>
        </div>
        <div class="commentsContainer"></div>
    </div>`);
    let tweetContent = $("div[data-id='" + element.tweet_id + "'] > .tweetContent > div").text().trim();
    (tweetContent == "Le tweet n'est plus disponible.") ? $("div[data-id='" + element.tweet_id + "'] > .tweetButtons > div > .retweet").css({ display: "none" }) : null;
    $("input[name='comment'][id='" + element.tweet_id + "']").on('keyup', (event) => {
        if(event.key == "Enter") {
            ($(event.target).val() == "") ? showAlert("Le commentaire ne peut être vide !", "alertError", "input[id='" + element.tweet_id + "']") : sendComment(element.tweet_id, $(event.target).val());
            $(event.target).val("");
        };
    });
    hashtagsToLinks(element);
    mentionsToLinks(element);
    zoomPictures(element);
};
function hashtagsToLinks(element) {
    let getHashtags = $("[data-id='" + element.tweet_id + "'] > .tweetContent > div").html().match(/#[a-zA-Z]+/g);
    if(getHashtags && getHashtags.length > 0) {
        getHashtags.forEach((hashtag) => {
            $("[data-id='" + element.tweet_id + "'] > .tweetContent > div").html($("[data-id='" + element.tweet_id + "'] > .tweetContent > div").html().replaceAll(hashtag, "<a href='index.php?page=Accueil&hashtag=" + hashtag.substr(1, hashtag.length) + "'>" + hashtag + "</a>"));
        });
    };
};
function mentionsToLinks(element) {
    let getMentions = $("[data-id='" + element.tweet_id + "'] > .tweetContent > div").html().match(/@[A-Za-z]+[0-9]+/g);
    if(getMentions != null && getMentions.length > 0) {
        getMentions.forEach((mention) => {
            $.ajax({
                url: "functions/user.php",
                method: "POST",
                data: {
                    mention: mention
                },
                success: (data) => {
                    let parseData = JSON.parse(data);
                    if(parseData.mentions[0].username == mention) {
                       $("[data-id='" + element.tweet_id + "'] > .tweetContent > div").html($("[data-id='" + element.tweet_id + "'] > .tweetContent > div").html().replaceAll(mention, "<a href='index.php?page=Profil&user=" + parseData.mentions[0].user_id + "'>" + parseData.mentions[0].username + "</a>"));
                    };
                }
            });
        });
    };
};
function zoomPictures(element) {
    $("div[data-id='" + element.tweet_id + "'] > .tweetContent > div > img").addClass("img_full_screen");
    $(".img_full_screen").click((event) => {
        $("#id_view_image").html("<img src='" + $(event.target).attr("src") + "' class='view_image_img'>");
        $("#id_view_image_body").addClass("view_image_body");
        $("#id_view_image").addClass("view_image");
    });
    $("#id_view_image").click(() => {
        $("#id_view_image").html("");
        $("#id_view_image_body").removeClass("view_image_body");
        $("#id_view_image").removeClass("view_image");
    });
};
function sendRetweet(id, page) {
    $.ajax({
        url: "functions/retweet.php?action=retweet&tweet=" + id,
        method: "GET",
        success: (data) => {
            let parseData = JSON.parse(data);
            if(parseData.status) { (page == "Profil") ? getTweetsCount() : null; };
        }
    });
};
function deleteTweet(tweet, page) {
    $.ajax({
        url: "functions/tweet.php?action=delete&id=" + tweet,
        method: "GET",
        success: (data) => {
            let parseData = JSON.parse(data);
            if(parseData.status) { (page == "Profil") ? getTweetsCount() : null; };
        }
    });
};
function sendComment(tweet, content) {
    $.ajax({
        url : "functions/comment.php",
        type: "POST",
        data : {
            tweet : tweet,
            content : content
        },
        success : (data) => {
            let parseData = JSON.parse(data);
            (parseData.status) ? showAlert("Votre commentaire a bien été ajouté !", "alertSuccess") : null;
            (parseData.status) ? getComments(tweet) : null;
            (!$("div[data-id='" + tweet + "'] > .commentsContainer").hasClass("showComments")) ? $("div[data-id='" + tweet + "'] > .commentsContainer").addClass("showComments") : null;
        }
    });
};
function showComments(tweet) {
    getComments(tweet);
    $("div[data-id='" + tweet + "'] > .commentsContainer").toggleClass("showComments");
};
function getComments(tweet) {
    $("div[data-id='" + tweet + "'] > .commentsContainer").children().remove();
    setTimeout(() => {
        $.ajax({
            url : "functions/comment.php?action=retrieve&tweet=" + tweet,
            type: "GET",
            success : (data) => {
                let parseData = JSON.parse(data);
                parseData.comments.forEach((element) => {
                    let commentDate = new Date(element.comment_date);
                    $("div[data-id='" + tweet + "'] > .commentsContainer").append(`<div class="fadeIn">
                        <div class="commentAvatar">
                            <img src="${(element.picture) ? element.picture : "assets/images/uploads/avatar.jpg"}" alt="Photo de ${element.fullname}.">
                        </div>
                        <div class="commentContent">
                            <div>
                                <a href="index.php?page=Profil&user=${element.user_id}">${element.username}</a>
                                <p class="skeleton-hidden skeleton-visible-md">&nbsp;• ${((commentDate.getDate() < 10) ? "0" + commentDate.getDate() : commentDate.getDate()) + "/" + (((commentDate.getMonth() + 1) < 10) ? "0" + (commentDate.getMonth() + 1) : (commentDate.getMonth() + 1)) + "/" + commentDate.getFullYear() + " " + ((commentDate.getHours() < 10) ? "0" + commentDate.getHours() : commentDate.getHours()) + ":" + ((commentDate.getMinutes() < 10) ? "0" + commentDate.getMinutes() : commentDate.getMinutes())}</p>
                            </div>
                            <div>
                                <p>${element.content}</p>
                            </div>
                        </div>
                    </div>`);
                });
            }
        });
    }, 500);
};
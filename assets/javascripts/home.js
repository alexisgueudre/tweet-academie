/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Responsive content */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$(window).on("resize load", () => {
    if($(window).width() > 550) { $(".homeHeader > div").css("transform", "translateX(0%)"); };
    if($(window).width() > 750) { $(".homeHeader > div > h1").html("Tweet Academy<img class='skeleton-hidden skeleton-visible-md' src='assets/images/logos/logo.png' alt='Logo du site.'>"); };
});
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Register link */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$(".homeContainer > .homeHeader > div > .registerButton").click((event) => {
    event.preventDefault();
    $(".homeHeader > div").css("transform", "translateX(-100%)");
});
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Wysiwyg */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$.fn.my_wysiwyg = () => {
    $(".tweetForm").remove();
    $("body > .homeContainer > .loggedContent > .skeleton-container-full > .row > .loggedUser > .row > .tweetFormContainer").append("<div id='wysiwyg'></div>");
    $("body > .homeContainer > .loggedContent > .skeleton-container-full > .row > .loggedUser > .row > .tweetFormContainer > #wysiwyg").append("<div id='charsCount'><p>0 / 140</p></div>");
    $("body > .homeContainer > .loggedContent > .skeleton-container-full > .row > .loggedUser > .row > .tweetFormContainer > #wysiwyg").append("<div id='textEditor'></div>");
    $("#wysiwyg > #textEditor").attr("contenteditable", "true");
    $("body > .homeContainer > .loggedContent > .skeleton-container-full > .row > .loggedUser > .row > .tweetFormContainer > #wysiwyg").append("<button id='uploadImage'><i class='far fa-image'></i><form id='tweetPictureForm'><input type='file' name='tweetPicture'></form></button>");
    $("body > .homeContainer > .loggedContent > .skeleton-container-full > .row > .loggedUser > .row > .tweetFormContainer > #wysiwyg").append("<button id='sendTweet'>Tweeter</button>");
    $("body > .homeContainer > .loggedContent > .skeleton-container-full > .row > .loggedUser > .row > .tweetFormContainer > #wysiwyg").append("<button id='clearTweet'>Effacer</button>");
};
$(".tweetForm").my_wysiwyg();
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Getting hashtags & mentions */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
var hashtags = null;
var mentions = null;
var treatedMentions = [];
$("#wysiwyg").on("keyup", () => {
    ($("#wysiwyg > #textEditor").html().match(/#[a-zA-Z]+/g)) ? hashtags = $("#wysiwyg > #textEditor").html().match(/#[a-zA-Z]+/g) : null;
    if($("#wysiwyg > #textEditor").html().match(/@[a-zA-Z]+/g)) { ($("#wysiwyg > #textEditor").html().match(/@[a-zA-Z]+[0-9]{0}$/g)) ? mentions = $("#wysiwyg > #textEditor").html().match(/@[a-zA-Z]+[0-9]{0}$/g) : mentions = null; };
    if(mentions != null) { mentions.forEach((element) => { (!treatedMentions.includes(element)) ? getMentionedUser(element) : null; }); $("#wysiwyg > #suggest").removeClass("fadeOut"); } else { $("#wysiwyg > #suggest").addClass("fadeOut"); };
    ($("#wysiwyg > #textEditor").html().length == 0) ? $("#wysiwyg > #suggest").toggleClass("fadeOut") : null;
    $("#charsCount > p").text($("#wysiwyg > #textEditor").html().length + " / 140");
    checkWysiwyg();
});
function checkWysiwyg() {
    if($("#wysiwyg > #textEditor").html().length > 140) {
        $("#charsCount > p").css({ color: "var(--error-color)" });
        $("#charsCount > p").addClass("inputError");
    } else {
        $("#charsCount > p").css({ color: "var(--text-color)" });
        $("#charsCount > p").removeClass("inputError");
    };
};
var request = 0;
function getMentionedUser(mention) {
    $("#wysiwyg > #suggest").children().remove();
    request++;
    if(request == 1) {
        $.ajax({
            url: "functions/user.php",
            method: "POST",
            data: {
                mention: mention
            },
            success: (data) => {
                let parseData = JSON.parse(data);
                if(parseData.mentions.length > 0) {
                    ($("#wysiwyg > #suggest").length <= 0) ? $("#wysiwyg").append("<div id='suggest' class='fadeIn'></div>") : null;
                    parseData.mentions.forEach((element) => {
                        $("#wysiwyg > #suggest").append(`<div data-mention-id=${element.user_id}>
                            <h5>${element.username}</h5>
                        </div>`);
                    });
                    $("#wysiwyg > #suggest > div > h5").click((event) => {
                        $("#wysiwyg > #textEditor").html($("#wysiwyg > #textEditor").text().replace(/@[a-zA-Z]+[0-9]{0}$/g, event.target.innerText));
                        treatedMentions.push(event.target.innerText);
                        $("#wysiwyg > #suggest").addClass("fadeOut");
                        setTimeout(() => { $("#wysiwyg > #suggest").remove(); }, 500);
                        mentions = null;
                    });
                };
            },
            complete: () => {
                request = 0;
            }
        });
    };
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Clear wysiwyg */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$("#clearTweet").click((event) => {
    event.preventDefault();
    clearTweetForm();
});
function clearTweetForm() {
    $("#wysiwyg > #textEditor").empty();
    $("#charsCount > p").text($("#wysiwyg > #textEditor").html().length + " / 140");
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Picture upload */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$("[name='tweetPicture']").change(() => {
    let form = document.querySelector("#tweetPictureForm");
    let formData = new FormData(form);
    $.ajax({
        url: "functions/tweet.php",
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: (data) => {
            let parseData = JSON.parse(data);
            (parseData.status) ? $("#wysiwyg > #textEditor").append("<img src='" + parseData.file + "'>") : null;
            $("[name='tweetPicture']").val("");
            $("#charsCount > p").text($("#wysiwyg > #textEditor").html().length + " / 140");
            checkWysiwyg();
        }
    });
});
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Tweet submission */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$("#sendTweet").click((event) => {
    event.preventDefault();
    let tweetContent = $("#textEditor").html().replace(/(\&nbsp\;)/g, "").trim();
    if($("#charsCount > p").hasClass("inputError") || $("#wysiwyg > #textEditor").html().length == 0 || tweetContent.length == 0) {
        event.preventDefault();
        let message = "L'ajout du Tweet a échoué !";
        showAlert(message, "alertError");
        clearTweetForm();
        checkWysiwyg();
    } else {
        $.ajax({
            url: "functions/tweet.php",
            method: "POST",
            data: {
                "tweet": tweetContent
            },
            success: (data) => {
                let parseData = JSON.parse(data);
                if(parseData.status.value) {
                    let message = "Le Tweet a bien été envoyé !";
                    showAlert(message, "alertSuccess");
                    getTweets();
                    if(hashtags != null) {
                        $.ajax({
                            url: "functions/hashtag.php?action=save",
                            method: "POST",
                            data: { hashtags: hashtags, tweet: parseData.status.tweet },
                            success: (data) => {
                                let parseData = JSON.parse(data);
                            }
                        });
                    };
                    clearTweetForm();
                    checkWysiwyg();
                } else {
                    let message = "L'ajout du Tweet a échoué !";
                    showAlert(message, "alertError");
                    clearTweetForm();
                    checkWysiwyg();
                };
            }
        });
    };
});
$("input[name='research']").on("input", (event) => {
    var input = $(event.target).val()
    var url = (input.match(/^@[A-Z]{1}/)) ? "username" : null;
    url = (url != null) ? url : (input.match(/^#[A-Za-z0-9]+/)) ? "hashtags" : null;
    $("#searchResultsContainer").children().addClass("fadeOut");
    setTimeout(() => {
        $("#searchResultsContainer").children().remove();
        $.ajax({
            url: "functions/research.php",
            method: "POST",
            data: {
                research: url,
                value: input
            },
            success: (data)=>{
                var parseData = JSON.parse(data);
                if(parseData.status) {
                    ($(".searchInputContainer > .row > #searchResultsContainer").length <= 0) ? $(".searchInputFormContainer").after("<div id='searchResultsContainer' class='skeleton-col-12 fadeIn'></div>") : null;
                    parseData.result.forEach((element) => {
                        let retrieved = (element.fullname) ? "users" : "hashtags";
                        if(retrieved == "users") {
                            $("#searchResultsContainer").append(`<a href='index.php?page=Profil&user=${element.user_id}'><img src="${(element.picture) ? element.picture : "assets/images/uploads/avatar.jpg"}" alt="Photo de ${element.fullname}."><p>${element.fullname}<br><span>${element.username}</span></p></a>`);
                        } else {
                            $("#searchResultsContainer").append(`<a href='index.php?page=Accueil&hashtag=${element.hashtag.substr(1, element.hashtag.length)}'>${element.hashtag}</a>`);
                        };
                    });
                };
            }
        });
    }, 500);
});
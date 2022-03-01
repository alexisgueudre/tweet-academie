/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Onload stuff */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$(document).ready(() => { getUserButton(); });
$(document).ready(() => { getTweetsCount(); });
$(document).ready(() => { getFollows(); });
$(document).ready(() => { getUsers(); });
function getUserButton() {
    let user = getUserParam();
    $.ajax({
        url: "functions/follow.php?action=checkFollow&user=" + user,
        method: "GET",
        success: (data) => {
            let parseData = JSON.parse(data);
            (parseData.status) ? getUnfollowButton() : getFollowButton();
        }
    });
};
function getFollowButton() {
    $("#followUser").css({ display: "flex" });
    $("#unfollowUser").css({ display: "none" });
};
function getUnfollowButton() {
    $("#followUser").css({ display: "none" });
    $("#unfollowUser").css({ display: "flex" });
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Responsive content */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$(window).on("resize load", () => {
    var messages = document.querySelector(".messages.skeleton-col-sm-3");
    let user = getUserParam();
    if($(window).width() < 550 && (user == $("#avatar").attr("data-logged-user") || !user)) {
        $("footer").before(messages);
        $(".messages.skeleton-col-sm-3").css({
            width: "110px",
            height: "300px",
            position: "fixed",
            left: "310px",
            bottom: "calc(-220px - 1px)",
            boxShadow: "none",
            cursor: "pointer",
            transition: "bottom 0.5s ease-in-out",
            overflow: "hidden"
        });
        if($(window).width() < 430) {
            $(".messages.skeleton-col-sm-3").css({
                width: "110px",
                height: "300px",
                position: "fixed",
                left: "230px",
                bottom: "calc(-220px - 1px)",
                boxShadow: "none",
                cursor: "pointer",
                transition: "bottom 0.5s ease-in-out",
                overflow: "hidden"
            });
        };
        $(".messagesContainer > h5").click(() => {
            $(".messages.skeleton-col-sm-3").toggleClass("showUsers");
        });
    } else {
        $(".profileContainer > .profileContent > .skeleton-container-full > .row").append(messages);
        $(".messages.skeleton-col-sm-3").css({
            width: "initial",
            height: "fit-content",
            position: "initial",
            left: "inherit",
            bottom: "inherit",
            boxShadow: "none",
            cursor: "arrow",
            transition: "inherit",
            overflow: "initial"
        });
    };
});
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Follow functions */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$("#followUser").click(() => {
    let user = getUserParam();
    $.ajax({
        url: "functions/follow.php?action=follow&user=" + user,
        method: "GET",
        success: (data) => {
            let parseData = JSON.parse(data);
            if(parseData.status) {
                getUnfollowButton();
                getFollows();
            };
        }
    });
});
$("#unfollowUser").click(() => {
    let user = getUserParam();
    $.ajax({
        url: "functions/follow.php?action=unfollow&user=" + user,
        method: "GET",
        success: (data) => {
            let parseData = JSON.parse(data);
            if(parseData.status) {
                getFollowButton();
                getFollows();
            };
        }
    });
});
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Count functions */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
function getTweetsCount() {
    $("#tweets > h5").next().addClass("fadeOut");
    setTimeout(() => {
        $("#tweets > h5").next().remove();
        let user = getUserParam();
        $.ajax({
            url: "functions/tweet.php?action=count" + ((user != null) ? "&user=" + user : ""),
            method: "GET",
            success: (data) => {
                let parseData = JSON.parse(data);
                $("#tweets > h5").after("<p class='fadeIn'>" + parseData.tweets + "</p>");
            }
        });
    }, 500);
};
function getFollows() {
    $("#followings > h5").next().addClass("fadeOut");
    $("#followers > h5").next().addClass("fadeOut");
    $(".followingsList > div").children().addClass("fadeOut");
    $(".followersList > div").children().addClass("fadeOut");
    setTimeout(() => {
        $("#followings > h5").next().remove();
        $("#followers > h5").next().remove();
        $(".followingsList > div").children().remove();
        $(".followersList > div").children().remove();
        let user = getUserParam();
        $.ajax({
            url: "functions/follow.php?action=count" + ((user != null) ? "&user=" + user : ""),
            method: "GET",
            success: (data) => {
                let parseData = JSON.parse(data);
                $("#followings > h5").after("<p class='fadeIn'>" + parseData.followings + "</p>");
                $("#followers > h5").after("<p class='fadeIn'>" + parseData.followers + "</p>");
                generateCards("followingsList", parseData.followingsData);
                generateCards("followersList", parseData.followersData);
            }
        });
    }, 500);
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* User cards */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
function generateCards(selector, follows) {
    follows.forEach((element) => {
        $("." + selector + " > div").append(`<div class="card fadeIn" data-user="${element.user_id}">
            <div class="avatar">
                <img src='${(element.picture) ? element.picture : "assets/images/uploads/avatar.jpg"}' alt='Photo de ${element.fullname}.'>
            </div>
            <div class="skeleton-hidden skeleton-visible-md">
                <div class="fullname">
                    <h5>${element.fullname}</h5>
                </div>
                <div class="tag">
                    <a href="index.php?page=Profil&user=${element.user_id}">${element.username}</a>
                </div>
            </div>
        </div>`);
    });
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Theme switcher */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$("#themeSwitch").click(() => {
    ($("body").attr("data-theme") == "light") ? setTheme("dark") : setTheme("light");
});
function setTheme(theme) {
    $("body").attr("data-theme", theme);
    $("#themeSwitch > i").attr("class", (theme == "dark") ? "fas fa-moon" : "fas fa-sun");
    localStorage.setItem("theme", theme);
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Update form */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$("#editProfile").click(() => {
    createForm();
    let submit = 0;
    $("#editForm").submit((event) => {
        event.preventDefault();
        let form = document.querySelector("#editForm");
        let formData = new FormData(form);
        submit++;
        if(submit > 1) {
            return false;
        } else {
            $.ajax({
                url: "functions/update.php",
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: (data) => {
                    let parseData = JSON.parse(data);
                    (parseData.status) ? window.location.reload() : null;
                }
            });
        };
    });
});
function createForm() {
    $("#jqScript").before(`<div class="editFormContainer fadeIn">
        <form id="editForm">
            <div>
                <label for="pictureUpload">Profil</label>
                <input id="pictureUpload" type="file" name="picture">
                <p class="fakeInput"></p>
            </div>
            <div>
                <label for="bannerUpload">Bannière</label>
                <input id="bannerUpload" type="file" name="banner">
                <p class="fakeInput"></p>
            </div>
            <textarea name="biography">${$(".biography > div > p").text()}</textarea>
            <div>
                <button id="cancelEdit">Annuler</button>
                <input type="submit" value="Modifier">
            </div>
        </form>
    </div>`);
    $("#pictureUpload").on("change", () => {
        $("#pictureUpload").next(".fakeInput").text($("#pictureUpload").val());
    });
    $("#bannerUpload").on("change", () => {
        $("#bannerUpload").next(".fakeInput").text($("#bannerUpload").val());
    });
    $("#cancelEdit").click((event) => {
        event.preventDefault();
        $(".editFormContainer").addClass("fadeOut");
        setTimeout(() => {
            $(".editFormContainer").remove();
        }, 500);
    });
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Getting users */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
function getUsers() {
    let user = getUserParam();
    $.ajax({
        url: "functions/follow.php?action=count" + ((user != null) ? "&user=" + user : ""),
        method: "GET",
        success: (data) => {
            let parseData = JSON.parse(data);
            generateCards("messagesContainer", parseData.followingsData);
            $(".messagesContainer > div > .card").each((key, element) => {
                $(element).click(() => {
                    $("#chatBox").css({ bottom: "40px" });
                    $("#chatBox > .input > input").attr("data-receiver", $(element).attr("data-user"));
                    $("#chatBox > .currentUser > .avatar > img").attr("src", $(element).children(".avatar").children().attr("src"));
                    $("#chatBox > .currentUser > .avatar > img").attr("alt", $(element).children(".avatar").children().attr("alt"));
                    $("#chatBox > .currentUser > .fullname > h5").text($(element).children("div:not(.avatar)").children(".fullname").children("h5").text());
                    let receiver = $("#chatBox > .input > input").attr("data-receiver");
                    requestMessages(receiver);
                    $("#chatBox > .input > input").trigger("updated");
                });
            });
        }
    });
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Chatbox */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$("#chatBox > h4").click(() => {
    $("#chatBox").css({ bottom: "-221px" });
});
$("#chatBox > .input > input").on("keydown", (event) => {
    if(event.key == "Enter") {
        let message = $("#chatBox > .input > input").val();
        let receiver = $("#chatBox > .input > input").attr("data-receiver");
        if(message.length > 0) {
            $.ajax({
                url: "functions/message.php",
                method: "POST",
                data: {
                    message: message,
                    receiver: receiver
                },
                success: (data) => {
                    let parseData = JSON.parse(data);
                    (parseData.status) ? requestMessages(receiver) : null;
                    (parseData.status) ? $("#chatBox > .input > input").val("") : null;
                }
            });
        } else {
            showAlert("Veuillez mettre du contenu dans votre message !", "alertError");
        };
    };
});
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Getting messages */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
function requestMessages(receiver) {
    let interval = setInterval(() => {
        $.ajax({
            url: "functions/message.php?action=retrieve&receiver=" + receiver,
            method: "GET",
            success: (data) => {
                let parseData = JSON.parse(data);
                loadMessages(parseData.messages, receiver);
            },
            complete() {
                $("#chatBox > .input > input").on("updated", () => {
                    $("#chatBox > .messages > div").remove();
                    clearInterval(interval);
                });
                $("#chatBox > .input > input").on("keydown", (event) => {
                    if(event.key == "Enter") {
                        clearInterval(interval);
                    };
                });
            }
        });
    }, 1000, receiver);
};
function loadMessages(messages, receiver) {
    if($("#chatBox > .messages").children().length == 0) {
        messages.forEach((element) => {
            $("#chatBox > .messages").append(`<div data-user="${element.user_id}" data-receiver="${element.receiver_id}" style="margin:${(element.receiver_id == receiver) ? "5px 5px 5px auto" : "5px auto 5px 5px"}">
                <img src='${(element.receiver_id == receiver) ? $("#avatar").attr("src") : $("#chatBox > .currentUser > .avatar > img").attr("src")}'>
                <p class="fadeIn">${element.content}</p>
            </div>`);
        });
        setTimeout(() => {
            let chatbox = document.querySelector("#chatBox > .messages");
            chatbox.scrollTo(0, chatbox.scrollHeight);
        }, 1000);
    } else {
        if($("#chatBox > .messages > div").length < messages.length) {
            $("#chatBox > .messages > div:last-of-type").after(`<div style="margin:${(messages[messages.length - 1].receiver_id == receiver) ? "5px 5px 5px auto" : "5px auto 5px 5px"}">
                <img src='${(messages[messages.length - 1].receiver_id == receiver) ? $("#avatar").attr("src") : $("#chatBox > .currentUser > .avatar > img").attr("src")}'>
                <p class="fadeIn">${messages[messages.length - 1].content}</p>
            </div>`);
            let chatbox = document.querySelector("#chatBox > .messages");
            chatbox.scrollTo(0, chatbox.scrollHeight);
        };
    };
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Settings button */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$("#settings").click(() => { $("#deleteAccount").toggleClass("showDeleteAccountButton"); });
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Delete account button */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$("#deleteAccount").click(() => {
    let confirm = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
    if(confirm) {
        let id = $("#avatar").attr("data-logged-user");
        $.ajax({
            url: "functions/delete.php?user=" + id,
            method: "GET",
            success : (data) => {
                var parseData = JSON.parse(data);
                (parseData.status) ? window.location = "index.php?page='Accueil'" : null;
            }
        })
    }
});
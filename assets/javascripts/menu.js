$(document).ready(() => { loadTheme(); });
$(document).ready(() => { $("img").addClass("fadeIn"); });
$(document).ready(() => { $("input").attr("readonly", false); });
$(document).ready(() => { $("input").attr("autocomplete", "off"); });
function loadTheme() {
    if(localStorage.getItem("theme") == "light") {
        $("body").attr("data-theme", "light");
        $("#themeSwitch > i").attr("class", "fas fa-sun");
    } else {
        $("body").attr("data-theme", "dark");
        $("#themeSwitch > i").attr("class", "fas fa-moon");
    };
};
$(".menuButton").click((event) => {
    event.preventDefault();
    $(".menuButton").toggleClass("active");
    if($(".menuButton").hasClass("active")) {
        menuButtonActive();
        $(".menu").css({ top: "0px" });
    } else {
        menuButtonInactive();
        $(".menu").css({ top: "-100%" });
    };
});
$(".closeMenuButton").click((event) => {
    event.preventDefault();
    ($(".menuButton").hasClass("active")) ? $(".menuButton").removeClass("active") : null;
    menuButtonInactive();
    $(".menu").css({ top: "-100%" });
});
function menuButtonActive() {
    $(".menuButton > div > span:nth-of-type(2)").css({ width: "0px" });
    setTimeout(() => {
        $(".menuButton > div > span:nth-of-type(2)").css({ display: "none" });
        $(".menuButton > div > span:first-of-type").css({ transform: "rotate(45deg) translateY(1px)" });
        $(".menuButton > div > span:last-of-type").css({ transform: "rotate(-45deg) translateY(-1px)" });
    }, 500);
};
function menuButtonInactive() {
    $(".menuButton > div > span:first-of-type").css({ transform: "rotate(0deg) translateY(0px)" });
    $(".menuButton > div > span:last-of-type").css({ transform: "rotate(0deg) translateY(0px)" });
    setTimeout(() => { $(".menuButton > div > span:nth-of-type(2)").css({ display: "initial" }); }, 500);
    setTimeout(() => { $(".menuButton > div > span:nth-of-type(2)").css({ width: "20px" }); }, 600);
};
$(".loginContainer > form > .switchInput").click((event) => {
    event.preventDefault();
    ($(".loginContainer > form > #inputType").attr("name") == "email") ? getEmailInput() : getPhoneInput();
});
function getEmailInput() {
    $(".loginContainer > form > #inputType").attr("type", "text");
    $(".loginContainer > form > #inputType").attr("name", "phone");
    $(".loginContainer > form > #inputType").attr("placeholder", "Téléphone");
    $(".loginContainer > form > .switchInput").text("Par email");
};
function getPhoneInput() {
    $(".loginContainer > form > #inputType").attr("type", "email");
    $(".loginContainer > form > #inputType").attr("name", "email");
    $(".loginContainer > form > #inputType").attr("placeholder", "Adresse email");
    $(".loginContainer > form > .switchInput").text("Par téléphone");
};
$(".loginContainer > form").submit((event) => {
    event.preventDefault();
    let form = document.querySelector(".loginContainer > form");
    let formData = new FormData(form);
    $.ajax({
        url: "functions/login.php",
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            let parseData = JSON.parse(data);
            (parseData.status) ? window.location = "index.php?page=Profil" : showAlert(parseData.message, "alertError");
        }
    });
});
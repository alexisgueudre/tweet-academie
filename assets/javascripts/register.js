/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Onload stuff */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$(document).ready(() => { registerFormSteps(); });
$(document).ready(() => { $("input[name='passwordConf']").attr("disabled", true); });
$(document).click(() => { checkStep(); });
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Usefull variables */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
var user = {
    fullname: null,
    birthdate: null,
    phone: null,
    email: null,
    password: null,
};
var error = 0;
var submit = 0;
var fullnameMatch = /^[A-Z][a-z]+[\-]?([A-Z][a-z]+)?\s[A-Z][a-z]+[\-]?([A-Z][a-z]+)?$/;
var emailMatch = /^([0-9]{0,}[a-z]+[0-9]{0,})[\-\_\.]?([0-9]{0,}[a-z]+[0-9]{0,})+@[a-z]+\.([a-z]{2,3})$/;
var phoneMatch = /^[0-9]{10}$/;
var passwordMatch = /(\s)|(\s+)/;
var biographyMatch = /(<)|(>)/;
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Switch between home and form */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$(".homeContainer > .homeHeader > .headerForm > form > .headerText").click((event) => {
    event.preventDefault();
    $(".homeContainer > .homeHeader > div").css("transform", "translateX(0%)");
});
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Form's steps */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
function registerFormSteps() {
    let steps = $(".homeContainer > .homeHeader > .headerForm > form > div:not(.dots)").length;
    for(let i = 0; i < steps; i++) { $(".homeContainer > .homeHeader > .headerForm > form > .dots").append("<span class='dot'></span>"); };
    $(".homeContainer > .homeHeader > .headerForm > form > .dots > .dot:first-of-type").toggleClass("active");
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Form's inputs */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$("input[name='fullname']").on("input", checkFullname);
function checkFullname() {
    let message = ($("input[name='fullname']").val().match(fullnameMatch)) ? emptyAlert("fullname") : setAlert("fullname");
    checkStep("input[name='fullname']", message);
};
$("input[name='birthdate']").on("input change keydown", checkBirthdate);
function checkBirthdate() {
    let birthdate = $("input[name='birthdate']").val();
    let diffMs = Date.now() - new Date(birthdate).getTime();
    let ageMs = new Date(diffMs);
    let age = Math.abs(ageMs.getUTCFullYear() - 1970);
    let message = (new Date(birthdate) < new Date("01-01-1900")) ? setAlert("birthdateOld") : (age < 13) ? setAlert("birthdateYoung") : (birthdate.length < 10) ? setAlert("birthdateSmall") : (birthdate.length > 10) ? setAlert("birthdateLong") : (new Date(birthdate).getFullYear() > new Date().getFullYear()) ? setAlert("birthdateFuture") : emptyAlert("birthdate");
    checkStep("input[name='birthdate']", message);
};
$("input[name='email']").on("input", checkEmail);
function checkEmail() {
    let email = $("input[name='email']").val();
    $.ajax({
        url: `functions/register.php?email=${email}`,
        method: "GET",
        success: (data) => {
            let parseData = JSON.parse(data);
            let message = ($("input[name='email']").val().match(emailMatch) && !parseData.status) ? emptyAlert("email") : ($("input[name='email']").val().match(emailMatch) && parseData.status) ? setAlert("emailTaken") : setAlert("email");
            checkStep("input[name='email']", message);
        }
    });
};
$("input[name='phone']").on("input", checkPhone);
function checkPhone() {
    let phone = $("input[name='phone']").val();
    $.ajax({
        url: `functions/register.php?phone=${phone}`,
        method: "GET",
        success: (data) => {
            let parseData = JSON.parse(data);
            let message = ($("input[name='phone']").val().match(phoneMatch) && !parseData.status) ? emptyAlert("phone") : ($("input[name='phone']").val().match(phoneMatch) && parseData.status) ? setAlert("phoneTaken") : setAlert("phone");
            checkStep("input[name='phone']", message);
        }
    });
};
$("input[name='password']").on("input", checkPassword);
function checkPassword() {
    let message = ($("input[name='password']").val().match(passwordMatch)) ? setAlert("password") : ($("input[name='password']").val().length < 8) ? setAlert("passwordShort") : ($("input[name='password']").val().length > 20) ? setAlert("passwordLong") : emptyAlert("password");
    checkStep("input[name='password']", message);
};
$("input[name='passwordConf']").on("input", checkPasswordConfirmation);
function checkPasswordConfirmation() {
    let message = ($("input[name='password']").val() != $("input[name='passwordConf']").val()) ? setAlert("passwordConfirmation") : emptyAlert("passwordConfirmation");
    checkStep("input[name='passwordConf']", message);
};
$("input[name='picture']").on("input", checkPicture);
function checkPicture() {
    if($("input[name='picture']").val() != "") {
        $("input[name='picture']").on("focusout", () => {
            $("input[name='picture']").attr("readonly", true);
            $(".headerForm > form > div:not(.dots)").css({
                transform: "translateX(-400%)"
            });
            $(".dot:nth-of-type(4)").removeClass("active");
            $(".dot:nth-of-type(5)").addClass("active");
        });
    };
};
$("textarea[name='biography']").on("input", checkBiography);
function checkBiography() {
    let message = ($("textarea[name='biography']").val() != "" && $("textarea[name='biography']").val().match(biographyMatch)) ? setAlert("biography") : emptyAlert("biography");
    checkStep("textarea[name='biography']", message);
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Form's alerts */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
function emptyAlert(input) {
    error = 0;
    message = "";
    switch(input) {
        case "fullname":
            user.fullname = $("input[name='fullname']").val();
            $("input[name='fullname']").removeClass(".inputError");
            break;
        case "birthdate":
            user.birthdate = $("input[name='birthdate']").val();
            $("input[name='birthdate']").removeClass(".inputError");
            break;
        case "email":
            user.email = $("input[name='email']").val();
            $("input[name='email']").removeClass(".inputError");
            break;
        case "phone":
            user.phone = $("input[name='phone']").val();
            $("input[name='phone']").removeClass(".inputError");
            break;
        case "password":
            user.password = $("input[name='password']").val();
            $("input[name='password']").removeClass(".inputError");
        case "passwordConfirmation":
            $("input[name='passwordConf']").removeClass(".inputError");
            break;
        default :
            break;
    };
    return message;
};
function setAlert(input) {
    error = 1;
    switch(input) {
        case "fullname":
            message = "Prenom Nom : Pas de chiffre(s) ni de caractères spéciaux.";
            break;
        case "birthdateOld":
            message = "Vous êtes trop âgé(e) pour vous inscrire !";
            break;
        case "birthdateYoung":
            message = "Vous êtes trop jeune pour vous inscrire !";
            break;
        case "birthdateSmall":
            message = "Date de naissance incomplète !";
            break;
        case "birthdateLong":
            message = "Date de naissance incorrecte !";
            break;
        case "birthdateFuture":
            message = "Vous devez faire partie du présent pour vous inscrire !";
            break;
        case "email":
            message = "Adresse email incorrecte !";
            break;
        case "emailTaken":
            message = "Cette adresse email est déjà utilisée !";
            break;
        case "phone":
            message = "Numéro de téléphone incorrect !";
            break;
        case "phoneTaken":
            message = "Ce numéro de téléphone est déjà utilisé !";
            break;
        case "password":
            message = "Le mot de passe ne doit pas contenir d'espace !";
            break;
        case "passwordShort":
            message = "Le mot de passe est trop court !";
            break;
        case "passwordLong":
            message = "Le mot de passe est trop long !";
            break;
        case "passwordConfirmation":
            message = "Les mots de passe ne correspondent pas !";
            break;
        case "biography":
            message = "Les chevrons sont interdis !";
            break;
        default :
            break;
    };
    return message;
};
function checkStep(input, message) {
    inputError(error, input, message);
    (input != "textarea[name='biography']") ? $(input).on("focusout", () => { validateInput(input) }) : null;
};
function inputError(error, input, message = null) {
    if(error == 1) {
        $(input).addClass("inputError");
        (message != null && $(".alertError").length == 0) ? showAlert(message, "alertError") : null;
        $(".alertError > p").text(message);
    } else {
        ($(".alertError").length == 1) ? hideAlert(input, "alertError") : null;
    };
};
function validateInput(input) {
    if($(input).val() != "" && error == 0) {
        $(input).attr("readonly", true);
        $(input).removeClass("inputError");
        (input == "input[name='password']") ? $("input[name='passwordConf']").attr("disabled", false) : null;
    } else {
        $(input).attr("readonly", false);
    };
    checkNextStep();
};
function checkNextStep() {
    if($("input[name='fullname']").attr("readonly") != undefined && $("input[name='birthdate']").attr("readonly") != undefined && $("input[name='email']").attr("readonly") == undefined && $("input[name='phone']").attr("readonly") == undefined && $("input[name='password']").attr("readonly") == undefined && $("input[name='passwordConf']").attr("readonly") == undefined) {
        $(".headerForm > form > div:not(.dots)").css({ transform: "translateX(-100%)" });
        $(".dot:first-of-type").removeClass("active");
        $(".dot:nth-of-type(2)").addClass("active");
    } else if($("input[name='fullname']").attr("readonly") != undefined && $("input[name='birthdate']").attr("readonly") != undefined && $("input[name='email']").attr("readonly") != undefined && $("input[name='phone']").attr("readonly") == undefined && $("input[name='password']").attr("readonly") == undefined && $("input[name='passwordConf']").attr("readonly") == undefined) {
        $(".headerForm > form > div:not(.dots)").css({ transform: "translateX(-200%)" });
        $(".dot:nth-of-type(2)").removeClass("active");
        $(".dot:nth-of-type(3)").addClass("active");
        ($("input[name='email']").hasClass("inputError")) ? $("input[name='email']").val(null) : null;
        ($("input[name='phone']").hasClass("inputError")) ? $("input[name='phone']").val(null) : null;
    } else if($("input[name='fullname']").attr("readonly") != undefined && $("input[name='birthdate']").attr("readonly") != undefined && $("input[name='email']").attr("readonly") == undefined && $("input[name='phone']").attr("readonly") != undefined && $("input[name='password']").attr("readonly") == undefined && $("input[name='passwordConf']").attr("readonly") == undefined) {
        $(".headerForm > form > div:not(.dots)").css({ transform: "translateX(-200%)" });
        $(".dot:nth-of-type(2)").removeClass("active");
        $(".dot:nth-of-type(3)").addClass("active");
    } else if($("input[name='fullname']").attr("readonly") != undefined && $("input[name='birthdate']").attr("readonly") != undefined && $("input[name='email']").attr("readonly") != undefined && $("input[name='phone']").attr("readonly") == undefined && $("input[name='password']").attr("readonly") != undefined && $("input[name='passwordConf']").attr("readonly") != undefined) {
        $(".headerForm > form > div:not(.dots)").css({ transform: "translateX(-300%)" });
        $(".dot:nth-of-type(3)").removeClass("active");
        $(".dot:nth-of-type(4)").addClass("active");
    } else if($("input[name='fullname']").attr("readonly") != undefined && $("input[name='birthdate']").attr("readonly") != undefined && $("input[name='email']").attr("readonly") == undefined && $("input[name='phone']").attr("readonly") != undefined && $("input[name='password']").attr("readonly") != undefined && $("input[name='passwordConf']").attr("readonly") != undefined) {
        $(".headerForm > form > div:not(.dots)").css({ transform: "translateX(-300%)" });
        $(".dot:nth-of-type(3)").removeClass("active");
        $(".dot:nth-of-type(4)").addClass("active");
    };
};
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Show or hide password */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$(".fas.fa-eye").click((event) => {
    $("input[name='password']").toggleClass("passwordVisible");
    $("input[name='passwordConf']").toggleClass("passwordVisible");
    ($("input[name='password']").hasClass("passwordVisible")) ? $("input[name='password']").attr("type", "text") : $("input[name='password']").attr("type", "password");
    ($("input[name='passwordConf']").hasClass("passwordVisible")) ? $("input[name='passwordConf']").attr("type", "text") : $("input[name='passwordConf']").attr("type", "password");
});
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Form's email and phone links */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$(".getPhoneInput").click((event) => {
    event.preventDefault();
    $(".headerForm > form > div:nth-of-type(2) > .skeleton-container-full").css({ transform: "translateY(calc(-100% - 40px))" });
});
$(".getEmailInput").click((event) => {
    event.preventDefault();
    $(".headerForm > form > div:nth-of-type(2) > .skeleton-container-full").css({ transform: "translateY(0%)" });
});
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Form's skip links */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$(".getBiographyInput").click((event) => {
    event.preventDefault();
    $(".headerForm > form > div:not(.dots)").css({ transform: "translateX(-400%)" });
    $(".dot:nth-of-type(4)").removeClass("active");
    $(".dot:nth-of-type(5)").addClass("active");
});
$(".getSubmitInput").click((event) => {
    event.preventDefault();
    $(".headerForm > form > div:not(.dots)").css({ transform: "translateX(-500%)" });
    $(".dot:nth-of-type(5)").removeClass("active");
    $(".dot:last-of-type").addClass("active");
    ($("textarea[name='biography']").hasClass("inputError")) ? $("textarea[name='biography']").val("Aucune Bio") : null;
});
$(".headerForm > form").on("keydown", (event) => {
    (event.key == "Tab" || event.key == "Enter") ? event.preventDefault() : null;
});
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
/* Form submission */
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
$(".headerForm > form").submit((event) => {
    event.preventDefault();
    var form = document.querySelector(".headerForm > form");
    var formData = new FormData(form);
    submit++;
    if(submit > 1) {
        return false;
    } else {
        $.ajax({
            url: "functions/register.php",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: (data) => {
                var parseData = JSON.parse(data);
                if(parseData.status) {
                    showAlert(parseData.message, "alertSuccess");
                    setTimeout(() => { window.location = "index.php?page=Connexion"; }, 500);
                } else {
                    showAlert(parseData.message, "alertError");
                    setTimeout(() => { window.location.reload(); }, 500);
                };
            }
        });
    };
});
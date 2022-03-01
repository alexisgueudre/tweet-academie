function showAlert(message, selector, input = null) {
    $("#jqScript").before(`<div class="${selector} fadeIn">
        <i class="fas fa-exclamation-circle"></i>
        <p>${message}</p>
        <button class="closeAlert">
            <i class="fas fa-times"></i>
        </button>
    </div>`);
    $(".closeAlert").click(() => { hideAlert(((input != null) ? input : null), selector); });
    setTimeout(() =>{hideAlert(null,selector)},2000)
};
function hideAlert(input = null, selector) {
    $("." + selector).addClass("fadeOut");
    setTimeout(() => { $("." + selector).remove(); }, 500);
    (input != null) ? $(input).removeClass("inputError") : null;
};
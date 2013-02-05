$(document).ready(function () {
    loadPage("login.html");
});

function loadPage(name) {
    getTemplate(name);
}

function getTemplate(name) {
    var template = $(name).html();
    var html = '';
    $.get("../templates/" + name, function (template) {
        html = Mustache.to_html(template, []);
        $('#place_holder').html(html);
        attachListeners();
    });
}

function attachListeners() {
    $('#register_link').on('click', function () {
        loadPage("register.html");
    });

    $('#home').on('click', function () {
        loadPage("login.html");
    });

    $('#register_btn').click(function () {
        var mail_to = "mailto:prasann@thoughtworks.com";
        var subject = "NSSF Registration";
        var body = "";
        $.each($('#register_form').serializeArray(), function (i, elem) {
            body += elem["name"] + ": ";
            body += elem["value"] + "%0D";
        });
        var href = mail_to + "?subject=" + subject + "&body=" + body;
        $('#register_btn').attr('href', href);
        return true;
    });
    $("#login_btn").on('click', function () {
        loadPage("action.html");

    });
    $("#view_balance_btn").on('click', function () {
        loadPage("account.html");
    });
    $('#view_transaction_history').on("click", function () {
        loadPage("transactions.html");
    });
}
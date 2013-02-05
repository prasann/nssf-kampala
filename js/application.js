$(document).ready(function () {
    var app = Sammy('body', function () {
//        this.use(Sammy.Mustache);
        
        this.get('#/login', function () {
            loadPage('login.html');
        });
        this.get('#/register', function () {
            loadPage('register.html');
        });
        map(this, '#/action', 'action.html');
        map(this, '#/account', 'account.html');
        map(this, '#/transactions', 'transactions.html');
        this.get('#/register_btn', function () {
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
    });
    $(function () {
        app.run('#/login');
    });
});

function map(_this, route, template) {
    _this.get(route, function () {
        loadPage(template);
    });
};

function loadPage(name) {
    getTemplate(name);
}

function getTemplate(name) {
    var template = $(name).html();
    var html = '';
    $.get("../templates/" + name, function (template) {
        html = Mustache.to_html(template, []);
        $('#place_holder').html(html);
    });
}
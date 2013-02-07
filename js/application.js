$(document).ready(function () {
    var app = Sammy('body', function () {
        this.get('#/login', function () {
            loadPage('login.html');
        });
        this.get('#/register', function () {
            loadPage('register.html');
        });
        map(this, '#/action', 'action.html');
        map(this, '#/account', 'account.html');
        this.get('#/transactions', function () {
            $.getJSON("http://nssf-spike.herokuapp.com/api/transactions?username=james&password=james", function (data) {
                console.log(data);
                 
                
                $.get("../templates/transactions.html" , function (template) {
                    html = Mustache.to_html(template,data);
                    $('#place_holder').html(html);
                });
            });
        });
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

function bind_action_btns() {
    $(document).delegate("div", "click", function () {
        window.location = $(this).find("a").attr("href");
    });
}
$(document).ready(function () {

    supports_html5_storage();
    var app = Sammy('body', function () {
        this.get('#/login', function () {
            loadPage('login.html');
        });
        this.get('#/register', function () {
            loadPage('register.html');
        });

        this.get('#/action', function () {
            loadPage('action.html');
        });
        this.get('#/account', function () {
            if (supports_html5_storage()) {
                user_data = localStorage.getItem("user_data");
                getTemplate_with_data('account.html', user_data);
            } else {
                //TODO
            }
        });
        this.get('#/transactions', function () {
            $.getJSON("http://nssf-spike.herokuapp.com/api/transactions?username=james&password=james", function (data) {
                console.log(data);


                $.get("../templates/transactions.html", function (template) {
                    html = Mustache.to_html(template, data);
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

    $.get("../templates/" + name, function (template) {
        try {
            html = Mustache.render(template, []);
            $('#place_holder').html(html);
            bind_login_btn();
        } catch (ex) {
            alert(ex);
        }
    });
}

function getTemplate_with_data(name, data) {

    $.get("../templates/" + name, function (template) {
        try {
            html = Mustache.render(template, data);
            $('#place_holder').html(html);
            bind_login_btn();
        } catch (ex) {
            alert(ex);
        }
    });
}

function bind_login_btn() {
    $('#login_btn').on('click', function () {
        console.log("asd");
        var username = $('input#username').val();
        var password = $('input#password').val();
        $.getJSON("http://nssf-spike.herokuapp.com/api/authenticate?username=" + username + "&password=" + password, function (data_from_server) {
            if (data_from_server.result) {
                alert('Login successful');
                getTemplate_with_data("action.html", data_from_server);
                if (supports_html5_storage()) {
                    localStorage.setItem("user_data", data_from_server.data);
                } else {
                    //TODO
                }
            } else {
                alert('Login failed try again');
                $('input#username').val('');
                $('input#password').val('');
            }
        });
        return false;

    });
}

function bind_action_btns() {
    $(document).delegate("div", "click", function () {
        window.location = $(this).find("a").attr("href");
    });
}


function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
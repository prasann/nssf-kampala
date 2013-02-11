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
                user_data = JSON.parse(localStorage.getItem("user_data"));
                getTemplate('account.html', user_data);
            } else {
                doesnot_support_storage();
            }
            $('#logo_container').hide();
        });
        this.get('#/transactions', function () {
            $.getJSON("http://nssf-spike.herokuapp.com/api/transactions", {
                username: "james",
                password: "james"
            }, function (data) {
                getTemplate('transactions.html', data);
                $('#logo_container').hide();
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
}

function loadPage(name) {
    getTemplate(name, []);
    $('#logo_container').show();

}

function getTemplate(name, data) {
    $.get("../templates/" + name, function (template) {
        try {
            html = Mustache.render(template, data);
            $('#place_holder').html(html);
            bind_login_btn();
        } catch (ex) {
            alert(ex);
        }
    },"text");
}


function bind_login_btn() {
    $('#login_btn').on('click', function () {
        var username = $('input#username').val();
        var password = $('input#password').val();
        $.getJSON("http://nssf-spike.herokuapp.com/api/authenticate", {
            username: username,
            password: password
        }, function (data_from_server) {
            if (data_from_server.result) {
                getTemplate("action.html", data_from_server);
                if (supports_html5_storage()) {
                    localStorage.setItem("user_data", JSON.stringify(data_from_server.data));
                } else {
                    doesnot_support_storage();
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

function doesnot_support_storage() {
    alert('doesnot_support_storage');
}

function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
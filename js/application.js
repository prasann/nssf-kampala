$(document).ready(function () {
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

    loadPage("login.html");
    
    
});

function loadPage(name) {
    getTemplate(name);
}
function getTemplate(name) {
    var template = $(name).html();
    var html = '';
    $.get(name, function (template) {
        html = Mustache.to_html(template, []);
        $('#place_holder').html(html);
        attachListeners();
    });
}
 function attachListeners(){
 $('#register_link').on('click',function () {
        
        loadPage("register.html");
    });

    $('#home').on('click',function () {
        loadPage("login.html");
    });
 }
$(document).ready(function(){
 $('#register_btn').click(function(){
     var mail_to ="mailto:prasann@thoughtworks.com";
     var subject ="NSSF Registration";
     var body="";
     $.each($('#register_form').serializeArray(),function(i,elem){
        body += elem["name"] +": ";
        body += elem["value"] + "%0D";
     });
     var href=mail_to+"?subject="+subject+"&body="+body;
     $('#register_btn').attr('href',href);
     return true;
 });
});
/*!-----------------------------------------------------------------
    Name: Aegon - Personal Portfolio HTML Template
    Version: 1.0
    Author: Nextrising Tech
    Website: https://www.nextrisingtech.com/
    Support: nextrisingtech@gmail.com
    License: You must have a valid license purchased only from ThemeForest in order to legally use the theme for your project.
    Copyright 2022.
-------------------------------------------------------------------*/
var _body = "",
    _html = "",
    _htmlBody = "",
    _window = "",
    _layout = "",
    _lazyload = "";

jQuery(window).on('load', function() { 
    jQuery.ready.then(function() {
        "use strict";

        _body = jQuery('body');
        _html = jQuery('html');
        _htmlBody = jQuery('html, body');
        _window = jQuery(window);
        _layout = jQuery('.layout');

        // default script
        _html.addClass('window-loaded');
       
        jQuery(".about").click(function() {
            var targetDiv = jQuery("#about");
            jQuery('html, body').animate({
                scrollTop: jQuery(targetDiv).offset().top - 77
            });
        });

        jQuery(".why-attend").click(function() {
            var targetDiv = jQuery("#why-attend");
            jQuery('html, body').animate({
                scrollTop: jQuery(targetDiv).offset().top - 77
            });
        });

        jQuery(".highlights").click(function() {
            var targetDiv = jQuery("#highlights");
            jQuery('html, body').animate({
                scrollTop: jQuery(targetDiv).offset().top - 77
            });
        });

        jQuery(".agenda").click(function() {
            var targetDiv = jQuery("#agenda");
            jQuery('html, body').animate({
                scrollTop: jQuery(targetDiv).offset().top - 77
            });
        });

        jQuery(".main-section").click(function() {
            var targetDiv = jQuery('#main-section');
            jQuery('html, body').animate({
                scrollTop: jQuery(targetDiv).offset().top - 77
            });
        });
            

    });
});

window.onscroll = function () { myFunction() };

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}

function validateForm() {
    var flag = 0;  

    var name = $("#Name").val();
    if (name == "") {
        $('#name_err_msg').text("Please enter your name");
        flag = 1;
    }else{
        $('#name_err_msg').text("");
        //flag = 0;
    }

    

    var email = $("#Email").val();
    if (email == "") {
        $('#email_err_msg').text("Please enter email ID");
        flag = 1;
    }else{
        if( !validateEmail(email)) {
            $('#email_err_msg').text("Please enter valid email ID");
            flag = 1;  
        }else{
            $('#email_err_msg').text("");
            //flag = 0;
        }
    }

    var phone = $("#Phone").val();
    if (phone == "") {
        $('#phone_err_msg').text("Please enter phone number");
        flag = 1;
    }else{
        $('#phone_err_msg').text("");
        //flag = 0;
        // var phoneNum = phone.replace(/[^\d]/g, '');
        // if(phoneNum.length < 10 || phoneNum.length > 10) {  
        //    $('#phone_err_msg').text("Please enter valid phone number");
        //     flag = 1; 
        // }
    }
    
    var company = $("#Company").val();
    if (company == "") {
        $('#company_err_msg').text("Please enter company name");
        flag = 1;
    }else{
        $('#company_err_msg').text("");
        //flag = 0;
    }

    var designation = $("#Designation").val();
    if (designation == "") {
        $('#designation_err_msg').text("Please enter designation");
        flag = 1;
    }else{
        $('#designation_err_msg').text("");
        //flag = 0;
    }
    
    var industry = $("#Industry").val();
    if (industry == "") {
        $('#industry_err_msg').text("Please enter industry");
        flag = 1;
    }else{
        $('#industry_err_msg').text("");
        //flag = 0;
    }

    // if ($('#WANotifications').is(":checked")) {
    //     $('#wan_err_msg').text("");
    // }else{
    //     $('#wan_err_msg').text("Please accept to receive WhatsApp notifications");
    //     flag = 1;
    // }

    if(flag == 1){
        $(".error-message").show();
        return false;
    }else{
        $(".error-message").hide();
        return true;
    }
}

$(document).ready(function(){

    // $('#RegisteredISV').on("click",function(){
    //     if($(this).is(":checked")){
    //         $(this).val('Yes');
    //     }else{
    //         $(this).val('No');
    //     }    
    // });

    $('#google-sheet').on("submit",function(){
        $this = $(this);
        $this.find("input[type='submit']").prop('disabled',true);
        if(validateForm()){
            $.ajax({
                 type : "POST",
                 url : "https://script.google.com/macros/s/AKfycbwpWPq3YS7sV-1-Ga_nFm1IefElk3QPJic1DI9JvSQJb3I-UqmQnycQgoyF5B_QFqtc/exec",
                 data : $this.serialize(),
                 success: function(response) {

                        $.ajax({
                             type : "POST",
                             url : "https://conversessions.com/gupshup/mexico-meetup/send-email.php",
                             data : {'name':$this.find('#Name').val(), 'email':$this.find('#Email').val()},
                             success: function(response) {

                             }
                        })

                        // $('#capture-inquiry').find('input[name="Email"]').val($this.find('#Email').val());
                        // $('#capture-inquiry').find('input[name="FName"]').val($this.find('#Name').val());
                        // var chkemail = $('#capture-inquiry').find('input[name="Email"]').val();
                        
                        // if( chkemail != '' ){
                        //     $('#capture-inquiry').submit();
                        // }

                        $('#final_msg').html("Thank you for registering. We will get back to you shortly.").addClass('success').removeClass('error').fadeOut(5000); 
                        $this.find("input[type='submit']").prop('disabled',false);
                        //$this.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
                        $this.find('input:text').val(''); 
                        //$this.find('input:radio').removeAttr('checked').removeAttr('selected');
                        //setTimeout(function() {
                            //window.location.href = "https://gupshupcommunica8.com/thankyou.php";    
                        //}, 2000);
                    },
                 error: function(response){
                        $('#final_msg').html("Error: " + response).addClass('error').removeClass('success'); 
                        $this.find("input[type='submit']").prop('disabled',false);
                 }   
            });
        }else{
            $this.find("input[type='submit']").prop('disabled',false);
        }
        return false;
    });
});
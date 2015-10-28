/**
 * Created by Bharath on 9/10/15.
 */
$('#submitdetails').click( function(event) {
    //window.alert('WORKING');
    var error=false;
    event.preventDefault();
    var email  = $('#email').val();
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var address = $('#address').val();
    var city = $('#city').val();
    var state = $('#state').val();
    var zip = $('#zip').val();
    var uname = $('#uname').val();
    var pwd = $('#pwd').val();
    var emailvalidator = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var zipvalidator = /(^\d{5}$)|(^\d{5}-\d{4}$)/;



    $('#error').html('');
    $('#emailerror').html('');
    $('#fnameerror').html('');
    $('#lnameerror').html('');
    $('#addresserror').html('');
    $('#cityerror').html('');
    $('#ziperror').html('');
    $('#unameerror').html('');
    $('#pwderror').html('');


    //window.alert(email);
    if(email==''||!emailvalidator.test(email)) {
        $('#emailerror').html('Enter a valid e-mail');
        $('#error').html('Please correct  errors and submit again');
        error=true;
    }

    if(fname==''||fname.length<2) {
        $('#fnameerror').html('Enter a valid First Name');
        $('#error').html('Please correct  errors and submit again');
        error=true;

    }

    if(lname==''||lname.length<2) {
        $('#lnameerror').html('Enter a valid Last Name');
        $('#error').html('Please correct  errors and submit again');
        error=true;

    }

    if(address==''||address.length<4) {
        $('#addresserror').html('Enter a valid address');
        $('#error').html('Please correct errors and submit again');
        error=true;

    }

    if(city==''||city.length<2) {
        $('#cityerror').html('Enter a valid city');
        $('#error').html('Please correct errors and submit again');
        error=true;

    }

    if(zip==''||!zipvalidator.test(zip)) {
        $('#ziperror').html('Enter a valid Zip code');
        $('#error').html('Please correct errors and submit again');
        error=true;

    }

    if(uname=='') {
        $('#unameerror').html('Enter a valid username');
        $('#error').html('Please correct errors and submit again');
        error=true;

    }
    if(pwd=='') {
        $('#pwderror').html('Enter a valid password');
        $('#error').html('Please correct errors and submit again');
        error=true;

    }

    if(error==false){
        $('#registerform').submit();
       // window.alert('submitted');
    }


});



$('#updatedetails').click( function(event) {
    //window.alert('WORKING');
    var error=false;
    event.preventDefault();
    var email  = $('#email').val();
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var address = $('#address').val();
    var city = $('#city').val();
    var state = $('#state').val();
    var zip = $('#zip').val();
    var uname = $('#uname').val();
    var pwd = $('#pwd').val();
    var emailvalidator = /\S+@\S+\.\S+/;
    var zipvalidator = /(^\d{5}$)|(^\d{5}-\d{4}$)/;



    $('#emailerror').html('');
    $('#fnameerror').html('');
    $('#lnameerror').html('');
    $('#addresserror').html('');
    $('#cityerror').html('');
    $('#ziperror').html('');
    $('#unameerror').html('');
    $('#pwderror').html('');


   // window.alert(email);
    if(email==''||!emailvalidator.test(email)) {
        $('#emailerror').html('Enter a valid e-mail');
        $('#error').html('Please correct  errors and submit again');
        error=true;
    }

    if(fname==''||fname.length<2) {
        $('#fnameerror').html('Enter a valid First Name');
        $('#error').html('Please correct  errors and submit again');
        error=true;

    }

    if(lname==''||lname.length<2) {
        $('#lnameerror').html('Enter a valid Last Name');
        $('#error').html('Please correct  errors and submit again');
        error=true;

    }

    if(address==''||address.length<4) {
        $('#addresserror').html('Enter a valid address');
        $('#error').html('Please correct errors and submit again');
        error=true;

    }

    if(city==''||city.length<2) {
        $('#cityerror').html('Enter a valid city');
        $('#error').html('Please correct errors and submit again');
        error=true;

    }

    if(zip==''||!zipvalidator.test(zip)) {
        $('#ziperror').html('Enter a valid Zip code');
        $('#error').html('Please correct errors and submit again');
        error=true;

    }

    if(uname=='') {
        $('#unameerror').html('Enter a valid username');
        $('#error').html('Please correct errors and submit again');
        error=true;

    }
    if(pwd=='') {
        $('#pwderror').html('Enter a valid password');
        $('#error').html('Please correct errors and submit again');
        error=true;

    }

    if(error==false){
        $('#updateform').submit();
        //window.alert('submitted');
    }









});
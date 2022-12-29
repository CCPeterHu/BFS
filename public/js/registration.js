// console.log("JS here yo!");

/** User name validation 
 * red font: invalid
 * green font: valid
 * red outline: invalid
 * green outline: valid
*/
var unameElement = document.getElementById('uname');
var uname_letterElement = document.getElementById('uname_letter');
var uname_lengthElement = document.getElementById('uname_length');

/**
 * password validation 
 */
var pwdElement = document.getElementById('password');
var pwd_lengthElement = document.getElementById('pwd_length');
var pwd_uppercaseElement = document.getElementById('pwd_uppercase');
var pwd_lowercaseElement = document.getElementById('pwd_lowercase');
var pwd_special_charactorElement = document.getElementById('pwd_special_charactor');
var pwd_numbersElement = document.getElementById('pwd_numbers');

/**
 * comfirm password
 */
var cpwdElement = document.getElementById('cpassowrd');
var cpwd_matchElement = document.getElementById('cpwd_match');

// listen on user name input
unameElement.onfocus = function() {
    document.getElementById('message').style.display = "block";
}
// hide message if lost focus
unameElement.onblur = function(){
    document.getElementById('message').style.display = "none";
}

// listen on password input
pwdElement.onfocus = function() {
    document.getElementById('message_pwd').style.display = "block";
}

pwdElement.onblur = function() {
    document.getElementById('message_pwd').style.display = "none";
}

// listen on comfirm password input 
cpwdElement.onfocus = function() {
    document.getElementById('message_cpwd').style.display = "block";
}

cpwdElement.onblur = function() {
    document.getElementById('message_cpwd').style.display = "none";
}


/**
 * comfirm password validation
 */
document.getElementById('cpassowrd').addEventListener('input', 
function(ev){
    let pwd = pwdElement.value;
    let cpwd = ev.target.value;

    // console.log('pwd = ' + pwd + ' cpwd = ' + cpwd + ' equal? ' + (pwd == cpwd));
    if(pwd == cpwd && cpwd != null){
        // console.log('pwd match!');
        cpwd_matchElement.classList.add('valid');
        cpwd_matchElement.classList.remove('invalid');
        cpwdElement.classList.add('valid-text');
        cpwdElement.classList.remove('invalid-text');
    }else{
        // console.log('pwd NOT match!');
        cpwd_matchElement.classList.add('invalid');
        cpwd_matchElement.classList.remove('valid');
        cpwdElement.classList.add('invalid-text');
        cpwdElement.classList.remove('valid-text');
    }
}
);


/**
 * password validation
 */
document.getElementById('password').addEventListener('input', 
function(ev){
    // console.log(ev.target.remove());
    // console.log(ev.target.value.length);
    pwdElement = ev.target;
    let pwd = pwdElement.value;
    // console.log(pwd);

    // length validation
    if(pwd.length >= 8 ){
        // console.log("valid"); 
        // pwdElement.style.color = 'green';
        pwd_lengthElement.classList.add('valid');
        pwd_lengthElement.classList.remove('invalid');
    }else{
        // console.log("invalid"); 
        // pwdElement.style.color = 'red';
        pwd_lengthElement.classList.add('invalid');
        pwd_lengthElement.classList.remove('valid');
    }

    // at least 1 upper case
    let uppercase = /[A-Z]/;
    // console.log('is it match uppercase? ' + pwd.match(uppercase) );
    if (pwd.match(uppercase)){
        pwd_uppercaseElement.classList.add('valid');
        pwd_uppercaseElement.classList.remove('invalid');
    }else{
        pwd_uppercaseElement.classList.add('invalid');
        pwd_uppercaseElement.classList.remove('valid');
    }

    // at least 1 lower case
    let lowercase = /[a-z]/;
    if (pwd.match(lowercase)){
        pwd_lowercaseElement.classList.add('valid');
        pwd_lowercaseElement.classList.remove('invalid');
    }else{
        pwd_lowercaseElement.classList.add('invalid');
        pwd_lowercaseElement.classList.remove('valid');
    }

    // at least 1 number 
    let numbers = /[0-9]/;
    if (pwd.match(numbers)){
        pwd_numbersElement.classList.add('valid');
        pwd_numbersElement.classList.remove('invalid');
    }else{
        pwd_numbersElement.classList.add('invalid');
        pwd_numbersElement.classList.remove('valid');
    }

    // at least 1 special characters
    let specialChar = /[\/\*\-\+\!\@\#\$\^\&\~\[\]]/;
    if (pwd.match(specialChar)){
        pwd_special_charactorElement.classList.add('valid');
        pwd_special_charactorElement.classList.remove('invalid');
    }else{
        pwd_special_charactorElement.classList.add('invalid');
        pwd_special_charactorElement.classList.remove('valid');
    }

    // text outline when all satisfied 
    if (pwd.length >= 8 && pwd.match(uppercase) && pwd.match(lowercase) 
        && pwd.match(numbers) && pwd.match(specialChar)
    ){
        pwdElement.classList.add('valid-text');
        pwdElement.classList.remove('invalid-text');
    }else {
        pwdElement.classList.add('invalid-text');
        pwdElement.classList.remove('valid-text');
    }
}
);

/**
 * user name validation logic
 */
document.getElementById('uname').addEventListener('input' , 
function(ev){
    let unameElement = ev.target;
    let uname = unameElement.value;

    // Validate length
    if (uname.length >= 3 ){
        // console.log("valid"); 
        uname_lengthElement.classList.remove('invalid');
        uname_lengthElement.classList.add('valid');
       
    }
    else{
        // console.log("invalid");
        uname_lengthElement.classList.remove('valid');
        uname_lengthElement.classList.add('invalid');
    }

    // Validata first letter
    let firstLetter = /^[a-zA-z]/;
    // console.log("first letter? " + uname.match(firstLetter));
    if (uname.match(firstLetter)){
        uname_letterElement.classList.remove('invalid');
        uname_letterElement.classList.add('valid');
    }else{
        uname_letterElement.classList.remove('valid');
        uname_letterElement.classList.add('invalid');
    }

    // text outline
    if (uname.length >= 3 && uname.match(firstLetter)){
        unameElement.classList.add('valid-text');
        unameElement.classList.remove('invalid-text');
    }else {
        unameElement.classList.add('invalid-text');
        unameElement.classList.remove('valid-text');
    }
}
);

// document.getElementsByClassName('submit').addEventListener('click');
'use strict';

var firstNameField = document.getElementById('first_name');
var lastNameField = document.getElementById('last_name');
var dateOfBirthField = document.getElementById('date_of_birth');
var genderField = document.getElementById('gender');

var emailField = document.getElementById('email');
var reTypeEmailField = document.getElementById('re_type_email');
var passwordField = document.getElementById('password');
var reTypePasswordField = document.getElementById('re_type_password');
var securityQuestionField = document.getElementById('security_question');
var securityAnswerField = document.getElementById('security_answer');

var addressField = document.getElementById('address');
var cityField = document.getElementById('city');
var stateField = document.getElementById('state');
var zipField = document.getElementById('zip');
var phoneNumberField = document.getElementById('phone_number');

var registerBtn = document.getElementById('register_btn');

registerBtn.onclick = function () {
  var isAllCorrect = checkAllFields();
  if(isAllCorrect) {
    document.getElementById("register_btn").setAttribute("type", "submit");
  }
}

function checkAllFields() {
  var myList = new Array();
  myList.push(isInputFieldEmpty(firstNameField));
  myList.push(isInputFieldEmpty(lastNameField));
  myList.push(isInputFieldEmpty(dateOfBirthField));
  myList.push(isInputFieldEmpty(genderField));

  myList.push(isInputFieldEmpty(emailField));
  myList.push(isInputFieldEmpty(reTypeEmailField));
  myList.push(isInputFieldEmpty(passwordField));
  myList.push(isInputFieldEmpty(reTypePasswordField));
  myList.push(isInputFieldEmpty(securityQuestionField));
  myList.push(isInputFieldEmpty(securityAnswerField));

  myList.push(isInputFieldEmpty(addressField));
  myList.push(isInputFieldEmpty(cityField));
  myList.push(isInputFieldEmpty(stateField));
  myList.push(isInputFieldEmpty(zipField));
  myList.push(isInputFieldEmpty(phoneNumberField));

  for (var i = 0; i < myList.length; i++) {
    if(!myList[i]){
      return false;
    }
  }
  return true;
}

function isInputFieldEmpty(inputField) {
  if (inputField.value == "") {
    inputField.className = "input-error";
    return false;
  } else {
    inputField.classList.remove("input-error");
    return true;
  }
}
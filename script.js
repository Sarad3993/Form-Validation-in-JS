// js for validation of form


// first let's import everything from the DOM
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm_password');


// function for showing input error message
function showError(input, message) {
  const formControl = input.parentElement; // to get the parent that is declared in html section (in our case class "form-control" is the parent)

  // now we overwrite the class name "form-control" by also addding the error class to it;
  formControl.className = 'form-control error';
  // now if i try to submit the form without validating it ; red color border and an error message is shown as mentioned in css part

  // to display the required error message
  // querySelector can take a class, id or a tag itself
  // here we target small tag by using querySelector
  const small = formControl.querySelector('small');
  small.innerText = message; // our required message is passed as a parameter in above function and we display it now in place of default message
}


// function for success (outline must be green)
// input as a parameter takes the username passed to it
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
  // we set the class name to success so that now the css part is fired
  // and thus if that field is correct and properly validated green bordered outline is shown
}


// function for getting field name during validation
function getFieldName(input) {
    // now i want to return the input Id but also uppercase the first letter of that field name
  
    // here is little bit tricky part
    // we first get the initial letter of that field name and then convert it into uppercase ; later we concatenate  the rest of the words of that field name but this time we slice the string and start from 2nd character which means index 1
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }
  

// validation/check required fields
function checkRequired(inputArray) {
  // now we have to loop through the array and then check for each inputs
  // forEach is used to loop through the array and we can then perform the task within the loop
  inputArray.forEach(function (input) {
    if (input.value.trim() == '') {
      showError(input, `${getFieldName(input)} is required!`);
      // for message i have used backticks(``) to pass it as a template string 
      // trim() to remove any whitespaces 
    } else {
      showSuccess(input);
    }
  });
}


// check input length for username and password 
function checkLength(input,min,max){
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters! `);
    }
    else if (input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters! `);
    }
    else{
        showSuccess(input);
    }
}


// function that checks whether both passwords match or not 
function checkPasswordsMatch(input1,input2){
    if(input1.value !== input2.value){
        showError(input2,'Passwords do not match!');
    }
}


// function for validation of email:
// go to google and search the regular expression for email validation: js email regex
// and paste it inside this function
// NOTE: validation must be done in server side as well cuz this validation in js can easily be disabled

function checkEmail(input) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(regex.test(input.value.trim())){
          showSuccess(input);
      }
      else {
          showError(input,`${getFieldName(input)} is not valid!`);
      }
  }
  

// Now we need to add the event listener  on the form when we submit it
// we are listening for Submit on this form
form.addEventListener('submit', function (event) {
  event.preventDefault(); // actually submits the form without flashing it

  // instead of calling the function four different times ; we call the function once and create a array of inputs
  checkRequired([username, email, password, confirm_password]);
  // once we click submit button it's gonna run the checkRequired() function ; pass all the inputs as an array and loop through the array one by one and check the condition mentioned above inside the function

  checkLength(username, 4 ,20); // minimum 3 and max 20 
  checkLength(password,6,30);
  checkEmail(email);
  checkPasswordsMatch(password,confirm_password);  
});

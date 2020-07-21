// js for validation of form 

// first let's bring everything from the DOM 
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


// function for showing input error message
function showError (input,message){
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
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
    // we set the class name to success so that now the css part is fired 
    // and thus if that field is correct and properly validated green bordered outline is shown 
}


// function for validation of email:
// go to google and search the regular expression for email validation: js email regex 
// and paste it inside this function 
// NOTE: validation must be done in server side as well cuz this validation in js can easily be disabled 

function isValidEmail (email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



// now we need to add the event listener  on the form when we submit it 
// we are listening for submit on this form 
form.addEventListener('submit',function(event){
    event.preventDefault(); // actually submits the form without flashing 
    // now we do some work on validation 
   if(username.value == '') {
        showError(username,'Username is required');
   }
   else {
       showSuccess(username);
   }
   
   if(email.value == '') {
        showError(email,'Email is required');
   }
   else if (!isValidEmail(email.value)){
        showError(email,'Email is not valid');
   }
   else {
       showSuccess(email);
   }

   if(password.value == '') {
        showError(password,'Password is required');
   }
   else {
       showSuccess(password);
   }

   if(password2.value == '') {
        showError(password2,' Confirm password is required');
   }
   else {
       showSuccess(password2);
   }
     
});
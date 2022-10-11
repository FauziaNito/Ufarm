const form = document.getElementById('registerUF');
const firstName = document.registration.firstname;
const lastName = document.registration.lastname;
const phoneNumber = document.registration.phonenumber;
const ninNumber = document.registration.ninnumber;
const farmerOneWard = document.registration.ward;
const regDate = document.registration.regdate;
const birthDate = document.registration.birthdate;
const gender = document.registration.gender;
const latitude = document.registration.lat;
const longitude = document.registration.longt;
const activityRegister = document.registration.register;
const activityInspect = document.registration.inspect;
const activityApprove = document.registration.approve;

// Event listener on the form's submit event
form.addEventListener('submit', e => {
    e.preventDefault();
    urbanFarmer();
});

// Function combining all the input validations on FarmerOne Registration
const urbanFarmer = () => {
    checkFirstName();
    // checkNinNumber();
    // checkPhoneNumber();
    // checkWard();
    // checkResidentType();
    // checkPeriodOfStay();
    // checkDateOfBirth();
    // checkLatitude();
    // checkLongitude();
}
// Error message function to be called incase of any form invalidation
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}
// Success message function to be called incase correct validation
const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

// Urban Farmer First Name input value validation
const checkFirstName = () => {
    let alphaRegex = /^[A-Za-z]+$/;
    const min = 3;
    const max = 15;
    let firstNameValue = firstName.value.trim();
    // check if input field is empty
    if (firstNameValue == '') {
        setError(firstName, 'Please Provide Urban Farmer First Name');
        firstName.style.border = '2px solid red';
        // firstName.focus(); 

        return false;
    }

    if (firstNameValue.length < min || firstNameValue.length > max) {
        setError(firstName, 'Urban Farmer name must be between 3 and 15 letters');
        firstName.style.border = '2px solid red';
        // firstName.focus(); 
        return false;
    }

    if (!(nameValue.match(alphaRegex))) {
        setError(firstName, 'FarmerOne names should have letters and numbers');
        firstName.style.border = '2px solid red';
        // firstName.focus();

        return false;
    } else {
        firstName.style.border = '2px solid green';
        setSuccess(firstName);
        // ninNumber.focus();
        return true;
    }
}

firstName.addEventListener('focusout', checkFirstName);
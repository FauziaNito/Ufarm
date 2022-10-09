const form = document.getElementById('registerFO');
const farmerOneName = document.registration.names;
const ninNumber = document.registration.ninnumber;
const phoneNumber = document.registration.phonenumber;
const ward = document.registration.ward;
const residentType = document.registration.residenttype;
const periodOfStay = document.registration.periodofstay;
const regDate = document.registration.regdate;
const birthDate = document.registration.birthdate;
const gender = document.registration.gender;
const latitude = document.registration.lat;
const longitude = document.registration.longt;
const activityRegister = document.registration.register;
const activityInspect = document.registration.inspect;
const activityApprove = document.registration.approve;

// Event listener on the form's submit event
form.addEventListener('submit', e =>{
    e.preventDefault();
    farmerOneForm();
});

// Function combining all the validations on FarmerOne Registration
const farmerOneForm = () =>{
    checkName();
}

const setError = (element, message) =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = (element) =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const checkName = () =>{
    let alphaRegex = /^[A-Za-z]+$/;
    const min = 5;
    const max = 25
    let nameValue = farmerOneName.value.trim();

    if(nameValue == ''){
        setError(farmerOneName, 'Please Provide FarmerOne names')
        farmerOneName.style.border = '2px solid red';
        // farmerOneName.focus(); 

        return false;
    }

    if(nameValue.length < min || nameValue.length > max){
        setError(farmerOneName, 'FarmerOne names must be between 5 and 25 letters');
        farmerOneName.style.border = '2px solid red';
        // farmerOneName.focus(); 
        return false;
    }

    if(!(nameValue.match(alphaRegex))){
        setError(farmerOneName, 'FarmerOne names should have letters and numbers');
        farmerOneName.style.border = '2px solid red';
        // farmerOneName.focus();
        
        return false;
    } else {
        farmerOneName.style.border = '2px solid green';
        setSuccess(farmerOneName);
        // ninNumber.focus();
        return true;
    }
}

farmerOneName.addEventListener('focusout', checkName);
const form = document.getElementById('registerFO');
const farmerOneName = document.registration.names;
const ninNumber = document.registration.ninnumber;
const phoneNumber = document.registration.phonenumber;
const farmerOneWard = document.registration.ward;
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
form.addEventListener('submit', e => {
    e.preventDefault();
    farmerOneForm();
});

// Function combining all the input validations on FarmerOne Registration
const farmerOneForm = () => {
    checkName();
    checkNinNumber();
    checkPhoneNumber();
    checkWard();
    checkResidentType();
    checkPeriodOfStay();
    checkDateOfBirth();
    checkLatitude();
    checkLongitude();
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

// FamerOne Name input value validation
const checkName = () => {
    let alphaRegex = /^[A-Za-z]+$/;
    const min = 5;
    const max = 25
    let nameValue = farmerOneName.value.trim();
    // check if input field is empty
    if (nameValue == '') {
        setError(farmerOneName, 'Please Provide FarmerOne names');
        farmerOneName.style.border = '2px solid red';
        // farmerOneName.focus(); 

        return false;
    }

    if (nameValue.length < min || nameValue.length > max) {
        setError(farmerOneName, 'FarmerOne names must be between 5 and 25 letters');
        farmerOneName.style.border = '2px solid red';
        // farmerOneName.focus(); 
        return false;
    }

    if (!(nameValue.match(alphaRegex))) {
        setError(farmerOneName, 'FarmerOne names should not have Sysmbols');
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

// FamerOne NIN Number input value validation

const checkNinNumber = () => {
    let ninRegex = /^[a-zA-Z]+[0-9]+[a-zA-Z]+$/;
    const max = 14;

    let ninValue = ninNumber.value.trim();
    // check if input field is empty
    if (ninValue == '') {
        setError(ninNumber, 'Please Provide FarmerOne NIN Number');
        ninNumber.style.border = '2px solid red';
        // ninNumber.focus();
        return false;
    }

    if (ninValue.length < max || ninValue.length > max) {
        setError(ninNumber, 'A valid NIN Number has a total of 14 characters');
        ninNumber.style.border = '2px solid red';
        // ninNumber.focus();
        return false;
    }

    if (ninValue.match(ninRegex)) {
        setSuccess(ninNumber);
        ninNumber.style.border = '2px solid green';
        //  phoneNumber.focus();
        return true;


    } else {
        setError(ninNumber, 'Please enter a valid NIN Number');
        ninNumber.style.border = '2px solid red';
        // ninNumber.focus();
        return false;
    }
}


// FamerOne Phone Number input value validation

const checkPhoneNumber = () => {
    let phoneDigits = /^\d{10}$/;
    let phoneValue = phoneNumber.value.trim();

    // check if input field is empty
    if (phoneValue == '') {
        setError(phoneNumber, 'Please Provide FarmerOne Phone Number');
        phoneNumber.style.border = '2px solid red';
        // phoneNumber.focus();
        return false;
    }

    if (!(phoneValue.match(phoneDigits))) {
        setError(phoneNumber, 'Phone Number should have 10 digits');
        phoneNumber.style.border = '2px solid red';
        // phoneNumber.focus();
        return false;
    } else {
        setSuccess(phoneNumber);
        phoneNumber.style.border = '2px solid green';
        // ward.focus();
        return true;
    }
}

// FamerOne ward input value validation
const checkWard = () => {

    let defaultSelection = farmerOneWard.value//'Appoint a ward to this farmerOne';


    if (defaultSelection === 'Appoint a ward to this farmerOne') {
        setError(farmerOneWard, 'Give this FarmerOne a Ward');
        farmerOneWard.style.border = '2px solid red';
        // ward.focus();
        return false;


    } else {
        setSuccess(farmerOneWard);
        farmerOneWard.style.border = '2px solid green';
        // residentType.focus();
        return true;
    }

}

// FamerOne Date input value validation

const checkResidentType = () => {

    // let defaultSelection = 'Select Resident Type';
    let defaultSelection = residentType.value;


    if (!(defaultSelection == 'Select Resident Type')) {

        setSuccess(residentType);
        residentType.style.border = '2px solid green';
        // periodOfStay.focus();
        return true;
        

    } else {
        setError(residentType, 'Select FarmerOne Resident Type');
        residentType.style.border = '2px solid red';
        // residentType.focus();
        return false;
    }

}

// FamerOne Period of stay input value validation
const checkPeriodOfStay = () =>{
    let periodOfStayValue = periodOfStay.value;
    let minPeriod = 10;

    if(periodOfStayValue < minPeriod){
        setError(periodOfStay, 'FarmerOne has not Stayed in the ward for 10 years');
        periodOfStay.style.border = '2px solid red';
        // residentType.focus();
        return false;
    }

    if (!(periodOfStayValue == 'Select Period of Stay')) {

        setSuccess(periodOfStay);
        periodOfStay.style.border = '2px solid green';
        // periodOfStay.focus();
        return true;
        

    }else {
        setError(periodOfStay, 'Select FarmerOne Resident Type');
        periodOfStay.style.border = '2px solid red';
        // regDate.focus();
        return false;
    }

}
     /**************/
// !!!!Remember to set Date of Registration to system date
     /********* */ 

// FamerOne Date of Birth input value validation

const checkDateOfBirth = () =>{
    let dateRegex = /^(0?[1-9]|[12][0-9]|3[01]).*(0?[1-9]|[1][0-2]).*[0-9]+$/;

    let defaultSelection = 'mm/dd/yyyy';

    if(birthDate.value ==defaultSelection){
        setError(birthDate, 'Select FarmerOne date of birth');
        birthDate.style.border = '2px solid red';
        // residentType.focus();
        return false;
    }

    if(birthDate.value.match(dateRegex)){
        setSuccess(birthDate);
        birthDate.style.border = '2px solid green';
        // periodOfStay.focus();
        return true;
    }else{
        setError(birthDate, 'Select FarmerOne date of birth');
        birthDate.style.border = '2px solid red';
        // regDate.focus();
        return false;
    }
}
// FamerOne latitude direction input value validation

const checkLatitude = () =>{
    let locationRegex = /^(-?\d+(\.\d+)?).\s*(-?\d+(\.\d+)?)$/;

    let latValue = latitude.value.trim();

    if(latValue == ''){
        setError(latitude, 'Enter latitude, use the button below to find coordinates');
        latitude.style.border = '2px solid red';
        // phoneNumber.focus();
        return false;
    }

    if(latValue.match(locationRegex)){
        setSuccess(latitude);
        latitude.style.border = '2px solid green';
        // ward.focus();
        return true;
    }else{
        setError(latitude, 'This value is not a correct coordinate value');
        latitude.style.border = '2px solid red';
        // phoneNumber.focus();
        return false;
    }

}

const checkLongitude = () =>{
    // Anthor Regex for both lat & long ^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$
    let locationRegex = /^(-?\d+(\.\d+)?).\s*(-?\d+(\.\d+)?)$/;

    let longValue = longitude.value.trim();

    if(longValue == ''){
        setError(longitude, 'Enter Longitude, use the button below to find coordinates');
        longitude.style.border = '2px solid red';
        // phoneNumber.focus();
        return false;
    }

    if(longValue.match(locationRegex)){
        setSuccess(longitude);
        longitude.style.border = '2px solid green';
        // ward.focus();
        return true;
    }else{
        setError(longitude, 'This value is not a correct coordinate value');
        longitude.style.border = '2px solid red';
        // phoneNumber.focus();
        return false;
    }

}

farmerOneName.addEventListener('focusout', checkName);
ninNumber.addEventListener('focusout', checkNinNumber);
phoneNumber.addEventListener('focusout', checkPhoneNumber);
farmerOneName.addEventListener('focusout', checkWard);
residentType.addEventListener('focusout', checkResidentType);
periodOfStay.addEventListener('focusout', checkPeriodOfStay);
birthDate.addEventListener('focusout', checkDateOfBirth);
latitude.addEventListener('focusout', checkLatitude);
longitude.addEventListener('focusout', checkLongitude);
const form = document.getElementById("registerUF");
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
form.addEventListener("submit", (e) => {
	e.preventDefault();
	urbanFarmer();
});

// Function combining all the input validations on FarmerOne Registration
const urbanFarmer = () => {
	checkFirstName();
	checkLastName();
	checkNinNumber();
	checkPhoneNumber();
	// checkWard();
	checkDateOfBirth();
	checkLatitude();
	checkLongitude();
};
// Error message function to be called incase of any form invalidation
const setError = (element, message) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".error");

	errorDisplay.innerText = message;
	inputControl.classList.add("error");
	inputControl.classList.remove("success");
};
// Success message function to be called incase correct validation
const setSuccess = (element) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".error");

	errorDisplay.innerText = "";
	inputControl.classList.add("success");
	inputControl.classList.remove("error");
};

// Urban Farmer First Name input value validation
const checkFirstName = () => {
	let alphaRegex = /^[A-Za-z]+$/;
	const min = 3;
	const max = 15;
	let firstNameValue = firstName.value.trim();
	// check if input field is empty
	if (firstNameValue == "") {
		setError(firstName, "Please Provide Urban Farmer First Name");
		firstName.style.border = "2px solid red";
		// firstName.focus();

		return false;
	}

	if (firstNameValue.length < min || firstNameValue.length > max) {
		setError(firstName, "Urban Farmer name must be between 3 and 15 letters");
		firstName.style.border = "2px solid red";
		// firstName.focus();
		return false;
	}

	if (!firstNameValue.match(alphaRegex)) {
		setError(firstName, "FarmerOne names should have Symbols");
		firstName.style.border = "2px solid red";
		// firstName.focus();

		return false;
	} else {
		firstName.style.border = "2px solid green";
		setSuccess(firstName);
		// ninNumber.focus();
		return true;
	}
};
// Urban Farmer Last Name input value validation
const checkLastName = () => {
	let alphaRegex = /^[A-Za-z]+$/;
	const min = 3;
	const max = 15;
	let lastNameValue = lastName.value.trim();
	// check if input field is empty
	if (lastNameValue == "") {
		setError(lastName, "Please Provide Urban Farmer First Name");
		lastName.style.border = "2px solid red";
		// lastName.focus();

		return false;
	}

	if (lastNameValue.length < min || lastNameValue.length > max) {
		setError(lastName, "Urban Farmer name must be between 3 and 15 letters");
		lastName.style.border = "2px solid red";
		// lastName.focus();
		return false;
	}

	if (!lastNameValue.match(alphaRegex)) {
		setError(lastName, "FarmerOne names should have letters and numbers");
		lastName.style.border = "2px solid red";
		// lastName.focus();

		return false;
	} else {
		lastName.style.border = "2px solid green";
		setSuccess(lastName);
		// ninNumber.focus();
		return true;
	}
};
//Urban Framer NIN Number input value validation
const checkNinNumber = () => {
	let ninRegex = /^[a-zA-Z]+[0-9]+[a-zA-Z]+$/;
	const max = 14;

	let ninValue = ninNumber.value.trim();
	// check if input field is empty
	if (ninValue == "") {
		setError(ninNumber, "Please Provide FarmerOne NIN Number");
		ninNumber.style.border = "2px solid red";
		// ninNumber.focus();
		return false;
	}

	if (ninValue.length < max || ninValue.length > max) {
		setError(ninNumber, "A valid NIN Number has a total of 14 characters");
		ninNumber.style.border = "2px solid red";
		// ninNumber.focus();
		return false;
	}

	if (ninValue.match(ninRegex)) {
		setSuccess(ninNumber);
		ninNumber.style.border = "2px solid green";
		//  phoneNumber.focus();
		return true;
	} else {
		setError(ninNumber, "Please enter a valid NIN Number");
		ninNumber.style.border = "2px solid red";
		// ninNumber.focus();
		return false;
	}
};

// Urban Farmer Phone Number input value validation
const checkPhoneNumber = () => {
	let phoneDigits = /^\d{10}$/;
	let phoneValue = phoneNumber.value.trim();

	// check if input field is empty
	if (phoneValue == "") {
		setError(phoneNumber, "Please Provide FarmerOne Phone Number");
		phoneNumber.style.border = "2px solid red";
		// phoneNumber.focus();
		return false;
	}

	if (!phoneValue.match(phoneDigits)) {
		setError(phoneNumber, "Phone Number should have 10 digits");
		phoneNumber.style.border = "2px solid red";
		// phoneNumber.focus();
		return false;
	} else {
		setSuccess(phoneNumber);
		phoneNumber.style.border = "2px solid green";
		// ward.focus();
		return true;
	}
};

     /**************/
// !!!!Remember to set Date of Registration to system date
     /********* */ 

// FamerOne Date of Birth input value validation

const checkDateOfBirth = () => {
	let dateRegex = /^(0?[1-9]|[12][0-9]|3[01]).*(0?[1-9]|[1][0-2]).*[0-9]+$/;

	let defaultSelection = "mm/dd/yyyy";

	if (birthDate.value == defaultSelection) {
		setError(birthDate, "Select FarmerOne date of birth");
		birthDate.style.border = "2px solid red";
		// residentType.focus();
		return false;
	}

	if (birthDate.value.match(dateRegex)) {
		setSuccess(birthDate);
		birthDate.style.border = "2px solid green";
		// periodOfStay.focus();
		return true;
	} else {
		setError(birthDate, "Select FarmerOne date of birth");
		birthDate.style.border = "2px solid red";
		// regDate.focus();
		return false;
	}
};
// FamerOne latitude direction input value validation
const checkLatitude = () => {
	let locationRegex = /^(-?\d+(\.\d+)?).\s*(-?\d+(\.\d+)?)$/;

	let latValue = latitude.value.trim();

	if (latValue == "") {
		setError(latitude, "Enter latitude, use the button below to find coordinates");
		latitude.style.border = "2px solid red";
		// phoneNumber.focus();
		return false;
	}

	if (latValue.match(locationRegex)) {
		setSuccess(latitude);
		latitude.style.border = "2px solid green";
		// ward.focus();
		return true;
	} else {
		setError(latitude, "This value is not a correct coordinate value");
		latitude.style.border = "2px solid red";
		// phoneNumber.focus();
		return false;
	}
};
// Urban Farmer latitude direction input value validation
const checkLongitude = () => {
	// Anthor Regex for both lat & long ^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$
	let locationRegex = /^(-?\d+(\.\d+)?).\s*(-?\d+(\.\d+)?)$/;

	let longValue = longitude.value.trim();

	if (longValue == "") {
		setError(longitude, "Enter Longitude, use the button below to find coordinates");
		longitude.style.border = "2px solid red";
		// phoneNumber.focus();
		return false;
	}

	if (longValue.match(locationRegex)) {
		setSuccess(longitude);
		longitude.style.border = "2px solid green";
		// ward.focus();
		return true;
	} else {
		setError(longitude, "This value is not a correct coordinate value");
		longitude.style.border = "2px solid red";
		// phoneNumber.focus();
		return false;
	}
};

firstName.addEventListener("focusout", checkFirstName);
lastName.addEventListener("focusout", checkLastName);
ninNumber.addEventListener("focusout", checkNinNumber);
phoneNumber.addEventListener("focusout", checkPhoneNumber);
birthDate.addEventListener("focusout", checkDateOfBirth);
latitude.addEventListener("focusout", checkLatitude);
longitude.addEventListener("focusout", checkLongitude);

const form = document.getElementById("registerFO");
const firstName = document.registration.firstname;
const lastName = document.registration.lastname;
const uniqueNumber = document.registration.uniquenumber;
const farmerRole = document.registration.role;
const ninNumber = document.registration.ninnumber;
const phoneNumber = document.registration.phonenumber;
const farmerOneWard = document.registration.ward;
const residentType = document.registration.residenttype;
const periodOfStay = document.registration.periodofstay;
const regDate = document.registration.regdate;
const birthDate = document.registration.birthdate;
const gender = document.registration.gender;
const streetName = document.registration.streetname;
const houseNumber = document.registration.housenumber;
const activityRegister = document.registration.register;
const activityInspect = document.registration.inspect;
const activityApprove = document.registration.approve;

// Event listener on the form's submit event
form.addEventListener("submit", (e) => {
	e.preventDefault();
	farmerOneForm();
});

// form.addEventListener("submit",farmerOneForm);

// Function combining all the input validations on FarmerOne Registration
const farmerOneForm = () => {
	checkFirstName();
	checkLastName();
	checkUniqueNumber();
	checkNinNumber();
	checkWard();
	checkResidentType();
	checkPeriodOfStay();
	checkDateOfBirth();
	checkStreetName();
	checkHouseNumber();
	checkRole();
	checkPhoneNumber();
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

//FarmerOne First Name input value validation
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
//FarmerOne Last Name input value validation
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
// FamerOne Unique Number input value validation
const checkUniqueNumber = () => {
	let uniqueNoRegex = /MW[0-9]+-[0-9]+/;
	let defaultUnique = "forexample MW1-001";

	let uniqueValue = uniqueNumber.value.trim();
	// check if input field is empty
	if (uniqueValue == "") {
		setError(uniqueNumber, "Please Provide FarmerOne Unique Number");
		uniqueNumber.style.border = "2px solid red";
		// uniqueNumber.focus();
		return false;
	}

	if ((uniqueValue = defaultUnique)) {
		setError(uniqueNumber, "Please Change the Unique Number");
		uniqueNumber.style.border = "2px solid red";
		// uniqueNumber.focus();
		return false;
	}

	if (uniqueValue.match(uniqueNoRegex)) {
		setSuccess(uniqueNumber);
		uniqueNumber.style.border = "2px solid green";
		//  phoneNumber.focus();
		return true;
	} else {
		setError(uniqueNumber, "Please enter a valid NIN Number");
		uniqueNumber.style.border = "2px solid red";
		// uniqueNumber.focus();
		return false;
	}
};

// FamerOne Role input value validation
const checkRole = () => {
	let defaultSelection = farmerRole.value; //'Appoint a ward to this farmerOne';

	if (defaultSelection === "Appoint a ward to this farmerOne") {
		setError(farmerRole, "Give this FarmerOne a Ward");
		farmerRole.style.border = "2px solid red";
		// farmerRole.focus();
		return false;
	} else {
		setSuccess(farmerRole);
		farmerRole.style.border = "2px solid green";
		// residentType.focus();
		return true;
	}
};

// FamerOne NIN Number input value validation

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

// FamerOne Phone Number input value validation

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

// FamerOne ward input value validation
const checkWard = () => {
	let defaultSelection = farmerOneWard.value; //'Appoint a ward to this farmerOne';

	if (defaultSelection === "Appoint a ward to this farmerOne") {
		setError(farmerOneWard, "Give this FarmerOne a Ward");
		farmerOneWard.style.border = "2px solid red";
		// ward.focus();
		return false;
	} else {
		setSuccess(farmerOneWard);
		farmerOneWard.style.border = "2px solid green";
		// residentType.focus();
		return true;
	}
};

// FamerOne Date input value validation

const checkResidentType = () => {
	// let defaultSelection = 'Select Resident Type';
	let defaultSelection = residentType.value;

	if (!(defaultSelection == "Select Resident Type")) {
		setSuccess(residentType);
		residentType.style.border = "2px solid green";
		// periodOfStay.focus();
		return true;
	} else {
		setError(residentType, "Select FarmerOne Resident Type");
		residentType.style.border = "2px solid red";
		// residentType.focus();
		return false;
	}
};

// FamerOne Period of stay input value validation
const checkPeriodOfStay = () => {
	let periodOfStayValue = periodOfStay.value;
	let minPeriod = 10;

	if (periodOfStayValue = "") {
		setError(periodOfStay, "Set Period of stay for this farmer One");
		periodOfStay.style.border = "2px solid red";
		// residentType.focus();
		return false;
	}

	if (periodOfStayValue < minPeriod) {
		setError(periodOfStay, "FarmerOne has not Stayed in the ward for 10 years");
		periodOfStay.style.border = "2px solid red";
		// residentType.focus();
		return false;
	}

	if (!(periodOfStayValue == "Select Period of Stay")) {
		setSuccess(periodOfStay);
		periodOfStay.style.border = "2px solid green";
		// periodOfStay.focus();
		return true;
	} else {
		setError(periodOfStay, "Select FarmerOne Resident Type");
		periodOfStay.style.border = "2px solid red";
		// regDate.focus();
		return false;
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
// FamerOne Street Name input value validation

const checkStreetName = () => {
	let streetRegex = /^[0-9a-zA-Z]+$/;

	let streetValue = streetName.value.trim();

	if (streetValue == "") {
		setError(streetName, "Please provide Street Name, ");
		streetName.style.border = "2px solid red";
		// phoneNumber.focus();
		return false;
	}

	if (streetValue.match(streetRegex)) {
		setSuccess(streetName);
		streetName.style.border = "2px solid green";
		// ward.focus();
		return true;
	} else {
		setError(streetName, "This not a valid Street Name");
		streetName.style.border = "2px solid red";
		// phoneNumber.focus();
		return false;
	}
};

// FamerOne House Number input value validation

const checkHouseNumber = () => {
	let houseNoRegex = /^[0-9a-zA-Z]+$/;

	let houseNoValue = houseNumber.value.trim();

	if (houseNoValue == "") {
		setError(houseNumber, "Please provide House Number, ");
		houseNumber.style.border = "2px solid red";
		// phoneNumber.focus();
		return false;
	}

	if (houseNoValue.match(houseNoRegex)) {
		setSuccess(houseNumber);
		houseNumber.style.border = "2px solid green";
		// ward.focus();
		return true;
	} else {
		setError(houseNumber, "This not a valid House Number");
		houseNumber.style.border = "2px solid red";
		// phoneNumber.focus();
		return false;
	}
};

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
uniqueNumber.addEventListener("focusout", checkUniqueNumber);
farmerRole.addEventListener("focusout", checkRole);
ninNumber.addEventListener("focusout", checkNinNumber);
phoneNumber.addEventListener("focusout", checkPhoneNumber);
farmerOneWard.addEventListener("focusout", checkWard);
residentType.addEventListener("focusout", checkResidentType);
periodOfStay.addEventListener("focusout", checkPeriodOfStay);
birthDate.addEventListener("focusout", checkDateOfBirth);
streetName.addEventListener("focusout", checkStreetName);
houseNumber.addEventListener("focusout", checkHouseNumber);

// Alphanumeric == /^[0-9a-zA-Z]+$/
// Alphabets == /^[A-Za-z]+$/
// Numbers == /^[0-9]+$/
// Emails == /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

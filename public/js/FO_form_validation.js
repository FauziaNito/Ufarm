//Setting FarmerOne Date of Registration
let today = new Date();
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();
let currentDate = today.getDate();
var current_date = `${currentYear}/${currentMonth}/${currentDate}`;
console.log(current_date);
// document.getElementById("regdate").value = current_date;

document.getElementById("regdate").valueAsDate = new Date();

const FarmerOneForm = (event) => {
	var firstName = document.getElementById("firstname");
	var lastName = document.getElementById("lastname");
	var uniqueNumber = document.getElementById("uniquenumber");
	var password = document.getElementById("password");
	var farmerRole = document.getElementById("role");
	var ninNumber = document.getElementById("ninnumber");
	var phoneNumber = document.getElementById("phonenumber");
	var residentType = document.getElementById("residenttype");
	var periodOfStay = document.getElementById("periodofstay");
	var birthDate = document.getElementById("birthdate");
	var ward = document.getElementById("ward");
	var streetName = document.getElementById("streetname");
	var houseNumber = document.getElementById("housenumber");
	var activityRegister = document.registration.register;
	var activityInspect = document.registration.inspect;
	var activityApprove = document.registration.approve;
	var gender = document.registration.gender;

	var firstNameError = document.getElementById("firstnameerr");
	var lastNameError = document.getElementById("lastnameerr");
	var uniqueNumberError = document.getElementById("uniquenumbererr");
	var passwordError = document.getElementById("passworderr");
	var farmerRoleError = document.getElementById("roleerr");
	var ninNumberError = document.getElementById("ninNumberError");
	var phoneNumberError = document.getElementById("phonenumbererr");
	var residentTypeError = document.getElementById("residenttypeerr");
	var periodOfStayError = document.getElementById("periodofstayerr");
	var dateOfBirthError = document.getElementById("birthdateerr");
	var wardError = document.getElementById("warderr");
	var streetNameError = document.getElementById("streetnameerr");
	var houseNumberError = document.getElementById("housenumbererr");
	var radioError = document.getElementById("genderradioerr");
	let error = 0;

	//FarmerOne First Name input value validation
	let alphaRegex = /^[A-Za-z]+$/;
	const nameMin = 3;
	const nameMax = 15;
	let firstNameValue = firstName.value.trim();
	if (firstNameValue == "") {
		firstName.style.border = "1px solid red";
		firstNameError.textContent = "Please Enter Farmer One First Name";
		firstNameError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (firstNameValue.length < nameMin || firstNameValue.length > nameMax) {
		firstName.style.border = "1px solid red";
		firstNameError.textContent = "Farmer One name must be between 3 and 15 letters";
		firstNameError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (!firstNameValue.match(alphaRegex)) {
		firstName.style.border = "1px solid red";
		firstNameError.textContent = "FarmerOne names can't have Symbols";
		firstNameError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		firstName.style.border = "1px solid green";
		firstNameError.textContent = "";
	}

	//FarmerOne Last Name input value validation
	let lastNameValue = lastName.value.trim();
	if (lastNameValue == "") {
		lastName.style.border = "1px solid red";
		lastNameError.textContent = "Please Enter Farmer One First Name";
		lastNameError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (lastNameValue.length < nameMin || lastNameValue.length > nameMax) {
		lastName.style.border = "1px solid red";
		lastNameError.textContent = "Farmer One name must be between 3 and 15 letters";
		lastNameError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (!lastNameValue.match(alphaRegex)) {
		lastName.style.border = "1px solid red";
		lastNameError.textContent = "FarmerOne names should have Symbols";
		lastNameError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		lastName.style.border = "1px solid green";
		lastNameError.textContent = "";
	}
	//FarmerOne Unique Number input validation
	const uniqueRegex = /^FOW[1-4]+-[0-9]+$/; /*/^UF-([0-9]{3})+$/;*/
	const invalidUnique = /^FOW5-[0-9]+$/;

	if (uniqueNumber.value == "") {
		uniqueNumber.style.border = "1px solid red";
		uniqueNumberError.textContent = "Please Enter Farmer One Unique Number";
		uniqueNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (uniqueNumber.value.match(invalidUnique)) {
		uniqueNumber.style.border = "1px solid red";
		uniqueNumberError.textContent = "Sorry Masajja doesn't have Ward 5 try 1-4";
		uniqueNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (!uniqueNumber.value.match(uniqueRegex)) {
		uniqueNumber.style.border = "1px solid red";
		uniqueNumberError.textContent = "Number format FOW1-001, W1 for ward Number";
		uniqueNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		uniqueNumber.style.border = "1px solid green";
		uniqueNumberError.textContent = "";
	}

	//FarmerOne Password input value validation
	if (password.value == "") {
		password.style.border = "1px solid red";
		passwordError.textContent = "Please Enter Password";
		passwordError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (password.value.length < 5) {
		password.style.border = "1px solid red";
		passwordError.textContent = "Password must be more than 5 Characters";
		passwordError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (password.value.length > 15) {
		password.style.border = "1px solid red";
		passwordError.textContent = "Password should not be than 15 Characters";
		passwordError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		password.style.border = "1px solid green";
		passwordError.textContent = "";
	}
	//FarmerOne Role input validation
	if (farmerRole.value == "") {
		farmerRole.style.border = "1px solid red";
		farmerRoleError.textContent = "Please Enter Farmer One Role";
		farmerRoleError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (farmerRole.value == "selectrole") {
		farmerRole.style.border = "1px solid red";
		farmerRoleError.textContent = "Please Select Farmer One Role";
		farmerRoleError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		farmerRole.style.border = "1px solid green";
		farmerRoleError.textContent = "";
	}
	//FarmerOne NIN Number input validation
	// let regex = /^[a-zA-Z][a-zA-Z]-[a-zA-Z][0-9]+-[0-9]+[a-zA-Z][0-9]+$/
	let ninRegex = /^[a-zA-Z][a-zA-Z][0-9]+[a-zA-Z][a-zA-Z][a-zA-Z]$/; ///^[a-zA-Z]+[0-9]+[a-zA-Z]+$/;
	const max = 14;
	if (ninNumber.value == "") {
		ninNumber.style.border = "1px solid red";
		ninNumberError.textContent = "Please Enter NIN Number";
		ninNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (ninNumber.value.length < max || ninNumber.value.length > max) {
		ninNumber.style.border = "1px solid red";
		ninNumberError.textContent = "NIN Number should be 14 Characters";
		ninNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (!ninNumber.value.match(ninRegex)) {
		ninNumber.style.border = "1px solid red";
		ninNumberError.textContent = "Enter a correct NIN Number";
		ninNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		ninNumber.style.border = "1px solid green";
		ninNumberError.textContent = "";
	}
	//FarmerOne Phone Number input validation
	let phoneDigits = /^\d{10}$/;
	if (phoneNumber.value == "") {
		phoneNumber.style.border = "1px solid red";
		phoneNumberError.textContent = "Please Enter Phone Number";
		phoneNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (!phoneNumber.value.match(phoneDigits)) {
		phoneNumber.style.border = "1px solid red";
		phoneNumberError.textContent = "Enter a correct Phone Number";
		phoneNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		phoneNumber.style.border = "1px solid green";
		phoneNumberError.textContent = "";
	}

	// //FarmerOne Resident Type input validation
	if (residentType.value == "") {
		residentType.style.border = "1px solid red";
		residentTypeError.textContent = "Please Select Resident Type";
		residentTypeError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (residentType.value == "selectresident") {
		residentType.style.border = "1px solid red";
		residentTypeError.textContent = "Please Select Resident Type";
		residentTypeError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		residentType.style.border = "1px solid green";
		residentTypeError.textContent = "";
	}

	//FarmerOne Period of Stay input validation
	if (periodOfStay.value == "") {
		periodOfStay.style.border = "1px solid red";
		periodOfStayError.textContent = "Please Enter Period of Stay";
		periodOfStayError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (periodOfStay.value <= 9) {
		periodOfStay.style.border = "1px solid red";
		periodOfStayError.textContent = "Period of stay should be atleast 10 years";
		periodOfStayError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		periodOfStay.style.border = "1px solid green";
		periodOfStayError.textContent = "";
	}

	//FarmerOne Date of Birth input value validation
	let dateRegex = /^(0?[1-9]|[12][0-9]|3[01]).*(0?[1-9]|[1][0-2]).*[0-9]+$/;
	let dateOfBirthValue = birthDate.value;
	let farmerBirth = new Date(dateOfBirthValue);
	let birthYear = farmerBirth.getFullYear();
	let yearDiff = currentYear - birthYear;
	console.log(birthYear);

	if (!birthDate.value.match(dateRegex)) {
		birthDate.style.border = "1px solid red";
		dateOfBirthError.textContent = "Please Select FarmerOne Birth Date";
		dateOfBirthError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (yearDiff <= 18) {
		birthDate.style.border = "1px solid red";
		dateOfBirthError.textContent = "Sorry Farmer One should be 18yrs above";
		dateOfBirthError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		birthDate.style.border = "1px solid green";
		dateOfBirthError.textContent = "";
	}
	//FarmerOne Gender input validation
	if (gender[0].checked == false && gender[1].checked == false && gender[2].checked == false) {
		// gender.style.border = "1px solid red";
		radioError.textContent = "Please Check Gender";
		radioError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		gender.style.border = "1px solid green";
		radioError.textContent = "";
	}
	//FarmerOne Ward input validation
	if (ward.value == "selectward") {
		ward.style.border = "1px solid red";
		wardError.textContent = "Please Select Farmer One Role";
		wardError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		ward.style.border = "1px solid green";
		wardError.textContent = "";
	}
	//FarmerOne Street Name input validation
	let alphaNumRegex = /^[0-9a-zA-Z]+$/;
	if (streetName.value == "") {
		streetName.style.border = "1px solid red";
		streetNameError.textContent = "Please Enter Street Name";
		streetNameError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (!streetName.value.match(alphaNumRegex)) {
		streetName.style.border = "1px solid red";
		streetNameError.textContent = "Enter a correct Street Name without Symbols";
		streetNameError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		streetName.style.border = "1px solid green";
		streetNameError.textContent = "";
	}
	//FarmerOne House Number input validation
	if (houseNumber.value == "") {
		houseNumber.style.border = "1px solid red";
		houseNumberError.textContent = "Please Enter House Number";
		houseNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (!houseNumber.value.match(alphaNumRegex)) {
		houseNumber.style.border = "1px solid red";
		houseNumberError.textContent = "Enter a correct House Number without Symbols";
		houseNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		houseNumber.style.border = "1px solid green";
		houseNumberError.textContent = "";
	}
	if (error > 0) {
		event.preventDefault();
	}
};

// Alphanumeric == /^[0-9a-zA-Z]+$/
// Alphabets == /^[A-Za-z]+$/
// Numbers == /^[0-9]+$/
// Emails == /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

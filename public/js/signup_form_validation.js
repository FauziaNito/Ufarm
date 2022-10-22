//Setting system of Registration
let today = new Date();
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();
let currentDate = today.getDate();
var current_date = `${currentYear}-${currentMonth}-${currentDate}`;

const FarmerOneForm = (event) => {
	var firstName = document.getElementById("firstname");
	var lastName = document.getElementById("lastname");
	var uniqueNumber = document.getElementById("uniquenumber");
	var password = document.getElementById("password");
	var farmerRole = document.getElementById("role");
	var userEmail = document.getElementById("email");
	var phoneNumber = document.getElementById("phonenumber");
	var birthDate = document.getElementById("birthdate");
	var gender = document.registration.gender;

	var firstNameError = document.getElementById("firstnameerr");
	var lastNameError = document.getElementById("lastnameerr");
	var uniqueNumberError = document.getElementById("uniquenumbererr");
	var passwordError = document.getElementById("passworderr");
	var farmerRoleError = document.getElementById("roleerr");
	var userEmailError = document.getElementById("emailerr");
	var phoneNumberError = document.getElementById("phonenumbererr");
	var dateOfBirthError = document.getElementById("birthdateerr");
	var radioError = document.getElementById("genderradioerr");
	let error = 0;

	//FarmerOne First Name input value validation
	let alphaRegex = /^[A-Za-z]+$/;
	const nameMin = 3;
	const nameMax = 15;
	let firstNameValue = firstName.value.trim();
	if (firstNameValue == "") {
		firstName.style.border = "1px solid red";
		firstNameError.textContent = "Please Enter User's First Name";
		firstNameError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (firstNameValue.length < nameMin || firstNameValue.length > nameMax) {
		firstName.style.border = "1px solid red";
		firstNameError.textContent = "User's name must be between 3 and 15 letters";
		firstNameError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (!firstNameValue.match(alphaRegex)) {
		firstName.style.border = "1px solid red";
		firstNameError.textContent = "Farmer's names can't have Symbols";
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
		lastNameError.textContent = "Please Enter User's Last Name";
		lastNameError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (lastNameValue.length < nameMin || lastNameValue.length > nameMax) {
		lastName.style.border = "1px solid red";
		lastNameError.textContent = "Farmer's name must be between 3 and 15 letters";
		lastNameError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (!lastNameValue.match(alphaRegex)) {
		lastName.style.border = "1px solid red";
		lastNameError.textContent = "Farmer's names shouldn't have Symbols";
		lastNameError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		lastName.style.border = "1px solid green";
		lastNameError.textContent = "";
	}
	//Agricutural Officer & General Public Unique Number input validation
	if (uniqueNumber.value == "") {
		uniqueNumber.style.border = "1px solid red";
		uniqueNumberError.textContent = "Please Enter User's Unique Number";
		uniqueNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (farmerRole.value == "agriculturalofficer") {
		let uniqueRegex = /^AO-[0-9]+$/;
		if (!uniqueNumber.value.match(uniqueRegex)) {
			uniqueNumber.style.border = "1px solid red";
			uniqueNumberError.textContent = "Unique Number format for your role is AO-001";
			uniqueNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
			error++;
		} else {
			uniqueNumber.style.border = "1px solid green";
			uniqueNumberError.textContent = "";
		}
	} else if (farmerRole.value == "generalpublic") {
		let alphaNumRegex = /^[0-9a-zA-Z]+$/;
		if (!uniqueNumber.value.match(alphaNumRegex)) {
			uniqueNumber.style.border = "1px solid red";
			uniqueNumberError.textContent = "User Name for Buyer should not have symbols";
			uniqueNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
			error++;
		} else {
			uniqueNumber.style.border = "1px solid green";
			uniqueNumberError.textContent = "";
		}
	} else {
		uniqueNumber.style.border = "1px solid red";
		uniqueNumberError.textContent = "Please enter Unique Number according to the role selected";
		uniqueNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		error++;
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
		farmerRoleError.textContent = "Please Enter User's Role";
		farmerRoleError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (farmerRole.value == "selectrole") {
		farmerRole.style.border = "1px solid red";
		farmerRoleError.textContent = "Please Select User's'Role";
		farmerRoleError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		farmerRole.style.border = "1px solid green";
		farmerRoleError.textContent = "";
	}
	// Email Address input validation
	let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (userEmail.value == "") {
		userEmail.style.border = "1px solid red";
		userEmailError.textContent = "Please Enter User's Email";
		userEmailError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (!userEmail.value.match(emailRegex)) {
		userEmail.style.border = "1px solid red";
		userEmailError.textContent = "Email format should be names@gmail.com";
		userEmailError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		userEmail.style.border = "1px solid green";
		userEmailError.textContent = "";
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
		phoneNumberError.textContent = "Enter a correct Phone Number with 10 digits";
		phoneNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		phoneNumber.style.border = "1px solid green";
		phoneNumberError.textContent = "";
	}

	//Agricutural Officer & General Public Date of Birth input value validation
	let dateRegex = /^(0?[1-9]|[12][0-9]|3[01]).*(0?[1-9]|[1][0-2]).*[0-9]+$/;
	let dateOfBirthValue = birthDate.value;
	let farmerBirth = new Date(dateOfBirthValue);
	let birthYear = farmerBirth.getFullYear();
	let yearDiff = currentYear - birthYear;
	console.log(birthYear);

	if (!birthDate.value.match(dateRegex)) {
		birthDate.style.border = "1px solid red";
		dateOfBirthError.textContent = "Please Select User's Birth Date";
		dateOfBirthError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (farmerRole.value == "agriculturalofficer") {
		if (yearDiff <= 24) {
			birthDate.style.border = "1px solid red";
			dateOfBirthError.textContent = "Agricultural officer should be 25 years +";
			dateOfBirthError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
			// return false;
			error++;
		} else {
			birthDate.style.border = "1px solid green";
			dateOfBirthError.textContent = "";
		}
	} else if (farmerRole.value == "generalpublic") {
		if (yearDiff <= 15) {
			birthDate.style.border = "1px solid red";
			dateOfBirthError.textContent = "Buyer should be 16 years +";
			dateOfBirthError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
			// return false;
			error++;
		} else {
			birthDate.style.border = "1px solid green";
			dateOfBirthError.textContent = "";
		}
	}
	//FarmerOne Gender input validation
	if (gender[0].checked == false && gender[1].checked == false && gender[2].checked == false) {
		// gender.style.border = "1px solid red";
		radioError.textContent = "Please Check Gender";
		radioError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		// gender.style.border = "1px solid green";
		radioError.textContent = "";
	}
	if (error > 0) {
		event.preventDefault();
	}
};

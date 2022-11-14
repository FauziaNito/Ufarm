const loginForm = (event) => {

var uniqueNumber = document.getElementById("uniquenumber");
var password = document.getElementById("password");

var uniqueNumberError = document.getElementById("uniquenumbererr");
var passwordError = document.getElementById("passworderr");

let error = 0;

if (uniqueNumber.value == "") {
	uniqueNumber.style.border = "1px solid red";
	uniqueNumberError.textContent = "Please Enter Your Unique Number";
	uniqueNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
	// return false;
	error++;
} else {
	// uniqueNumber.style.border = "1px solid green";
	uniqueNumberError.textContent = "";
}

if (password.value == "") {
	password.style.border = "1px solid red";
	passwordError.textContent = "Please Enter Your Password";
	passwordError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
	// return false;
	error++;
} else {
	// password.style.border = "1px solid green";
	passwordError.textContent = "";
}


if (error > 0) {
	event.preventDefault();
}
}

const OrderForm = (event) => {
	var customerCity = document.getElementById("city");
	var residentArea = document.getElementById("residentarea");
	var orderQuantity = document.getElementById("orderquantity");

	var customerCityError = document.getElementById("cityerr");
	var residentAreaError = document.getElementById("residentareaerr");
	var orderQuantityError = document.getElementById("orderquantityerr");
	let error = 0;

	//City input validation
	if (customerCity.value == "Selectcity") {
		customerCity.style.border = "1px solid red";
		customerCityError.textContent = "Please Select Your City";
		customerCityError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		customerCity.style.border = "1px solid green";
		customerCityError.textContent = "";
	}

	//Resident Area input validation
	if (residentArea.value == "Selectarea") {
		residentArea.style.border = "1px solid red";
		residentAreaError.textContent = "Please Select Your Resident Area";
		residentAreaError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		residentArea.style.border = "1px solid green";
		residentAreaError.textContent = "";
	}

	//Order Quantity input validation
	if (orderQuantity.value == "") {
		orderQuantity.style.border = "1px solid red";
		orderQuantityError.textContent = "Please Enter Quantity";
		orderQuantityError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (orderQuantity.value <= 0) {
		orderQuantity.style.border = "1px solid red";
		orderQuantityError.textContent = "Sorry You can't order Zero Produce";
		orderQuantityError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		orderQuantity.style.border = "1px solid green";
		orderQuantityError.textContent = "";
	}


	if (error > 0) {
		event.preventDefault();
	}
}

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
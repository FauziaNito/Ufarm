//Setting System Date of Registration
let today = new Date();
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();
let currentDate = today.getDate();
var current_date = `${currentYear}-${currentMonth}-${currentDate}`;
console.log(current_date);
document.getElementById("regdate").value = current_date;

const ProduceForm = (event) => {
	var produceCode = document.getElementById("producecode");
	var produceName = document.getElementById("producename");
	var produceUnits = document.getElementById("units");
	var produceQuantity = document.getElementById("quantity");
	var unitPrice = document.getElementById("unitprice");
	var totalPrice = document.getElementById("totalprice");
	var modeOfDelivery = document.getElementById("modeofdelivery");
	var modeOfPayment = document.getElementById("modeofpayment");
	var imageUplaod = document.getElementById("imageupload");
	var produceType = document.registerproduce.producetype;

	var produceCodeError = document.getElementById("producecodeerr");
	var produceNameError = document.getElementById("producenameerr");
	var produceUnitsError = document.getElementById("unitserr");
	var produceQuantityError = document.getElementById("quantityerr");
	var unitPriceError = document.getElementById("unitpriceerr");
	var totalPriceError = document.getElementById("totalpriceerr");
	var modeOfDeliveryError = document.getElementById("modeofdeliverer");
	var modeOfPaymentError = document.getElementById("modeofpaymenterr");
	var imageUplaodError = document.getElementById("imageuploaderr");
	var produceTypeError = document.getElementById("producttypeerr");
	let error = 0;

	//Produce Code input validation
	if (produceCode.value == "") {
		produceCode.style.border = "1px solid red";
		produceCodeError.textContent = "Please Enter Produce Code";
		produceCodeError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	}
	// else if (produceCode.value == "selectrole") {
	// 	produceCode.style.border = "1px solid red";
	// 	produceCodeError.textContent = "Please Select Farmer's'Role";
	// 	produceCodeError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
	// 	// return false;
	// 	error++;
	// }
	else {
		produceCode.style.border = "1px solid green";
		produceCodeError.textContent = "";
	}

	if (error > 0) {
		event.preventDefault();
	}

	//Produce Name input validation
	if (produceName.value == "selectproduce") {
		produceName.style.border = "1px solid red";
		produceNameError.textContent = "Please Select Produce Name";
		produceNameError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		produceName.style.border = "1px solid green";
		produceNameError.textContent = "";
	}

	//Produce Units of Measure input validation
	if (produceUnits.value == "selectunits") {
		produceUnits.style.border = "1px solid red";
		produceUnitsError.textContent = "Select Unit of Measurement";
		produceUnitsError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		produceUnits.style.border = "1px solid green";
		produceUnitsError.textContent = "";
	}

	//Produce Quantity input validation
	if (produceQuantity.value == "" && produceUnits.value == "selectunits" && produceName.value == "selectproduce") {
		produceQuantity.style.border = "1px solid red";
		produceQuantityError.textContent = "Please Enter Quantity";
		produceQuantityError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (produceQuantity.value == "" && produceUnits.value != "selectunits" && produceName.value != "selectproduce") {
		produceQuantity.style.border = "1px solid red";
		produceQuantityError.textContent = `How Many ${produceUnits.value} of ${produceName.value} do you want to upload`;
		produceQuantityError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (produceQuantity.value <= 0) {
		produceQuantity.style.border = "1px solid red";
		produceQuantityError.textContent = "Sorry You can't Upload Zero Produce";
		produceQuantityError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		produceQuantity.style.border = "1px solid green";
		produceQuantityError.textContent = "";
	}

	//Produce Unit Price input validation
	if (unitPrice.value == "" && produceUnits.value != "selectunits" && produceName.value != "selectproduce" && !(produceQuantity.value < 1)) {
		unitPrice.style.border = "1px solid red";
		unitPriceError.textContent = `Whats the cost 1 ${produceUnits.value} of ${produceName.value}`;
		unitPriceError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else if (unitPrice.value == "" || produceUnits.value == "selectunits" || produceName.value == "selectproduce" || produceQuantity.value == "") {
		unitPrice.style.border = "1px solid red";
		unitPriceError.textContent = "Please Enter Price of the produce";
		unitPriceError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		unitPrice.style.border = "1px solid green";
		unitPriceError.textContent = "";
	}
	//Produce Total Price input validation
	if (unitPrice.value == "") {
		totalPrice.style.border = "1px solid red";
		totalPriceError.textContent = "Enter Unit Price to get Total Price";
		totalPriceError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		let totalPriceValue = () => {
			totalPrice.value = produceQuantity.value * unitPrice.value;
			totalPrice.style.border = "1px solid green";
			totalPrice.textContent = "";
		};
		totalPrice.addEventListener("click", totalPriceValue);
	}
	//Mode of Delivery input validation
	if (modeOfDelivery.value == "modeofdelivery") {
		modeOfDelivery.style.border = "1px solid red";
		modeOfDeliveryError.textContent = "Please Select Mode of delivery";
		modeOfDeliveryError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		modeOfDelivery.style.border = "1px solid green";
		modeOfDeliveryError.textContent = "";
	}

	//Mode of Payment input validation
	if (modeOfPayment.value == "modeofpayment") {
		modeOfPayment.style.border = "1px solid red";
		modeOfPaymentError.textContent = "Please Select Mode of payment";
		modeOfPaymentError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		modeOfPayment.style.border = "1px solid green";
		modeOfPaymentError.textContent = "";
	}

	//produce Type input validation
	if (produceType[0].checked == false && productType[1].checked == false) {

		produceTypeError.textContent = "Please Check Produce Type";
		produceTypeError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		produceTypeError.textContent = "";
	}

	if (error > 0) {
		event.preventDefault();
	}
};

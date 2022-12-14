//Setting System Date of Registration
let today = new Date();
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();
let currentDate = today.getDate();
var current_date = `${currentYear}-${currentMonth}-${currentDate}`;
console.log(current_date);
// document.getElementById("regdate").value = current_date;

document.getElementById("regdate").valueAsDate = new Date();
// Toatal Price

// const ProduceForm = (event) => {
var produceCategory = document.getElementById("producecategory");
var produceName = document.getElementById("producename");
var produceUnits = document.getElementById("units");
var produceQuantity = document.getElementById("quantity");
var unitPrice = document.getElementById("unitprice");
var totalPrice = document.getElementById("totalprice");
var modeOfDelivery = document.getElementById("modeofdelivery");
var modeOfPayment = document.getElementById("modeofpayment");
var imageUplaod = document.getElementById("imageupload");
var produceDetails = document.getElementById("prodesc");
// var produceType = document.registerproduce.producetype;
var produceType = document.registerproduce.producttype;

var produceCategoryError = document.getElementById("producecategoryerr");
var produceNameError = document.getElementById("producenameerr");
var produceUnitsError = document.getElementById("unitserr");
var produceQuantityError = document.getElementById("quantityerr");
var unitPriceError = document.getElementById("unitpriceerr");
var totalPriceError = document.getElementById("totalpriceerr");
var modeOfDeliveryError = document.getElementById("modeofdelivererr");
var modeOfPaymentError = document.getElementById("modeofpaymenterr");
var imageUplaodError = document.getElementById("imageuploaderr");
var produceDetailsError = document.getElementById("prodescerr");
// var produceTypeError = document.getElementById("producttypeerr");
var radioError = document.getElementById("producetyperadioerr");


let totalPriceValue = () => {
	totalPrice.value = produceQuantity.value * unitPrice.value;
	// totalPrice.style.border = "1px solid green";
	totalPrice.textContent = "";
};
unitPrice.addEventListener("change", totalPriceValue);

const ProduceForm = (event) => {
	let error = 0;
	//Produce Category input validation
	if (produceCategory.value == "selectcategory") {
		produceCategory.style.border = "1px solid red";
		produceCategoryError.textContent = "Please Select Produce Category";
		produceCategoryError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		produceCategory.style.border = "1px solid green";
		produceCategoryError.textContent = "";
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
		unitPriceError.textContent = `Whats the cost of 1 ${produceUnits.value} of ${produceName.value}`;
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
		totalPrice.style.border = "1px solid green";
		totalPriceError.textContent = "";
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
	if (modeOfPayment.value == "modeofpayments") {
		modeOfPayment.style.border = "1px solid red";
		modeOfPaymentError.textContent = "Please Select Mode of payment";
		modeOfPaymentError.style = "color:red; font-size:12px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		modeOfPayment.style.border = "1px solid green";
		modeOfPaymentError.textContent = "";
	}

	//Image Upload input validation
	if (imageUplaod.value == "") {
		imageUplaod.style.border = "1px solid red";
		imageUplaodError.textContent = "Please Select Product Image";
		imageUplaodError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	}
	else {
		imageUplaod.style.border = "1px solid green";
		imageUplaodError.textContent = "";
	}

	//Produce Description input validation
	if (produceDetails.value == "") {
		produceDetails.style.border = "1px solid red";
		produceDetailsError.textContent = "Please Enter Product Description";
		produceDetailsError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	}
	else {
		produceDetails.style.border = "1px solid green";
		produceDetailsError.textContent = "";
	}
	
	//Produce Type input validation
	if (produceType[0].checked == false && produceType[1].checked == false) {
		radioError.textContent = "Please Check Produce Type";
		radioError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		// return false;
		error++;
	} else {
		// producttype.style.border = "1px solid green";
		radioError.textContent = "";
	}

	if (error > 0) {
		event.preventDefault();
	}
};

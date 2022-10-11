// DEPENDENCIES
const express = require('express');
const path = require('path');

// INSTANTIATIONS
const app = express();

// CONFIGURATIONs
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARE
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// ROUTES
app.get('/AOdashboard', (req, res) =>{
    res.render('AO/AO-dashboard');
});
app.get('/FOlist', (req, res) => {
    res.render('AO/AO-fo-accounts');
});
app.get("/FOactivities", (req, res) => {
	res.render("AO/AO-fo-activities");
});
app.get("/addward", (req, res) => {
	res.render("AO/ward");
});
app.get("/registerFO", (req, res) => {
	res.render("AO/new-fo-form");
});


/*For all Invalid Routes */
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL');
});

// SERVER BOOTSTRAPPING
app.listen(3002, () => console.log('We are listening to port 3002'));
let express = require('express');
let router = express.Router();
let passport = require('passport');

let User = require('../models/user.js');


router.get('/', (req, res) => {
	res.render('locations/landing.ejs');
});

//=================================
//REGISTER ROUTES
//=================================

//register form
router.get('/register', (req, res) => {
	res.render('register.ejs');
});
//register logic
router.post('/register', function (req, res) {
	User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
		if (err) {
			req.flash("error", err.message);
			return res.render('register.ejs');
		}
		passport.authenticate('local')(req, res, () => {
			req.flash("success", "Welcome to Locations, "+user.username);
			res.redirect('/location');
		});
	});
});

//=================================
//LOGIN ROUTES
//=================================

//login form
router.get('/login', (req, res) => {
	res.render('login.ejs');
});
//login logic
router.post("/login", function (req, res, next) {
  passport.authenticate("local",
    {
      successRedirect: "/location",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: "Welcome to Locations, " + req.body.username + "!"
    })(req, res);
});

//=================================
//LOGOUT ROUTES
//=================================

//logout logic
router.get('/logout', (req, res) => {
	req.logout();
	req.flash("success","Logged out!");
	res.redirect('/location');
});


module.exports = router;
let express = require('express');
let router = express.Router();

let Location = require('../models/location.js'),
	Comments = require('../models/comments.js'),
	middleware = require('../middleware/index.js');
// LOCATION INDEX
router.get('/location', (req, res) => {
	Location.find({}, (err, allLocations) => {
		if (err) {
			console.log(err);
		} else {
			res.render('locations/index.ejs', { location: allLocations });
		}
	});
});
// LOCATION NEW
router.get('/location/new', middleware.isLoggedIn, (req, res) => {
	res.render('locations/new.ejs');
});

// LOCATION CREATE
router.post('/location', middleware.isLoggedIn, (req, res) => {
	let author = {
		id: req.user._id,
		username: req.user.username,
	};
	let newLocation = {
		name: req.body.name,
		image: req.body.image,
		description: req.body.description,
		author: author,
		price: req.body.price,
	};
	Location.create(newLocation, (err, newLoc) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/location');
		}
	});
});

// LOCATION SHOW
router.get('/location/:id', (req, res) => {
	Location.findById(req.params.id)
		.populate('comments')
		.exec((err, foundLoc) => {
			if (err) {
				console.log(err);
			} else {
				res.render('locations/show.ejs', { location: foundLoc });
			}
		});
});
//LOCATION EDIT
router.get('/location/:id/edit', middleware.isLocationOwner, (req, res) => {
	Location.findById(req.params.id, (err, foundLoc) => {
		res.render('locations/edit.ejs', { location: foundLoc });
	});
});
//LOCATION UPDATE
router.put('/location/:id', middleware.isLocationOwner, (req, res) => {
	Location.findByIdAndUpdate(req.params.id, req.body.location, (err, foundLoc) => {
		if (err) {
			req.flash("error", "Location is not found");
			res.redirect('/location');
		} else {
			req.flash("success", "Location info was updated");
			res.redirect('/location/' + req.params.id);
		}
	});
});
//LOCATION DESTROY
router.delete('/location/:id', middleware.isLocationOwner, (req, res) => {
	Location.findByIdAndRemove(req.params.id, (err, removed) => {
		if (err) {
			req.flash("error", "Location is not found");
			res.redirect('/location/' + req.params.id);
		} else {
			Comments.deleteMany({ _id: { $in: removed.comments } }, (err, remComments) => {
				if (err) {
					req.flash("error", "Comment removal issue");
					res.redirect('/location/'+ req.params.id);
				} else {
					req.flash("succes", "Comment was deleted");
					res.redirect('/location/'+ req.params.id);
				}
			});
		}
	});
});

module.exports = router;
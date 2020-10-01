let express = require('express');
let router = express.Router();

let Location = require('../models/location.js'),
	Comments = require('../models/comments.js'),
	middleware = require('../middleware/index.js');

// COMMENTS NEW
router.get('/location/:id/comments/new', middleware.isLoggedIn, (req, res) => {
	Location.findById(req.params.id, (err, foundLoc) => {
		if (err) {
			req.flash("error", "Location is not found");
		} else {
			res.render('comments/new.ejs', { location: foundLoc });
		}
	});
});

// COMMENTS CREATE
router.post('/location/:id/comments', middleware.isLoggedIn, (req, res) => {
	Location.findById(req.params.id, (err, foundLoc) => {
		if (err) {
			console.log(err);
		} else {
			Comments.create(req.body.comments, (err, added) => {
				if (err) {
					console.log(err);
				} else {
					added.author.id = req.user._id;
					added.author.username = req.user.username;
					added.save();
					foundLoc.comments.push(added);
					foundLoc.save();
					req.flash("success", "Successfuly added!")
					res.redirect('/location/' + foundLoc._id);
				}
			});
		}
	});
});
//EDIT COMMENT
router.get('/location/:id/comments/:comments_id/edit', middleware.isCommentOwner, (req, res) => {
	Comments.findById(req.params.comments_id, (err, foundComment) => {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/edit.ejs', { location_id: req.params.id, comments: foundComment });
		}
	});
});
//UPDATE COMMENT
router.put('/location/:id/comments/:comments_id', middleware.isCommentOwner, (req, res) => {
	Comments.findByIdAndUpdate(req.params.comments_id, req.body.comments, (err, updated) => {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			res.redirect('/location/' + req.params.id);
		}
	});
});
//DESTROY COMMENT
router.delete('/location/:id/comments/:comments_id', middleware.isCommentOwner, (req, res) => {
	Comments.findByIdAndRemove(req.params.comments_id, (err, removedComment) => {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			res.redirect('/location/' + req.params.id);
		}
	});
});

module.exports = router;
let Location = require("../models/location.js"),
	Comments = require("../models/comments.js");


let middlewareObj = {};
middlewareObj.isLocationOwner = function (req, res, next) {
	if (req.isAuthenticated()) {
		Location.findById(req.params.id, (err, foundLoc) => {
			if (err) {
				req.flash("error", "Location is not found")
				res.redirect('back');
			} else {
				if (foundLoc.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that")
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash("error","Please, log in first!")
		res.redirect('back');
	}
}
middlewareObj.isCommentOwner = function (req, res, next) {
	if (req.isAuthenticated()) {
		Comments.findById(req.params.comments_id, (err, foundComment) => {
			if (err) {
				req.flash("error","Location is not found")
				res.redirect('back');
			} else { 
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					console.log("You don't have permission to do that");
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash("error","Please, log in first!");
		res.redirect('back');
	}
}

middlewareObj.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error","Please, log in first!")
	res.redirect('/login');
}



module.exports = middlewareObj
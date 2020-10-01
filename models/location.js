mongoose = require('mongoose')

//Schema setup
let locationSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	comments: [
		{ 
			type: mongoose.Schema.Types.ObjectId,
		  	ref: "Comments",
		}
	],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

let Location = mongoose.model("Location", locationSchema);

module.exports = Location;
let mongoose = require ('mongoose');

let commentsSchema = new mongoose.Schema ({
	text: String,
	author: 
	{
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String,
	}
})

let Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;
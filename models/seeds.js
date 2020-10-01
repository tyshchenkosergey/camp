let mongoose = require('mongoose');
let Location = require('./location.js');
let Comments = require('./comments.js')

let data = [
	{
	 	name:"Salmon Bay",
		image: "https://cdn.pixabay.com/photo/2016/11/21/14/31/vw-bus-1845719_960_720.jpg",
	 	description: "Spicy jalapeno cupim sunt rump reprehenderit swine pancetta, veniam strip steak tongue commodo jowl pariatur beef. Pork adipisicing drumstick frankfurter, shankle aliqua aute ut cillum. Reprehenderit in filet mignon picanha irure. Reprehenderit velit lorem tenderloin shankle pariatur. Hamburger cupim ex, pork shank anim id veniam drumstick incididunt frankfurter eu meatball. Brisket rump kielbasa, nostrud voluptate aliquip consequat pork venison jowl eiusmod bresaola ball tip. Et lorem quis pastrami qui."
	},
	{
		name:"Bass Creek",
		image: "https://cdn.pixabay.com/photo/2020/07/27/02/09/tent-5441144_960_720.jpg",
		description: "Spicy jalapeno cupim sunt rump reprehenderit swine pancetta, veniam strip steak tongue commodo jowl pariatur beef. Pork adipisicing drumstick frankfurter, shankle aliqua aute ut cillum. Reprehenderit in filet mignon picanha irure. Reprehenderit velit lorem tenderloin shankle pariatur. Hamburger cupim ex, pork shank anim id veniam drumstick incididunt frankfurter eu meatball. Brisket rump kielbasa, nostrud voluptate aliquip consequat pork venison jowl eiusmod bresaola ball tip. Et lorem quis pastrami qui."},
	{
		name:"Shark Cave",
		image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_960_720.jpg",
		description: "Spicy jalapeno cupim sunt rump reprehenderit swine pancetta, veniam strip steak tongue commodo jowl pariatur beef. Pork adipisicing drumstick frankfurter, shankle aliqua aute ut cillum. Reprehenderit in filet mignon picanha irure. Reprehenderit velit lorem tenderloin shankle pariatur. Hamburger cupim ex, pork shank anim id veniam drumstick incididunt frankfurter eu meatball. Brisket rump kielbasa, nostrud voluptate aliquip consequat pork venison jowl eiusmod bresaola ball tip. Et lorem quis pastrami qui."
	},
	{
	 	name:"Tuna Beach",
		image: "https://cdn.pixabay.com/photo/2017/08/17/08/08/camp-2650359_960_720.jpg",
	 	description: "Spicy jalapeno cupim sunt rump reprehenderit swine pancetta, veniam strip steak tongue commodo jowl pariatur beef. Pork adipisicing drumstick frankfurter, shankle aliqua aute ut cillum. Reprehenderit in filet mignon picanha irure. Reprehenderit velit lorem tenderloin shankle pariatur. Hamburger cupim ex, pork shank anim id veniam drumstick incididunt frankfurter eu meatball. Brisket rump kielbasa, nostrud voluptate aliquip consequat pork venison jowl eiusmod bresaola ball tip. Et lorem quis pastrami qui."
	},
]

//remove all locations
function seedDb(){
	Location.deleteMany({},(err,remove)=>{
	if(err){
		console.log(err);
	}else{
		console.log("locations are removed!")
		// Comments.remove();
		// console.log("comments are removed!")
		// add locations
			data.forEach(location=>{
			Location.create(location, (err,newLoc)=>{
				if(err){
				console.log(err)
				}else{
				console.log("location added");
				// add comments
				Comments.create({
					text:"BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA",
					author: "Homer",
				}, (err, comments)=>{
					if(err){
						console.log(err);
					}else{
					newLoc.comments.push(comments);	
					newLoc.save();
					}
				})
				}
			})
		})
	}
});
}


module.exports = seedDb;
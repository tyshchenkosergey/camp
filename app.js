let express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose'),
	methodOverride = require('method-override'),
	flash =  require('connect-flash');

//MODELS
let Location = require('./models/location.js'),
	Comments = require('./models/comments.js'),
	User = require('./models/user.js'),
	seedDb = require('./models/seeds.js');

//ROUTES
let locationRoutes = require('./routes/location.js'),
	commentRoutes = require('./routes/comments.js'),
	authRoutes = require('./routes/auth.js');

// seedDb();

//app config
// mongoose.connect('mongodb://localhost/camp_loc', {
mongoose.connect("mongodb+srv://Tomato:tomato@camp-cluster.rcffs.mongodb.net/<dbname>?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
app.use(flash());

//PASSPORT CONFIG
app.use(
	require('express-session')({
		secret: 'dog dog dog ',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.error= req.flash("error");
	res.locals.success= req.flash("success");
	next();
});

app.use(locationRoutes);
app.use(commentRoutes);
app.use(authRoutes);

// let location = [
// 		{name:"Salmon Bay", image: "https://cdn.pixabay.com/photo/2016/11/21/14/31/vw-bus-1845719_960_720.jpg"},
// 		{name:"Bass Creek", image: "https://cdn.pixabay.com/photo/2020/07/27/02/09/tent-5441144_960_720.jpg"},
// 		{name:"Shark Cave", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_960_720.jpg"},
// 		{name:"Catfish River", image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142_960_720.jpg"},
// 		{name:"Tuna Bank", image: "https://cdn.pixabay.com/photo/2017/08/06/18/33/barn-2594975_960_720.jpg"},
// 		{name:"Carp Duna", image: "https://cdn.pixabay.com/photo/2017/08/17/08/08/camp-2650359_960_720.jpg"},
// 	]

let port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('rabotaet?');
});
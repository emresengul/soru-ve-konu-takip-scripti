const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin")
const accountRoutes = require("./routes/account");
const mongoose = require("mongoose")
const locals = require("./middleware/locals");

const User = require("./models/user");

const errorController = require("./controllers/errors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const csurf = require("csurf");
const connectionString = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

var store = new mongoDbStore({
    uri: connectionString,
    collection: "mySessions"
})




app.set("view engine", "pug");
app.set("views", "./views"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));



app.use(cookieParser());
app.use(session({
    secret:"keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:3600000
    },
    store: store
}))
app.use((req,res,next)=>{
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
        .then(user=>{
            req.user = user;
            // console.log(req.user)
            next();
        })
        .catch(err=>{
            console.log(err)
        })
})
app.use(csurf())

app.use(userRoutes);
app.use(adminRoutes);

app.use(accountRoutes);


app.use("/500",locals,errorController.get500Page)
app.use(locals,errorController.get404Page);
app.use((error,req,res,next)=>{
    console.log(error)
    res.status(500).render("error/500",{title:"Server Error",error:error})
})



mongoose.connect(connectionString)
    .then(()=>{
        console.log("Connected! Mongodb")
        app.listen(PORT);
    })
    .catch(err=>{
        console.log(err)
    })

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

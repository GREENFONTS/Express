const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const flash = require('connect-flash');
const session = require("express-session");
const path = require('path');


app.engine("handlebars", exhbs());
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "handlebars");

// when you are using a fetch api or just ajax you need to add the line below for it to work
app.use(bodyParser.json());
// assuming you are sending from a form you need to add the line below for it work.
app.use(bodyParser.urlencoded({ extended: false }));

//session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
    cookie: { maxAge: 600000 },
  })
);
//connect flash
app.use(flash());


app.use("/", require('./routes/routes'))
app.use("/user", require("./routes/users"));

app.use(express.static("public"));

const PORT = process.env.PORT||4000;

app.listen(PORT, () => {
  console.log(`Server connected at port ${PORT}`);
});

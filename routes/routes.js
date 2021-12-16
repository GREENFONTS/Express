const express = require("express")
const { PrismaClient } = require("../prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const passport = require("passport");
const upload = require("../config/multer");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const {User, BlogHome} = require('../functions')

router.get("/Register", (req, res) => {
  req.session.is_Follow = false;
  res.render("register");
});

let error = []
//try and check it 
router.post("/Register", upload.single('avatar'), (req, res) => {
  User(req, res)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    });   
})

router.post("/Login", (req, res, next) => {
  const { email, password } = req.body;
  
  passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        error.push({ msg: "You are not Registered" });
        res.render("login", {
          error,
        });
        error = [] 
      }
      let userPassword;
      user.forEach((elem) => {
        userPassword = elem.password;
      });

      if (!user || password != userPassword) {
        error.push({ msg: "Incorrect Email or password" });
        res.render("login", {
          error
        });
        error = []
       
      }
      else {
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          if (req.session.is_Follow) {
            return res.redirect(`/user/Profile`)
            
          } else {
            return res.redirect("/user/dashboard");
          }
          
      
        })
      }
    })
    (req, res, next)
});

router.get("/Login", (req, res, next) => {
  res.render("login");
})

router.get("/", (req, res, next) => {
  req.session.is_Follow = false;
  res.render("Home");
});


router.get("/Contact", (req, res, next) => {
  req.session.is_Follow = false;
  res.render("Contact");
});


router.get("/Blog", (req, res, next) => {
  BlogHome(req, res)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    });
});


router.get(`/Follow/:Email`, (req, res, err) => {
  req.session.is_Follow = true
  req.session.Email = req.params.Email;
  res.render('login') 
})

module.exports = router

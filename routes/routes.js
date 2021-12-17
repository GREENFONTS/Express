const express = require("express")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const upload = require("../config/multer");
const { User, BlogHome } = require('../functions');
const jwt = require("jsonwebtoken");

router.get("/Register", (req, res) => {
  req.session.is_Follow = false;
  res.render("register");
});

//try and check it 
router.post("/Register", upload.single('avatar'), (req, res) => {
  const { name, email, password, password2 } = req.body;
  try {
    User(req, res, name, email, password, password2)
      .catch((err) => {
        throw err;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }
  catch (err) {
    console.log(err)
  }
})

router.post("/Login", async (req, res) => {
  let error = []
  const { email, password } = req.body;
  
  let user = await prisma.users.findFirst({
    where: {
      email: email
    }
  });
  
      if (user == null | undefined) {
        error.push({ msg: "Email is not registered" });
        res.render("login", {
          error,
        });
        error = [] 
      }
      if (password != user.password) {
        error.push({ msg: "Incorrect password" });
        res.render("login", {
          error
        });
        error = []
       
      }
      else {
        const token = jwt.sign(
          { user_id: user.id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        let session = req.session;
        session.token = token;
        session.user = user;
        res.redirect("/user/dashboard");
      }

});

router.get("/Login", (req, res) => {
  let error = []
  res.render("login");
})

router.get("/", (req, res) => {
  req.session.is_Follow = false;
  res.render("Home");
});


router.get("/Contact", (req, res) => {
  req.session.is_Follow = false;
  res.render("Contact");
});


router.get("/Blog", (req, res) => {
  BlogHome(req, res)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});


router.get(`/Follow/:Email`, (req, res) => {
  req.session.is_Follow = true
  req.session.Email = req.params.Email;
  res.render('login') 
})

module.exports = router

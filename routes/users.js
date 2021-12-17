const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const moment = require("moment");
const { getTodo, createTodo, deleteTodo, getBlog, createBlog, createProfile, Author, Like} = require('../functions')

//dashboard page
router.get("/dashboard", ensureAuthenticated, async(req, res) => {
  let profile = await prisma.profile.findFirst({
    where: {
      email: req.session.user.email
    }
  });
  if (profile != null | undefined) {
    
  }
  res.render("welcome", {
    user: req.session.user,
  });
});

//quotes page
router.get("/quotes", ensureAuthenticated, (req, res) => {
  res.render("quotes");
});

//Logout
router.get("/Logout", (req, res) => {
  req.logOut();
  req.session.is_Follow = false
  res.redirect("/Login");
});

// todolist display
router.get("/TodoList", ensureAuthenticated, (req, res) => {
  getTodo(req, res)
    .catch(e => {
      throw e
    })
    .finally(async () => {
      await prisma.disconnect()
    })
});

//create a todo
router.post("/TodoList", ensureAuthenticated, (req, res) => {  
   createTodo(req, res)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    })
});

//delete a todo
router.get("/del/:id", ensureAuthenticated,  (req, res) => {
   deleteTodo(req, res)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    });
});

//user blog session
router.get('/Blog', ensureAuthenticated, (req, res) => {
 getBlog(req, res)
   .catch((e) => {
     throw e;
   })
   .finally(async () => {
     await prisma.disconnect();
   });
})

//create a blog post
router.post("/Blog", ensureAuthenticated, (req, res) => {   
  createBlog(req, res)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    })
});

//userProfile page
router.get('/userProfile', ensureAuthenticated, async (req, res) => {
  const user = await prisma.users.findFirst({
    include: {
      followedBy: true,
      following: true,
    },
    where: {
      email: req.user.email,
    },
  });

  const Posts = await prisma.posts.findFirst({
      where: {
        email: req.user.email,
      }
    });

  Posts.forEach(item => {
    item.created_at = moment(item.created_at).fromNow();
  })
  
  const Profile = await prisma.profile.findFirst({
    where: {
      email: req.user.email,
    },
  });

  res.render("userProfile", {
    data: Posts,
    Profile: Profile,
    Author: req.user.name,
    Avatar: req.user.avatar,
    Followers: req.user.followedBy.length,
    Following: req.user.following.length
  });
  
}); 

//create user profile
router.post('/EditProfile', ensureAuthenticated, (req, res) => {
  const { Name, Email, Occupation, Hobbies, Skills, About } = req.body;
  try {
    createProfile(req, res, Name, Email, Occupation, Hobbies, Skills, About)
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }
  catch (err) {
    console.log(err)
  }
})

//get profile
router.get('/Profile', ensureAuthenticated, async (req, res) => {
  const User = await prisma.users.findFirst({
    include: {
      followedBy: true,
      following: true,
    },
    where: {
      email: req.session.Email,
    },
  });
  let Avatar, Name;
  User.forEach(item => {
    Avatar = item.avatar
    Name = item.name
  })
  const Posts = await prisma.posts.findMany({
    where: {
      email: req.session.Email,
    },
  });

  Posts.forEach((item) => {
    item.created_at = moment(item.created_at).fromNow();
  });

  const Profile = await prisma.profile.findFirst({
    where: {
      email: req.session.Email,
    },
  });

  res.render("profile", {
    data: Posts,
    Profile: Profile,
    Author: Name,
    FollowChange: "Follow",
    Avatar: Avatar,
    Followers: req.user.followedBy.length,
    Following: req.user.following.length,
  });
}); 

//follow and author
router.get('/Follow/:Author', ensureAuthenticated, (req, res) => {
  FollowAuthor(req, res, "Follow", "UnFollow")
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    });

})

//unfollow and author
router.get('/Unfollow/:Email', ensureAuthenticated, (req, res) => {
  Author(req, res, "UnFollow", "Follow")
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    });
})

//like a post
router.get('/Like/:id/', ensureAuthenticated, async (req, res) => {
  Like(req, res)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    });
})

//comment on a post
router.post("/comment/:id/", ensureAuthenticated, async (req, res) => {
  Comment(req, res)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    });
});

module.exports = router;

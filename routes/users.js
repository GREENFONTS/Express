const express = require("express");
const { PrismaClient } = require("../prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const moment = require("moment");
const { getTodo, createTodo, deleteTodo, getBlog, createBlog, createProfile, FollowAuthor} = require('../functions')

let error = [];
let FollowChange = "";
//dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("welcome", {
    Name: req.user.name,
  });
});

//quotes
router.get("/quotes", ensureAuthenticated, (req, res) => {  
  res.render("quotes");
  }
)

//Logout
router.get("/Logout", (req, res) => {
  req.logOut();
  req.session.is_Follow = false
  req.flash("success_msg", "Logout successful");
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
router.post("/TodoList", (req, res) => {  
   createTodo(req, res)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    })
});

//prisma delete
router.get("/del/:id",  (req, res) => {
   deleteTodo(req, res)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    });
});


router.get('/Blog', ensureAuthenticated, (req, res, next) => {
 getBlog(req, res)
   .catch((e) => {
     throw e;
   })
   .finally(async () => {
     await prisma.disconnect();
   });
})

router.post("/Blog", (req, res) => {   
  createBlog(req, res)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    })
});

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

router.get('/Editprofile', ensureAuthenticated, async(req, res) => {
  res.render('EditProfile')
})


router.post('/EditProfile', (req, res) => { 
  createProfile(req, res)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    });
})

router.get(`/Profile`, ensureAuthenticated, async (req, res) => {
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

router.get('/Follow/:Author', ensureAuthenticated, (req, res) => {
  FollowAuthor(req, res, "Follow", "UnFollow")
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    });

})

router.get('/Unfollow/:Email', ensureAuthenticated, (req, res) => {
  Author(req, res, "UnFollow", "Follow")
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    });
})

async function Like(req, res) {
  const User = await prisma.likes.findMany({
    where: {
      AND: [
        {
          postid: req.params.id
        },
        {
          email: req.user.email
        }
      ]

    }
    
  })
  if (User.length != 0) {
  const curentPost = await prisma.posts.findMany({
      where: {
        id: req.params.id,
      },
    });
    let CurrentLike;
    curentPost.forEach((element) => {
      CurrentLike = element.postlike - 1;
      if (CurrentLike == 0) {
        CurrentLike = null;
      }
    });
    
    await prisma.posts.updateMany({
      where: {
          id: req.params.id,
        },
      data: {
            postlike: CurrentLike,
          },
    });

    await prisma.likes.deleteMany({
      where: {
        AND: [
          {
            postid: req.params.id,
          },
          {
            email: req.user.email,
          },
        ]
      }
    });
    
  } else {
    await prisma.likes.create({
      data: {
        users: {
          connect: {
            email: req.user.email,
          },
        },
        post: {
          connect: {
            id: req.params.id,
          },
        },
      },
    });

    const curentPost = await prisma.posts.findMany({
      where: {
        id: req.params.id,
      },
    });
    let CurrentLike;
    curentPost.forEach((element) => {
      CurrentLike = element.postlike + 1;
    });

    await prisma.posts.updateMany({
      where: {
          id: req.params.id,
        },
          data: {
            postlike: CurrentLike,
          },
  
    });    
  }
  res.redirect("/user/Blog");
}

router.get('/Like/:id/', ensureAuthenticated, async (req, res, user) => {
  Like(req, res)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    });
})

async function Comment(req, res) {
  await prisma.comment.create({
    data: {
      users: {
        connect: {
          email: req.user.email,
        },
      },
      postid: req.params.id,
      comment: req.body.Comment,
    },
  });

  res.redirect("/user/Blog");
}

router.post("/comment/:id/", ensureAuthenticated, async (req, res, user) => {
  Comment(req, res)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.disconnect();
    });
});

module.exports = router

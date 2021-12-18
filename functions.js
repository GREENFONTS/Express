const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cloudinary = require("./config/cloudinary");
const upload = require("./config/multer");
const moment = require("moment");

module.exports = {
  getTodo: async (req, res) => {
    const todos = await prisma.todo.findMany({
      where: {
        email: req.session.user.email,
      },
    });

    res.render("Todo", {
      Title: "Todo List",
      data: todos,
    });
  },

  createTodo: async (req, res) => {
    const { Task, Content } = req.body;
    await prisma.todo.create({
      data: {
        task: Task,
        content: Content,
        users: {
          connect: {
            email: req.user.email,
          },
        },
      },
    });
    res.redirect("/user/TodoList");
  },

  deleteTodo: async (req, res) => {
    await prisma.todo.delete({
      where: {
        id: req.params.id,
      },
    });

    res.redirect("/user/TodoList");
  },

  getBlog: async (req, res) => {
    let Posts = [];
    let finalPosts = [];
    const user = await prisma.users.findFirst({
      include: {
        followedBy: {
          include: {
            posts: true,
          },
        },
        following: {
          include: {
            posts: true,
          },
        },
      },

      where: {
        email: req.user.email,
      },
    });

    user.following.forEach((element) => {
      Posts.push(element.posts);
    });

    const Post = await prisma.posts.findMany({
      where: {
        email: user.email,
      },
    });

    Posts.push(Post);

    Posts.forEach((element) => {
      element.forEach((item) => {
        item.created_at = moment(item.created_at).fromNow();
        if (user.name == item.author) {
          current_user = true;
        }
        finalPosts.push(item);
      });
    });

    res.render("posts", {
      Name: user.name,
      data: finalPosts,
    });
  },

  createBlog: async (req, res) => {
    const { Title, Content } = req.body;
    await prisma.posts.create({
      data: {
        title: Title,
        content: Content,
        avatar: req.session.user.avatar,
        author: req.session.user.name,
        users: {
          connect: {
            email: req.session.user.email,
          },
        },
      },
    });
    res.redirect("/user/Blog");
  },

  createProfile: async (req, res, Name, Email, Occupation, Hobbies, Skills, About) => {
    
      await prisma.profile.create({
        data: {
          name: Name,
          email: Email,
          occupation: Occupation,
          hobbies: Hobbies,
          skills: Skills,
          about: About,
        },
      });
      res.redirect("/user/dashboard");
  },

  Author: async (req, res, action, nextAction) => {
    const users = await prisma.users.findFirst({
      where: {
        email: req.session.Email,
      },
    });

    const Profile = await prisma.profile.findFirst({
      where: {
        email: req.session.Email,
      },
    });
    const Posts = await prisma.posts.findMany({
      where: {
        email: req.session.Email,
      },
    });
    Posts.forEach((item) => {
      item.created_at = moment(item.created_at).fromNow();
    });
    if (action == "Follow") {
      await prisma.users.update({
        where: {
          email: req.session.Email,
        },
        data: {
          followedBy: {
            connect: [
              {
                email: `${req.user.email}`,
              },
            ],
          },
        },
      });
    }
    if (action == "UnFollow") {
      await prisma.users.update({
        where: {
          email: req.session.Email,
        },
        data: {
          followedBy: {
            disconnect: [
              {
                email: `${req.user.email}`,
              },
            ],
          },
        },
      });
    }
    let Avatar, Name;
    users.forEach((item) => {
      Avatar = item.avatar;
      Name = item.name;
    });

    res.render("profile", {
      data: Posts,
      Profile: Profile,
      FollowChange: nextAction,
      Author: Name,
      Avatar: Avatar,
    });
  },

  Like: async (req, res) => {
    const checkLike = await prisma.likes.findFirst({
      where: {
        email: req.session.user.email,
        postid: req.params.id
      }
    })

     const currentPost = await prisma.posts.findFirst({
        where: {
          id: req.params.id,
        },
     });
    
    
    let CurrentLike = currentPost.postlike;
    if (checkLike == null | undefined) {
      if (CurrentLike == null) {
        CurrentLike = 0;
      }
      await prisma.posts.update({
        where: {
          id: req.params.id,
        },
        data: {
          postlike: CurrentLike + 1,
        },
      });
      
       await prisma.likes.create({
         data: {
           users: {
             connect: {
               email: req.session.user.email,
             },
           },
           post: {
             connect: {
               id: req.params.id,
             },
           },
         },
       });
    }
    else {
       await prisma.posts.update({
         where: {
           id: req.params.id,
         },
         data: {
           postlike: CurrentLike - 1,
         },
       });

      await prisma.likes.deleteMany({
        where: {          
           postid: req.params.id,
           
              email: req.session.user.email,
           
        },
      });
    }
      
    res.redirect("/user/Blog");
  },

  Comment: async (req, res) => {
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
  },

  User: async (req, res, name, email, password, password2) => {
    let error = []
    let sampleFile = await cloudinary.uploader.upload(req.file.path);    

    if (password != password2) {
      error.push({ msg: "Passwords do not match" });
    }

    if (password.length < 8) {
      error.push({ msg: "Password must be at least 8 characters" });
    }
    if (error.length > 0) {
      res.render("register", {
        error,
        name,
        email,
        password,
        password2,
      });
    }
    let user = await prisma.users.findMany({
      where: {
        email: email,
      },
    });

    if (user.length != 0) {
      error.push({ msg: "Email has already been registered" });
      res.render("register", {
        error,
        name,
        email,
        password,
        password2,
      });
      error = [];
    } else {
        await prisma.users.create({
          data: {
            name: name,
            email: email,
            password: password,
            avatar: sampleFile.secure_url
          },
        });
      console.log('reached')
      res.redirect("/Login");
      }

  },

  BlogHome: async (req, res) => {
    const Posts = await prisma.posts.findMany();

    Posts.forEach((element) => {
      element.created_at = moment(element.created_at).fromNow();
    });
    Posts.sort((element) => element.Created_at);
    res.render("HomeBlog", {
      data: Posts,
    });
    req.session.is_Follow = false;
  },

  Dashboard: async (req, res) => {
    let action, text = "";
    let profile = await prisma.profile.findFirst({
      where: {
        email: req.session.user.email,
      },
    });
    if (profile == null | undefined) {
      text = "createProfile"
      action = "Create Profile"
    }
    else {
      text = 'updateProfile'
      action = 'Update Profile '
    }
    res.render("welcome", {
      user: req.session.user,
      action: action,
      text: text,
      profile : profile
    });
  },

  UpdateProfile: async (req, res, Name, Occupation, Hobbies, Skills, About) => {
    await prisma.profile.update({
      where: {
        email: req.session.user.email
      },
      data: {
        name: Name,
        occupation: Occupation,
        hobbies: Hobbies,
        skills: Skills,
        about: About
      }
    });
    res.redirect('/user/dashboard')
  },
};

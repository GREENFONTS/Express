module.exports = {
  getTodo: async (req, res) => {
    const todos = await prisma.todo.findFirst({
      where: {
        email: req.user.email,
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
    const users = await prisma.users.findFirst({
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

    req.user.following.forEach((element) => {
      Posts.push(element.posts);
    });

    const Post = await prisma.posts.findMany({
      where: {
        email: req.user.email,
      },
    });

    Posts.push(Post);

    Posts.forEach((element) => {
      element.forEach((item) => {
        item.created_at = moment(item.created_at).fromNow();
        if (req.user.name == item.author) {
          current_user = true;
        }
        finalPosts.push(item);
      });
    });

    res.render("posts", {
      Name: req.user.name,
      data: finalPosts,
    });
  },

  createBlog: async (req, res) => {
    const { Title, Content } = req.body;
    await prisma.posts.create({
      data: {
        title: Title,
        content: Content,
        avatar: req.user.avatar,
        author: req.user.name,
        users: {
          connect: {
            email: req.user.email,
          },
        },
      },
    });
    res.redirect("/user/Blog");
  },

  createProfile: async (req, res) => {
    let error = [];
    const { Name, Email, Occupation, Hobbies, Skills, About } = req.body;
    let profile = await prisma.profile.findFirst({
      where: {
        email: Email,
      },
    });
    if (profile) {
      error.push({ msg: "UserName has been registered" });
      res.render("EditProfile", {
        error,
        Name,
        Email,
        Hobbies,
        Occupation,
        Skills,
        About,
      });
      error = [];
    } else {
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
      res.redirect("/user/Blog");
    }
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
      if (action == 'Follow') {
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

};

const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require("../prisma/client");
const prisma = new PrismaClient();

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (Email, password, done) => {
            prisma.users.findFirst({ where: { email: Email } })
                .catch(err => console.log(err))
                .then(user => {
                    let userPassword;
                    user.forEach(elem => {
                        userPassword = elem.password
                    })
                    if (user.length == 0) {
                        return done(null, false, {
                          message: "This email is not registered",
                        });
                        
                    }
                    if (password != userPassword) {
                        return done(null, false, {message: "Incorrect Password" })
                           
                    }
                    else {
                        return done(null, user)
                        
                    }
                })
        })
    )
    passport.serializeUser((user, done) => {
        let userEmail;
        user.forEach((elem) => {
          userEmail = elem.email;
        });
        done(null, userEmail)
    })
    passport.deserializeUser(async (Email, done) => {
        try {
            let person = await prisma.users.findFirst({
              where: {
                email:Email,
              },
                include: {
                    followedBy: {
                        include: {
                            posts:true
                        }
                    },
                    following: {
                        include: {
                            posts:true
                        }                        
                    },
                    
                }
            });
            done(null,person)
        } catch (error) {
            done(error)
        }
        
        })
    }

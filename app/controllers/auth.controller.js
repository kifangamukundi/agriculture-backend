const config = require("../config/auth.config");
const db = require("../models");
const { user: User, role: Role, refreshToken: RefreshToken } = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "farmer" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

// const handleNewUser = async (req, res) => {
//   const { firstName, lastName, email, username, password, roles } = req.body;  
//   if (!firstName || !lastName || !email || !username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

//   // check for duplicate usernames in the db
//   const duplicate = await User.findOne({ username: username }).exec();
//   if (duplicate) return res.sendStatus(409); //Conflict 

//   try {
//       //encrypt the password
//       const hashedPwd = await bcrypt.hash(password, 10);

//       if (req.body.roles) {
//         Role.find(
//           {
//             name: { $in: req.body.roles },
//           },
//           (err, roles) => {
//             if (err) {
//               res.status(500).send({ message: err });
//               return;
//             }
  
//             user.roles = roles.map((role) => role._id);
//             user.save((err) => {
//               if (err) {
//                 res.status(500).send({ message: err });
//                 return;
//               }
  
//               res.send({ message: "User was registered successfully!" });
//             });
//           }
//         );
//       } else {
//         Role.findOne({ name: "farmer" }, (err, role) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
  
//           User.roles = [role._id];
//           User.save((err) => {
//             if (err) {
//               res.status(500).send({ message: err });
//               return;
//             }
  
//             res.send({ message: "User was registered successfully!" });
//           });
//         });
//       }

//       //create and store the new user
//       const result = await User.create({
//           "username": username,
//           "password": hashedPwd,
//           "firstName": firstName,
//           "lastName": lastName,
//           "email": email,
//       });

//       console.log(result);

//       res.status(201).json({ 'success': `New user ${username} created!` });
//   } catch (err) {
//       res.status(500).json({ 'message': err.message });
//   }
// }

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      // if (!user) {
      //   return res.status(404).send({ message: "User Not found." });
      // }
      console.log("user login called")

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);

      let authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
        refreshToken: refreshToken,
      });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
      
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};


// module.exports = { handleNewUser };
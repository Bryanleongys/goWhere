const { User } = require("../models/user");
const { Clique } = require("../models/clique");
const cliqueInit = require("../common/cliqueinit");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get list of users - without passwordHash for security
// .select("name email phone") for name, email and phone details only
router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

// Get specific user
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");

  if (!user) {
    res
      .status(500)
      .json({ message: "The user with the given ID was not found." });
  }
  res.status(200).send(user);
});

// Post new user
router.post("/", async (req, res) => {
  let clique = cliqueInit();
  clique = await clique.save();
  if (!clique) {
    return res.status(404).send("clique cannot be created!");
  }

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
    cliqueID: clique._id,
  });
  user = await user.save();

  if (!user) {
    return res.status(404).send("the user cannot be created!");
  }

  res.send(user);
});

// Register new user
router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("The user already exists!");
  } else {
    // Creating new clique
    // let clique = cliqueInit();
    // clique = await clique.save();
    // if (!clique) {
    //   return res.status(404).send("clique cannot be created!");
    // }
    let clique = new Clique();
    clique = await clique.save();
    if (!clique) {
      return res.status(404).send("clique cannot be created");
    }

    user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      isAdmin: req.body.isAdmin,
      cliqueID: clique.id,
    });

    user = await user.save();
    if (!user) {
      return res.status(404).send("the user cannot be created!");
    }

    res.send(user);
  }
});

// Login user
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;

  if (!user) {
    return res.status(500).send("The user not found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" } // user cannot use API when token is expired
    );

    res.status(200).send({ user: user, token: token });
  } // compare two passwords with Hash
  else {
    res.status(400).send("password is wrong!");
  }
});

// Get count
router.get(`/get/count`, async (req, res) => {
  const userCount = await User.countDocuments((count) => count);

  if (!userCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    userCount: userCount,
  });
});

// Delete user
router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "the user is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "user not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

// Get user's email
router.get("/email/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(400).send("the user cannot be found!");
  }
  res.send(user.email);
});

// Change user's email
router.patch("/changeemail/:id", async (req, res) => {
  const checkUser = await User.findById(req.params.id);

  if (checkUser.email == req.body.email) {
    return res.status(404).send("same email.");
  }

  const userExist = await User.exists({ email: req.body.email });
  if (userExist) {
    return res.status(500).send("email is already in use");
  }

  const user = await User.findByIdAndUpdate(req.params.id, {
    email: req.body.email,
  });
  if (!user) {
    return res.status(400).send("the user cannot be updated!");
  }
  res.send(user);
});

// Change user's password
// req.body parameters: oldPassword, newPassword
router.patch("/changepassword/:id", async (req, res) => {
  const checkUser = await User.findById(req.params.id);

  if (!bcrypt.compareSync(req.body.oldPassword, checkUser.passwordHash)) {
    return res.status(500).send("old passwords mismatch.");
  }

  if (bcrypt.compareSync(req.body.newPassword, checkUser.passwordHash)) {
    return res.status(404).send("same password.");
  }
  const user = await User.findByIdAndUpdate(req.params.id, {
    passwordHash: bcrypt.hashSync(req.body.newPassword, 10),
  });

  if (!user) {
    return res.status(400).send("the user cannot be updated!");
  }

  res.send(user);
});

module.exports = router;

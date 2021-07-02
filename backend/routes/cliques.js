const { Clique } = require("../models/clique");
const cliqueInit = require("../common/cliqueinit");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Get request
router.get(`/`, async (req, res) => {
  const clique = await Clique.find();

  if (!clique) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(clique);
});

// Post request for new clique
router.post("/", async (req, res) => {
  let clique = new Clique();
  clique = await clique.save();

  if (!clique) {
    return res.status(404).send("the clique cannot be created!");
  }

  res.send(clique);
});

// Clique Settings \\
// Get Friend's Locations
router.get(`/getfriendlocation/:id`, async (req, res) => {
  let clique = await Clique.find({ _id: req.params.id }, ["friends"]);
  clique = clique[0].friends;

  if (!clique) {
    res.status(500).json({ success: false, message: "clique cannot be found" });
  }

  let indexFound = null;

  for (var i = 0; i < clique.length; i++) {
    if (clique[i].name == req.query.name || clique[i].name == req.body.name) {
      indexFound = i;
      break;
    }
  }
  if (indexFound == null) {
    return res.status(500).send("friend does not exist");
  }

  res.status(200).send(clique[indexFound].locations);
});

// Get Friends (Array of Friends)
router.get(`/getfriends/:id`, async (req, res) => {
  let clique = await Clique.find({ _id: req.params.id }, ["friends"]);
  clique = clique[0].friends;

  if (!clique) {
    res.status(500).json({ success: false, message: "clique cannot be found" });
  }

  let friends = [];
  for (var i = 0; i < clique.length; i++) {
    friends.push(clique[i].name);
  }

  res.status(200).send(friends);
});

// Add members (must find a way to ensure no two names are the same)
router.patch("/addmember/:id", async (req, res) => {
  mongoose.set("useFindAndModify", false);
  const memberExist = await Clique.findOne({
    _id: req.params.id,
    "friends.name": req.body.name,
  });

  if (memberExist) {
    return res.status(404).send("friend already exists!");
  }

  const clique = await Clique.findByIdAndUpdate(req.params.id, {
    $push: {
      friends: {
        name: req.body.name,
      },
    },
  });
  if (!clique) {
    return res.status(400).send("the clique cannot be updated!");
  }
  res.send(clique);
});

// Remove members
router.patch("/removemember/:id", async (req, res) => {
  const clique = await Clique.findByIdAndUpdate(req.params.id, {
    $pull: {
      friends: {
        name: req.body.name,
      },
    },
  });
  if (!clique) {
    return res.status(400).send("the clique cannot be updated!");
  }
  res.send(clique);
});

// Add location (per friend)
router.patch("/addlocation/:id", async (req, res) => {
  // const locationExist = await Clique.exists({
  //   _id: req.params.id,
  //   "friends.name": req.body.name,
  //   "friends.locations.locationName": req.body.locationName,
  // });

  // if (locationExist) {
  //   return res.status(404).send("location already exists!");
  // }

  const filter = {
    _id: req.params.id,
    "friends.name": req.body.name,
  };
  const clique = await Clique.findOneAndUpdate(filter, {
    $push: {
      "friends.$.locations": {
        locationName: req.body.locationName,
        postalCode: req.body.postalCode,
      },
    },
  });
  if (!clique) {
    return res.status(400).send("the clique cannot be updated!");
  }
  res.send(clique);
});

// Remove location (per friend)
router.patch("/removelocation/:id", async (req, res) => {
  const filter = {
    _id: req.params.id,
    "friends.name": req.body.name,
  };
  const clique = await Clique.findOneAndUpdate(filter, {
    $pull: {
      "friends.$.locations": {
        // can use postal code as well
        locationName: req.body.locationName,
      },
    },
  });
  if (!clique) {
    return res.status(400).send("the clique cannot be updated!");
  }
  res.send(clique);
});

// Edit postal code ??? - still uncompleted
// Requires: name, locationName, postalCode
router.patch("/edit-postalcode/:id", async (req, res) => {
  // mongoose.set("useFindAndModify", false);
  const filter = {
    _id: req.params.id,
    "friends.name": req.body.name,
    "friends.locations.locationName": req.body.locationName,
  };
  const clique = await Clique.exists({ filter });
  // const clique = await Clique.findOneAndUpdate(filter, {
  //   $set: {
  //     // IDK HOW TO SET THIS SPECIFICCCC
  //     "friends.name.postalCode": {
  //       postalCode: req.body.postalCode,
  //     },
  //   },
  // });
  // if (!clique) {
  //   return res.status(400).send("the clique cannot be updated!");
  // }
  if (clique) {
    return res.status(200).send("Clique has been found");
  }
  res.status(400).send("Failed");
  // res.send(clique);
});

// Edit location
// router.patch("/editlocation/:id", async (req, res) => {
  
//   let filter = {
//     _id: req.params.id,
//     "friends.name": req.body.name,
//     "friends.locations.locationName": req.body.locationName,
//   };

//   let clique = await Clique.exists({ filter });

//   if (clique) {
//     res.status(200).send(clique);
//     clique = await Clique.findOneAndUpdate( filter,
//       { $set: {
//         "friends.location": {
//           locationName: req.body.locationName,
//           postalCode: req.body.postalCode
//         }
//       } }
//     )
//   }
//   res.status(400).send("Failed");
// })

// Logs \\
// Get Logs
router.get(`/getlogs/:id`, async (req, res) => {
  let clique = await Clique.find({ _id: req.params.id }, ["logs"]);
  clique = clique[0].logs;
  clique.sort((a, b) => (a.dateNum > b.dateNum ? -1 : 1));

  if (!clique) {
    res.status(500).json({ success: false, message: "clique cannot be found" });
  }
  res.status(200).send(clique);
});

// Add log
// Requires: date, locationName, postalCode
router.patch("/addlog/:id", async (req, res) => {
  mongoose.set("useFindAndModify", false);
  const dateExist = await Clique.findOne({
    _id: req.params.id,
    "logs.date": req.body.date,
  });

  console.log(dateExist);

  if (dateExist) {
    // Ensure no duplicate location exists
    // const locationExist = await dateExist.findOne({
    //   "locations.locationName": req.body.locationName,
    // });

    const locationExist = await Clique.findOne({
      _id: req.params.id,
      // logs: {
      //   date: req.body.date,
      //   locations: {
      //     locationName: req.body.locationName,
      //   },
      // },
      "logs.date": req.body.date,
      "logs.locations.locationName": req.body.locationName,
    });

    if (locationExist) {
      return res.status(404).send("Location already exists!");
    }

    // Create new location
    const filter = {
      _id: req.params.id,
      "logs.date": req.body.date,
    };

    const clique = await Clique.findOneAndUpdate(filter, {
      $push: {
        "logs.$.locations": {
          locationName: req.body.locationName,
          postalCode: req.body.postalCode,
        },
      },
    });
    if (!clique) {
      return res.status(400).send("the clique cannot be updated!");
    }
    res.send(clique);
  } else {
    const clique = await Clique.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $push: {
          logs: {
            date: req.body.date,
            dateNum: req.body.dateNum,
            locations: {
              locationName: req.body.locationName,
              postalCode: req.body.postalCode,
            },
          },
        },
      }
    );
    // clique = await Clique.aggregate();
    if (!clique) {
      return res.status(400).send("the clique cannot be updated!");
    }
    res.send(clique);
  }
});

// Remove log
// Requires: date, locationName
router.patch("/removelog/:id", async (req, res) => {
  let clique = await Clique.findOneAndUpdate(
    { _id: req.params.id, "logs.date": req.body.date },
    {
      $pull: {
        "logs.$.locations": {
          // can use postal code as well
          locationName: req.body.locationName,
        },
      },
    }
  );

  // Check if array is there
  const filter = {
    _id: req.params.id,
    "logs.date": req.body.date,
    "logs.locations": [],
  };
  const dateEmptyArray = await Clique.exists(filter);
  if (dateEmptyArray) {
    clique = await Clique.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          logs: {
            date: req.body.date,
          },
        },
      }
    );
  }
  if (!clique) {
    return res.status(400).send("the clique cannot be updated!");
  }
  res.send(clique);
});

// Favourites \\
// Get Favourites
router.get(`/getfavourites/:id`, async (req, res) => {
  let clique = await Clique.find({ _id: req.params.id }, ["favourites"]);
  clique = clique[0].favourites;

  if (!clique) {
    res.status(500).json({ success: false, message: "clique cannot be found" });
  }
  res.status(200).send(clique);
});

// Add favourite
// Requires: locationName, postalCode
router.patch("/addfavourite/:id", async (req, res) => {
  mongoose.set("useFindAndModify", false);
  const locationExist = await Clique.findOne({
    _id: req.params.id,
    "favourites.locationName": req.body.locationName,
  });
  if (locationExist) {
    return res.status(404).send("Location already exists!");
  }
  const clique = await Clique.findByIdAndUpdate(req.params.id, {
    $push: {
      favourites: {
        locationName: req.body.locationName,
        postalCode: req.body.postalCode,
      },
    },
  });
  if (!clique) {
    return res.status(400).send("the clique cannot be updated!");
  }
  res.send(clique);
});

// Remove favourite
// Requires: locationName
router.patch("/removefavourite/:id", async (req, res) => {
  const clique = await Clique.findByIdAndUpdate(req.params.id, {
    $pull: {
      favourites: {
        locationName: req.body.locationName,
      },
    },
  });
  if (!clique) {
    return res.status(400).send("the clique cannot be updated!");
  }
  res.send(clique);
});

module.exports = router;

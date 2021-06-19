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

module.exports = router;

// Clique Settings \\
// Add members (must find a way to ensure no two names are the same)
router.patch("/addmember/:id", async (req, res) => {
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
  const clique = await Clique.findByIdAndUpdate(
    { _id: req.params.id, "friends.name": req.body.name },
    {
      $push: {
        "friends.$[].locations": {
          locationName: req.body.locationName,
          postalCode: req.body.postalCode,
        },
      },
    }
  );
  if (!clique) {
    return res.status(400).send("the clique cannot be updated!");
  }
  res.send(clique);
});

// Remove location (per friend)
router.patch("/removelocation/:id", async (req, res) => {
  const clique = await Clique.findByIdAndUpdate(
    { _id: req.params.id, "friends.name": req.body.name },
    {
      $pull: {
        "friends.$[].locations": {
          // can use postal code as well
          locationName: req.body.locationName,
        },
      },
    }
  );
  if (!clique) {
    return res.status(400).send("the clique cannot be updated!");
  }
  res.send(clique);
});

// Edit postal code ???
// Requires: name, locationName, postalCode
router.patch("/edit-postalcode/:id", async (req, res) => {
  mongoose.set("useFindAndModify", false);
  const clique = await Clique.findOneAndUpdate(
    {
      _id: req.params.id,
      "friends.name": req.body.name,
    },
    {
      $set: {
        "friends.$.locations.0": {
          locationName: req.body.locationName,
          postalCode: req.body.postalCode,
        },
      },
    }
  );
  if (!clique) {
    return res.status(400).send("the clique cannot be updated!");
  }
  res.send(clique);
});

// Logs \\
// Add log
// Requires: date, locationName, postalCode
router.patch("/addlog/:id", async (req, res) => {
  mongoose.set("useFindAndModify", false);
  const dateExist = await Clique.exists({
    _id: req.params.id,
    "logs.date": req.body.date,
  });

  if (dateExist) {
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
            locations: {
              locationName: req.body.locationName,
              postalCode: req.body.postalCode,
            },
          },
        },
      }
    );
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
// Add favourite
// Requires: locationName, postalCode
router.patch("/addfavourite/:id", async (req, res) => {
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

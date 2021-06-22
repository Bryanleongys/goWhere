const mongoose = require("mongoose");

const cliqueSchema = new mongoose.Schema({
  favourites: {
    type: [
      {
        locationName: {
          // required: true,
          type: String,
        },
        postalCode: {
          // required: true,
          type: String,
        },
      },
    ],
  },
  friends: {
    // required: true,
    type: [
      {
        name: {
          // required: true,
          type: String,
        },
        locations: {
          // required: true,
          type: [
            {
              locationName: {
                type: String,
              },
              postalCode: {
                type: String,
              },
            },
          ],
        },
      },
    ],
  },

  logs: {
    // required: true,
    type: [
      {
        date: {
          // required: true,
          type: String,
        },
        dateNum: {
          type: String,
        },
        locations: {
          // required: true,
          type: [
            {
              locationName: {
                // required: true,
                type: String,
              },
              postalCode: {
                // required: true,
                type: String,
              },
            },
          ],
        },
      },
    ],
  },
});

cliqueSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

cliqueSchema.set("toJSON", {
  virtuals: true,
});

exports.Clique = mongoose.model("Clique", cliqueSchema);
exports.cliqueSchema = cliqueSchema;

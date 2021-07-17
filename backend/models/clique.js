const mongoose = require("mongoose");

const cliqueSchema = new mongoose.Schema({
  favourites: {
    type: [
      {
        locationName: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
        },
        longitude: {
          type: Number,
          required: true,
        },
        latitude: {
          type: Number,
          required: true,
        },
        placeId: {
          type: String
        }
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
              longitude: {
                type: Number,
              },
              latitude: {
                type: Number,
              },
              placeId: {
                type: String
              }
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
          type: Number,
        },
        locations: {
          // required: true,
          type: [
            {
              locationName: {
                type: String,
                required: true,
              },
              postalCode: {
                type: String,
              },
              longitude: {
                type: Number,
                required: true,
              },
              latitude: {
                type: Number,
                required: true,
              },
              placeId: {
                type: String
              }
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

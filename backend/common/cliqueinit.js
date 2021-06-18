const { Clique } = require("../models/clique");

module.exports = function () {
  let date = "";
  let name = "";
  let locationName = "";
  let postalCode = "";
  let location = { locationName, postalCode };
  let locations = [location];
  let friend = { name, locations };
  let log = { date, locations };
  let clique = new Clique({
    favourites: locations,
    friends: friend,
    logs: log,
  });
  return clique;
};

import React from "react";
import config from "../config";
const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

async function getNearbyLocations(loc) {
  var objectArray = [];
  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc}&type=shopping_mall&rankby=distance&key=${GOOGLE_PLACES_API_KEY}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        for (var i = 0; i < 10; i++) {
          if (responseJson.results[i]) {
            objectArray.push({
              name: responseJson.results[i].name,
              latitude: responseJson.results[i].geometry.location.lat,
              longitude: responseJson.results[i].geometry.location.lng,
              place_id: responseJson.results[i].place_id,
            });
          }
        }
      });
  } catch (error) {
    console.log("Error: ", error);
  }
  return objectArray;
}

export default getNearbyLocations;

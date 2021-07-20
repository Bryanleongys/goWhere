import React from "react";
import config from "../config";
const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

async function getNearbyLocations2(loc, locationType) {
  var objectArray = [];
  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc}&type=${locationType}&rankby=distance&key=${GOOGLE_PLACES_API_KEY}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        var i = 0;
        while (i < responseJson.results.length) {
          if (responseJson.results[i]) {
            objectArray.push({
              name: responseJson.results[i].name,
              latitude: responseJson.results[i].geometry.location.lat,
              longitude: responseJson.results[i].geometry.location.lng,
              placeId: responseJson.results[i].place_id,
              rating: responseJson.results[i].rating,
              price_level: responseJson.results[i].price_level,
              postalCode: null,
            });
            i++;
          }
        }
      });
  } catch (error) {
    console.log("Error: ", error);
  }
  return objectArray;
}

export default getNearbyLocations2;

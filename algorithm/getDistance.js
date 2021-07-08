import React from "react";
import config from "../config";
const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

// origins, destinations: object = {
//     latitude:
//     longitude:
// }
async function getDistance(origins, destination) {
  var arrayResult = [];
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origins}&destinations=${destination}&key=${GOOGLE_PLACES_API_KEY}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        for (var i = 0; i < 10; i++) {
          if (responseJson.rows[0].elements[i]) {
            arrayResult.push(responseJson.rows[0].elements[i].duration.text);
          }
        }
      });
    // const respJson = await resp.json();
    // return respJson.results[0].name;
  } catch (error) {
    console.log("Error: ", error);
  }
  return arrayResult;
}

export default getDistance;

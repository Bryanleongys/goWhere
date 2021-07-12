import React from "react";
import config from "../config";
const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

// per row: each origin to different destinations
// per column: each destination to different origins
async function getDistanceMatrix(origins, destinations) {
  var arrayResult = []; // array of arrays

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origins}&destinations=${destinations}&key=${GOOGLE_PLACES_API_KEY}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        for (var i = 0; i < responseJson.rows.length; i++) {
          arrayResult.push([]);
          //
          for (var j = 0; j < responseJson.rows[i].elements.length; j++) {
            arrayResult[i].push(
              responseJson.rows[i].elements[j].duration.text
            );
          }
        }
      });
  } catch (error) {
    console.log("Error: ", error);
  }
  return arrayResult;
}

export default getDistanceMatrix;

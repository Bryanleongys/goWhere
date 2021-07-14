import React from "react";
import config from "../config";
const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

// per row: each origin to different destinations
// per column: each destination to different origins
async function getDrivingTime(origins, destinations, time) {
  var arrayResult = []; // array of arrays
  var seconds = Math.round(time / 1000);

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origins}&destinations=${destinations}&arrival_time=${seconds}&mode=driving&key=${GOOGLE_PLACES_API_KEY}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        for (var i = 0; i < responseJson.rows.length; i++) {
          arrayResult.push([]);
          //
          for (var j = 0; j < responseJson.rows[i].elements.length; j++) {
            if (responseJson.rows[i].elements[j].duration.text) {
              arrayResult[i].push(
                responseJson.rows[i].elements[j].duration.text
              );
            } else {
              arrayResult[i].push("N/A");
            }
          }
        }
      });
  } catch (error) {
    console.log("Error: ", error);
  }
  return arrayResult;
}

export default getDrivingTime;

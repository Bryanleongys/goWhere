import React from "react";
import config from "../config";
const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

async function getNearbyLocations(
  loc,
  travelLog,
  rtngs,
  priceLvl,
  locationType,
  includeLog
) {
  var objectArray = [];
  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc}&type=${locationType}&rankby=distance&key=${GOOGLE_PLACES_API_KEY}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        var testArray = [];
        for (var i = 0; i < travelLog.length; i++) {
          for (var j = 0; j < travelLog[i].locations.length; j++) {
            testArray.push(travelLog[i].locations[j].placeId);
          }
        }

        var i = 0;
        var j = 0;
        while (j < 3 && i < responseJson.results.length) {
          // console.log(`conditional ${i}: `, travelLog.find((a) => a.latitude == responseJson.results[i].geometry.location.lat && a.longitude == responseJson.results[i].geometry.location.lng));
          if (responseJson.results[i]) {
            if (
              !(rtngs[0] == 0 && rtngs[1] == 5) &&
              responseJson.results[i].rating == undefined
            ) {
              i++;
              continue;
            }
            if (
              (includeLog &&
                testArray.includes(responseJson.results[i].place_id)) ||
              responseJson.results[i].rating <= rtngs[0] ||
              responseJson.results[i].rating >= rtngs[1] ||
              responseJson.results[i].price_level <= priceLvl[0] ||
              responseJson.results[i].price_level >= priceLvl[1]
            ) {
              i++;
            } else {
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
              j++;
            }
          }
        }
      });
  } catch (error) {
    console.log("Error: ", error);
  }
  return objectArray;
}

export default getNearbyLocations;

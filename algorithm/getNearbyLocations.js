import React from "react";
import config from "../config";
import getPostalCode2 from "./getPostalCode2";
const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

async function getNearbyLocations(loc, travelLog, rtngs, priceLvl) {
  var objectArray = [];
  console.log("travelLog array: ", travelLog);
  console.log("ratings array: ", rtngs);
  console.log("price array: ", priceLvl);
  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc}&type=${locationType}&rankby=distance&key=${GOOGLE_PLACES_API_KEY}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        var i = 0;
        var j = 0;
        console.log(responseJson.results[i].rating);
        console.log(responseJson.results[i].price_level);
        while (j < 10 && i < responseJson.results.length) {
         // console.log(`conditional ${i}: `, travelLog.find((a) => a.latitude == responseJson.results[i].geometry.location.lat && a.longitude == responseJson.results[i].geometry.location.lng));
          if (responseJson.results[i]) {
            if (travelLog.find(
              (a) => a.latitude == responseJson.results[i].geometry.location.lat && a.longitude == responseJson.results[i].geometry.location.lng
                ) != undefined
                ||  (responseJson.results[i].rating <= rtngs[0] || responseJson.results[i].rating >= rtngs[1])
                  || (responseJson.results[i].price_level <= priceLvl[0] || responseJson.results[i].price_level >= priceLvl[1])) {
              i++;
              //console.log(i);
            } else {
              objectArray.push({
                name: responseJson.results[i].name,
                latitude: responseJson.results[i].geometry.location.lat,
                longitude: responseJson.results[i].geometry.location.lng,
                place_id: responseJson.results[i].place_id,
                rating: responseJson.results[i].rating,
                price_level: responseJson.results[i].price_level,
                // address_components: responseJson.results[i].address_components,
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
  console.log(objectArray);
  return objectArray;
}

export default getNearbyLocations;
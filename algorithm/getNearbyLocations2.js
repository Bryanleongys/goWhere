import React from "react";
import config from "../config";
import getPostalCode2 from "./getPostalCode2";
import getPostalCode from "./getPostalCode";
const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

const getNearbyLocations2 = async (
  loc,
  travelLog,
  rtngs,
  priceLvl,
  locationType
) => {
  var objectArray = [];
  var postalArray = [];
  const [postalCode, setPostalCode] = React.useState(null);
  console.log(travelLog);
  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc}&type=${locationType}&rankby=distance&key=${GOOGLE_PLACES_API_KEY}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        var i = 0;
        var j = 0;
        while (j < 3 && i < responseJson.results.length) {
          // console.log(`conditional ${i}: `, travelLog.find((a) => a.latitude == responseJson.results[i].geometry.location.lat && a.longitude == responseJson.results[i].geometry.location.lng));

          if (responseJson.results[i]) {
            // if ((rtngs != [0, 5] && responseJson.results[i].rating == undefined) || ( priceLvl != [0, 4] && responseJson.results[i].price_level == undefined)) {
            // i++;
            // continue;
            // }
            // console.log(postalCode.then((data) => data))
            var postalCode = getPostalCode(
              responseJson.results[i].geometry.location.lat,
              responseJson.results[i].geometry.location.lng
            );
            postalCode.then((data) => setPostalCode(data));

            if (
              travelLog.find(
                (a) =>
                  a.latitude == responseJson.results[i].geometry.location.lat &&
                  a.longitude == responseJson.results[i].geometry.location.lng
              ) != undefined ||
              responseJson.results[i].rating <= rtngs[0] ||
              responseJson.results[i].rating >= rtngs[1] ||
              responseJson.results[i].price_level <= priceLvl[0] ||
              responseJson.results[i].price_level >= priceLvl[1]
            ) {
              i++;
            } else {
              // postalCode.then((data) => {
              objectArray.push({
                name: responseJson.results[i].name,
                latitude: responseJson.results[i].geometry.location.lat,
                longitude: responseJson.results[i].geometry.location.lng,
                placeId: responseJson.results[i].place_id,
                rating: responseJson.results[i].rating,
                price_level: responseJson.results[i].price_level,
                postalCode: postalCode,
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
};

export default getNearbyLocations2;

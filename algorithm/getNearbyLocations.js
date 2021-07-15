import React from "react";
import config from "../config";
import getPostalCode2 from "./getPostalCode2";
const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

async function getNearbyLocations(loc, locationType) {
  var objectArray = [];

  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc}&type=${locationType}&rankby=distance&key=${GOOGLE_PLACES_API_KEY}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        for (var i = 0; i < 3; i++) {
          if (responseJson.results[i]) {
            objectArray.push({
              name: responseJson.results[i].name,
              latitude: responseJson.results[i].geometry.location.lat,
              longitude: responseJson.results[i].geometry.location.lng,
              place_id: responseJson.results[i].place_id,
              rating: responseJson.results[i].rating,
              price_level: responseJson.results[i].price_level,
              postalCode: null,
            });
          }
        }
      });
  } catch (error) {
    console.log("Error: ", error);
  }
  // try {
  //   (async () => {
  //     for (var i = 0; i < 10; i++) {
  //       var postalCode = await getPostalCode(
  //         objectArray[i].latitude,
  //         objectArray[i].longitude
  //       );
  //       objectArray[i].postalCode = postalCode;
  //     }
  //   })();
  // } catch (error) {
  //   console.log(error);
  // }

  // try {
  //   getPostalCode2(objectArray).then((data) => {
  //     newObjectArray.push(data);
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
  return objectArray;
}

export default getNearbyLocations;

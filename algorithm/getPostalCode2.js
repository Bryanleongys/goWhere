import React from "react";
import config from "../config";
const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

async function getPostalCode2(locationArray) {
  for (var i = 0; i < locationArray.length; i++) {
    var postalCode;
    try {
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationArray[i].latitude},${locationArray[i].longitude}&key=${GOOGLE_PLACES_API_KEY}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          postalCode = responseJson.results[0].address_components.find(
            (addressComponent) => addressComponent.types.includes("postal_code")
          )?.short_name;
          locationArray[i].postalCode = postalCode;
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  console.log(locationArray);
  return locationArray;
}

export default getPostalCode2;

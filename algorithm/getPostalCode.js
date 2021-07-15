import React from "react";
import config from "../config";
const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

async function getPostalCode(latitude, longitude) {
  var postalCode;
  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        postalCode = responseJson.results[0].address_components.find(
          (addressComponent) => addressComponent.types.includes("postal_code")
        )?.short_name;
      });
  } catch (error) {
    console.log("Error: ", error);
  }
  return postalCode;
}

export default getPostalCode;

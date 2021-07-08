import config from "../config";
const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

async function getDirections(startLoc, desLoc) {
  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=${GOOGLE_PLACES_API_KEY}`
    );
    if (resp) {
      const respJson = await resp.json();
      const response = respJson.routes[0];
      const distanceTime = response.legs[0];
      const distance = distanceTime.distance.text;
      const time = distanceTime.duration.text;
      return time;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

export default getDirections;

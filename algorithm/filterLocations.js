import React from "react";
import config from "../config";
const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

function filterLocations(locationsArray, travelLog, rtngs, includeLog) {
  var confirmedArray = [];
  var testArray = [];
  for (var i = 0; i < travelLog.length; i++) {
    for (var j = 0; j < travelLog[i].locations.length; j++) {
      testArray.push(travelLog[i].locations[j].postalCode);
    }
  }
  var j = 0;
  var i = 0;
  while (j < 3 && i < locationsArray.length) {
    if (
      !(rtngs[0] == 0 && rtngs[1] == 5) &&
      locationsArray[i].rating == undefined
    ) {
      i++;
      continue;
    }
    if (
      (includeLog && testArray.includes(locationsArray[i].postalCode)) ||
      locationsArray[i].rating <= rtngs[0] ||
      locationsArray[i].rating >= rtngs[1]
    ) {
      i++;
    } else {
      confirmedArray.push(locationsArray[i]);
      i++;
      j++;
    }
  }
  return confirmedArray;
}

export default filterLocations;

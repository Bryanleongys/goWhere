// returns index of destination with shortest time taken for all
function minTime(distanceMatrix) {
  var totalTimeArray = new Array([]);
  for (var i = 0; i < distanceMatrix.length; i++) {
    for (var j = 0; j < distanceMatrix[i].length; j++) {
      if (!totalTimeArray[j]) {
        totalTimeArray[j] = [];
      }
      const value = Number(distanceMatrix[i][j]);
      totalTimeArray[j] = Number(totalTimeArray[j]) + value;
    }
  }
  const index = totalTimeArray.indexOf(Math.min(...totalTimeArray));
  return index;
}

export default minTime;

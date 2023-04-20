/**
 * @params {object} coord1 - The first coordinate
 * @params {object} coord2 - The second coordinate
 * @returns {number} The distance between two coordinates in meters
 */
function calculateDistance(coord1, coord2) {
  const R = 6371e3;
  // convert to radians
  const phi1 = (coord1.lat * Math.PI) / 180;
  const phi2 = (coord2.lat * Math.PI) / 180;
  const deltaPhi = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const deltaLambda = ((coord2.lng - coord1.lng) * Math.PI) / 180;

  // Haversine formula
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Perpendicular distance in meters
  return distance;
}

/**
 *
 * @param {object} buildingInfo
 * @returns {number} The total fuel oil use in kbtu
 */
function calculateTotalFuelOilUse(buildingInfo) {
  let totalFuelOilUse = 0;

  if (buildingInfo.fuel_oil_1_use_kbtu !== "Not Available") {
    totalFuelOilUse += Number(buildingInfo.fuel_oil_1_use_kbtu);
  }

  if (buildingInfo.fuel_oil_2_use_kbtu !== "Not Available") {
    totalFuelOilUse += Number(buildingInfo.fuel_oil_2_use_kbtu);
  }

  if (buildingInfo.fuel_oil_4_use_kbtu !== "Not Available") {
    totalFuelOilUse += Number(buildingInfo.fuel_oil_4_use_kbtu);
  }

  if (buildingInfo.fuel_oil_5_6_use_kbtu !== "Not Available") {
    totalFuelOilUse += Number(buildingInfo.fuel_oil_5_6_use_kbtu);
  }

  return totalFuelOilUse;
}

/**
 *
 * @param {object} buildingInfo
 * @returns {number} The total diesel use in kbtu
 */
function calculateDieselUse(buildingInfo) {
  let dieselUse = 0;
  if (buildingInfo.diesel_2_use_kbtu !== "Not Available") {
    dieselUse = Number(buildingInfo.diesel_2_use_kbtu);
  }
  return dieselUse;
}

/**
 *
 * @param {object} buildingInfo
 * @returns {number} The total propane use in kbtu
 */
function calculatePropaneUse(buildingInfo) {
  let propaneUse = 0;
  if (buildingInfo.propane_use_kbtu !== "Not Available") {
    propaneUse = Number(buildingInfo.propane_use_kbtu);
  }
  return propaneUse;
}

/**
 *
 * @param {object} buildingInfo
 * @returns {number} The total natural gas use in kbtu
 */
function calculateNaturalGasUse(buildingInfo) {
  let naturalGasUse = 0;
  if (buildingInfo.natural_gas_use_kbtu !== "Not Available") {
    naturalGasUse = Number(buildingInfo.natural_gas_use_kbtu);
  }
  return naturalGasUse;
}

/**
 * Takes in an object with key of the field name and value as an array of numbers
 * @param  {object} obj
 * @returns {array} An object with each key as the field name and value as an array of strings fixed to 2 decimal places with dollar signs
 */
function convertToDollarString(obj) {
  if (typeof obj !== "object") throw new Error("Input must be an object");

  const newObj = {};
  for (const key in obj) {
    newObj[key] = obj[key].map((num) => `$${num.toFixed(2)}`);
  }
  return newObj;
}

export {
  calculateDistance,
  calculateTotalFuelOilUse,
  calculateDieselUse,
  calculatePropaneUse,
  calculateNaturalGasUse,
  convertToDollarString,
};

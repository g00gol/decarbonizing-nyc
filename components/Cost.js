import { useEffect, useState } from "react";
import convert from "convert-units";

const Cost = ({ toggleModal, buildingInfo, coords, dstCoords }) => {
  const [perpendicularDistance, setPerpendicularDistance] = useState(0);

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

  useEffect(() => {
    if (!coords || !dstCoords) return;

    // Calculate the distance in meters
    let distance = calculateDistance(coords, dstCoords);
    let distanceInFeet = convert(distance).from("m").to("ft");
    // console.log(`meters: ${distance} feet: ${distanceInFeet}`);

    // Surveying costs [lower, upper]
    let surveying = [1000, 1500];

    // Piping costs [lower, upper]
    let piping = [3.62 * distanceInFeet, 3.62 * distanceInFeet]; // $3.62/ft

    // Equipment costs [lower, upper]
    if (buildingInfo.primary_property_type === "Multifamily Housing") {
      var percentAbove = 0.28302;
    } else if (buildingInfo.primary_property_type === "Office") {
      var percentAbove = 0.15385;
    } else {
      var percentAbove = 0.25;
    }

    // Get the total fuel oil use
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

    // Get the total diesel use
    let dieselUse = 0;
    if (buildingInfo.diesel_2_use_kbtu !== "Not Available") {
      dieselUse = Number(buildingInfo.diesel_2_use_kbtu);
    }

    // Get total propane use
    let propaneUse = 0;
    if (buildingInfo.propane_use_kbtu !== "Not Available") {
      propaneUse = Number(buildingInfo.propane_use_kbtu);
    }

    // Get total natural gas use
    let naturalGasUse = 0;
    if (buildingInfo.natural_gas_use_kbtu !== "Not Available") {
      naturalGasUse = Number(buildingInfo.natural_gas_use_kbtu);
    }

    // Total fossil fuel use
    let totalFossilFuelUse =
      totalFuelOilUse + dieselUse + propaneUse + naturalGasUse;

    let heatPumps = (1000 / 12) * ((percentAbove * totalFossilFuelUse) / 8760);

    let fluidPumps = 6;
    let heatExchangers = 2;
    let storageTanks;

    let lowerEquipment =
      25000 * heatPumps +
      2000 * fluidPumps +
      3000 * heatExchangers +
      15000 * storageTanks;

    let upperEquipment =
      30000 * heatPumps +
      3000 * fluidPumps +
      4000 * heatExchangers +
      20000 * storageTanks;

    let equipment = [lowerEquipment, upperEquipment];

    let cost;

    console.log(
      `totalFuelOilUse: ${totalFuelOilUse},\n dieselUse: ${dieselUse},\n propaneUse: ${propaneUse},\n naturalGasUse: ${naturalGasUse},\n totalFossilFuelUse: ${totalFossilFuelUse},\n %above: ${percentAbove},\n heatPumpsCost: ${heatPumps}`
    );
    console.log(
      `distance: ${distance} meters, distanceInFeet: ${distanceInFeet}, buildingInfo:`
    );
    console.log(buildingInfo);

    setPerpendicularDistance(distanceInFeet);
  }, [buildingInfo, coords, dstCoords]);

  if (toggleModal) {
    return (
      <div className="absolute w-1/2 h-5/6 bg-[#3B4252] text-white p-8">
        Hello World
      </div>
    );
  }
};

export default Cost;

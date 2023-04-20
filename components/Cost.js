import { useEffect, useState } from "react";
import convert from "convert-units";

const Cost = ({ toggleModal, buildingInfo, coords, dstCoords }) => {
  const [perpendicularDistance, setPerpendicularDistance] = useState(0);

  useEffect(() => {
    if (!coords || !dstCoords) return;

    // Calculate the distance in meters
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
    let distance = calculateDistance(coords, dstCoords);
    let distanceInFeet = convert(distance).from("m").to("ft");

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

    let storageTanks = Number(buildingInfo.occupancy) * 7.5;

    let lowerEquipment =
      heatPumps +
      2000 * fluidPumps +
      3000 * heatExchangers +
      15000 * storageTanks;

    let upperEquipment =
      heatPumps +
      3000 * fluidPumps +
      4000 * heatExchangers +
      20000 * storageTanks;

    let equipment = [lowerEquipment, upperEquipment];

    let permitting = [20000, 25000];

    let hours;
    if (distanceInFeet > 100) {
      hours = 0.4 * distanceInFeet;
    } else if (distanceInFeet > 100 && distanceInFeet < 200) {
      hours = 0.3 * distanceInFeet;
    } else if (distanceInFeet > 200 && distanceInFeet < 300) {
      hours = 0.2 * distanceInFeet;
    } else {
      hours = 0.12 * distanceInFeet;
    }
    let excavation = [240 * hours, 420 * hours];

    let installation;

    let engineering = [16000, 20000];

    let totalInstallation =
      permitting + excavation + installation + engineering;

    let cost;

    console.log(
      `totalFuelOilUse: ${totalFuelOilUse},\n dieselUse: ${dieselUse},\n propaneUse: ${propaneUse},\n naturalGasUse: ${naturalGasUse},\n totalFossilFuelUse: ${totalFossilFuelUse},\n %above: ${percentAbove},\n heatPumpsCost: ${heatPumps}, fluidPumpsCost: ${fluidPumps}, heatExchangersCost: ${heatExchangers}, storageTanksCost: ${storageTanks},\n lowerEquipmentCost: ${lowerEquipment}, upperEquipmentCost: ${upperEquipment},\n permittingCost: ${permitting}, excavationCost: ${excavation}, installationCost: ${installation}, engineeringCost: ${engineering},\n totalInstallationCost: ${totalInstallation}`
    );
    console.log(
      `distance: ${distance} meters, distanceInFeet: ${distanceInFeet}, buildingInfo:`
    );
    console.log(buildingInfo);

    setPerpendicularDistance(distanceInFeet);
  }, [buildingInfo, coords, dstCoords]);

  if (toggleModal) {
    if (!dstCoords) {
      return (
        <div className="w-fit h-fit bg-black/50 border-0 backdrop-blur rounded-lg shadow-md text-white p-8">
          Please select a heat source.
        </div>
      );
    }
  }
};

export default Cost;

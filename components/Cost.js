import { useEffect, useState } from "react";
import * as data from "@/data/cost_data.js";
import convert from "convert-units";

const Cost = ({ toggleModal, buildingInfo, coords, dstCoords }) => {
  const [perpendicularDistance, setPerpendicularDistance] = useState(0);
  const [costBreakdown, setCostBreakdown] = useState(null);

  useEffect(() => {
    if (!coords || !dstCoords) return;

    /**
     * Percent Above depending on building type
     */
    let percentAbove;
    if (buildingInfo.primary_property_type === "Multifamily Housing") {
      percentAbove = 0.28302;
    } else if (buildingInfo.primary_property_type === "Office") {
      percentAbove = 0.15385;
    } else {
      percentAbove = 0.25;
    }

    /**
     * Calculate the perpendicular distance
     */
    let distance = data.calculateDistance(coords, dstCoords);
    let distanceInFeet = convert(distance).from("m").to("ft");

    /**
     * Surveying costs [lower, upper]
     */
    let surveying = [1000, 1500];

    /**
     * Piping costs [lower, upper]
     */
    let piping = [3.62 * distanceInFeet, 3.62 * distanceInFeet]; // $3.62/ft

    /**
     * Equipment costs [lower, upper]
     */
    // Get the total fuel oil use
    let totalFuelOilUse = data.calculateTotalFuelOilUse(buildingInfo);
    // Get the total diesel use
    let dieselUse = data.calculateDieselUse(buildingInfo);
    // Get total propane use
    let propaneUse = data.calculatePropaneUse(buildingInfo);
    // Get total natural gas use
    let naturalGasUse = data.calculateNaturalGasUse(buildingInfo);

    // Calculate the number of heat pumps using total fossil fuel use
    let totalFossilFuelUse =
      totalFuelOilUse + dieselUse + propaneUse + naturalGasUse;
    let heatPumps = (1000 / 12) * ((percentAbove * totalFossilFuelUse) / 8760);

    const fluidPumpsAmt = 6;
    const heatExchangersAmt = 2;
    const storageTanksAmt = 1;

    let storageTanks = Number(buildingInfo.occupancy) * 7.5 * 4;

    let lowerEquipment = heatPumps + 2000 * fluidPumpsAmt;
    3000 * heatExchangersAmt + storageTanks;

    let upperEquipment =
      heatPumps +
      3000 * fluidPumpsAmt +
      4000 * heatExchangersAmt +
      storageTanks;

    let equipment = [lowerEquipment, upperEquipment];

    /**
     * Total Installation Costs [lower, upper]
     */
    // Permitting is constant
    let permitting = [20000, 25000];

    // Calculate excavation costs using distance
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

    // Calculate Installation using # of heat pumps, fluid pumps, heat exchangers, and storage tanks
    let installHeatPumps = [3800, 8200];
    let installFluidPumps = [200 * fluidPumpsAmt, 600 * fluidPumpsAmt];
    let installHeatExchangers = [
      2000 * heatExchangersAmt,
      4000 * heatExchangersAmt,
    ];
    let installStorageTanks = [600 * storageTanksAmt, 1200 * storageTanksAmt];

    let installationLower =
      installHeatPumps[0] +
      installFluidPumps[0] +
      installHeatExchangers[0] +
      installStorageTanks[0];

    let installationUpper =
      installHeatPumps[1] +
      installFluidPumps[1] +
      installHeatExchangers[1] +
      installStorageTanks[1];

    let installation = [installationLower, installationUpper];

    // Engineering is constant
    let engineering = [32000, 40000];

    // Total Installation
    let totalInstallation = [
      permitting[0] + excavation[0] + installation[0] + engineering[0],
      permitting[1] + excavation[1] + installation[1] + engineering[1],
    ];

    // Total Cost
    let totalCost = [
      surveying[0] + piping[0] + equipment[0] + totalInstallation[0],
      surveying[1] + piping[1] + equipment[1] + totalInstallation[1],
    ];

    console.log(`total cost: ${totalCost} =`);
    console.log(
      `surveying: ${surveying}\npiping: ${piping}\nequipment: ${equipment}\ntotalInstallation: ${totalInstallation}\n`
    );
    console.log(
      `distance: ${distance} meters, distanceInFeet: ${distanceInFeet}, buildingInfo:`
    );
    console.log(buildingInfo);

    let res = data.convertToDollarString({
      totalCost,
      surveying,
      piping,
      equipment,
      totalInstallation,
    });

    ({ totalCost, surveying, piping, equipment, totalInstallation } = res);

    setPerpendicularDistance(distanceInFeet.toFixed(4));
    setCostBreakdown({
      totalCost,
      surveying,
      piping,
      equipment,
      totalInstallation,
    });
  }, [buildingInfo, coords, dstCoords]);

  if (toggleModal) {
    if (!dstCoords) {
      return (
        <div className="w-fit h-fit bg-black/50 border-0 backdrop-blur rounded-lg shadow-md text-white p-8">
          Please select a heat source.
        </div>
      );
    }

    if (!costBreakdown) {
      return (
        <div className="w-fit h-fit bg-black/50 border-0 backdrop-blur rounded-lg shadow-md text-white p-8">
          Loading...
        </div>
      );
    }

    return (
      <div className="modal space-y-4">
        <h1>
          Distance from Heat Source to Your Building: {perpendicularDistance} ft
        </h1>

        <table class="costTable">
          <thead>
            <tr>
              <th>Breakdown</th>
              <th>Lower, Higher Estimate</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Surveying</td>
              <td>
                {costBreakdown.surveying[0]}, {costBreakdown.surveying[1]}
              </td>
            </tr>

            <tr>
              <td>Piping</td>
              <td>
                {costBreakdown.piping[0]}, {costBreakdown.piping[1]}
              </td>
            </tr>

            <tr>
              <td>Equipment</td>
              <td>
                {costBreakdown.equipment[0]}, {costBreakdown.equipment[1]}
              </td>
            </tr>

            <tr>
              <td>Installation</td>
              <td>
                {costBreakdown.totalInstallation[0]},
                {costBreakdown.totalInstallation[1]}
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td>Total Cost</td>
              <td>
                {costBreakdown.totalCost[0]}, {costBreakdown.totalCost[1]}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
};

export default Cost;

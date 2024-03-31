import * as dt from "../schema/appliance";
import fs = require("fs");
import path from "path";

export const WATER_HEATERS: dt.HeatPumpWaterHeater[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/water-heaters.json"), "utf-8")
);

export const DRYERS: dt.HeatPumpDryer[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/dryers.json"), "utf-8")
);

export function findWaterHeater(
  tankCapacity: number,
  uniformEnergyFactor: number,
  firstHourRating: number
) {
  return WATER_HEATERS.filter((heater) => {
    if (heater.tankCapacityGallons < tankCapacity) {
      return false;
    }
    if (heater.uniformEnergyFactor < uniformEnergyFactor) {
      return false;
    }
    if (heater.firstHourRating < firstHourRating) {
      return false;
    }
    return true;
  });
}

export function findDryer(
  soundLevel: number,
  combinedEnergyFactor: number,
  capacity: number
) {
  return DRYERS.filter((dryer) => {
    if (dryer.soundLevelMax > soundLevel) {
      return false;
    }
    if (dryer.combinedEnergyFactor < combinedEnergyFactor) {
      return false;
    }
    if (dryer.capacity < capacity) {
      return false;
    }
    return true;
  });
}

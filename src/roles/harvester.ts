import { HarvesterState } from "types/types";
import { findNearestStructure, findUnfilledStructures } from "../finders/structures";
import harvest from "./actions/harvest";
import transferEnergy, { transferEnergyToTarget } from "./actions/transferEnergy";

const harvester = {
  run: (room: Room, creep: Creep): boolean => {
    if (creep.carry.getFreeCapacity() === 0) {
      creep.memory.state = HarvesterState.Tranfering;
    }
    if (creep.carry.getUsedCapacity() === 0) {
      creep.memory.state = HarvesterState.Harvesting;
    }

    if (creep.memory.state === HarvesterState.Harvesting) {
      return harvest(room, creep);
    } else {
      // TODO STORE UNFILLED STRUCTURE AT THE BEGINNING
      const nearestUnfilledSpawn = findNearestStructure(creep, findUnfilledStructures(room, STRUCTURE_SPAWN));
      if (nearestUnfilledSpawn) {
        return transferEnergyToTarget(creep, nearestUnfilledSpawn);
      }
      const nearestUnfilledExtension = findNearestStructure(creep, findUnfilledStructures(room, STRUCTURE_EXTENSION));
      if (nearestUnfilledExtension) {
        return transferEnergyToTarget(creep, nearestUnfilledExtension);
      }
      const nearestUnfilledContainer = findNearestStructure(creep, findUnfilledStructures(room, STRUCTURE_CONTAINER));
      if (nearestUnfilledContainer) {
        return transferEnergyToTarget(creep, nearestUnfilledContainer);
      }
      return creep.drop(RESOURCE_ENERGY) === 0;
    }
  }
};

export default harvester;

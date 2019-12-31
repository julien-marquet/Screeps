import { HarvesterState } from "types/types";
import harvest from "./actions/harvest";
import transferEnergy, { transferEnergyToTarget } from "./actions/transferEnergy";

const harvester = {
  run: (room: Room, creep: Creep) => {
    if (creep.carry.getFreeCapacity() === 0) {
      creep.memory.state = HarvesterState.Emptying;
    }
    if (creep.carry.getUsedCapacity() === 0) {
      creep.memory.state = HarvesterState.Harvesting;
    }

    if (creep.memory.state === HarvesterState.Harvesting) {
      harvest(room, creep);
    } else {
      const notFullSpawns = room.find(FIND_MY_SPAWNS, { filter: spawn => spawn.energyCapacity - spawn.energy > 0 });
      if (notFullSpawns.length > 0) {
        const nearestSpawn = _.sortBy(notFullSpawns, s => creep.pos.getRangeTo(s))[0];
        transferEnergyToTarget(creep, nearestSpawn);
      } else {
        transferEnergy(room, creep, STRUCTURE_CONTROLLER);
      }
    }
  }
};

export default harvester;

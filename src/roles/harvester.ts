import { Harvester } from "types/types";
import { spawn } from "child_process";

const harvester = {
  run: (room: Room, creep: Creep) => {
    if (creep.carry.getFreeCapacity() === 0) creep.memory["state"] = Harvester.State.Emptying;
    if (creep.carry.getUsedCapacity() === 0) creep.memory["state"] = Harvester.State.Harvesting;

    if (creep.memory["state"] === Harvester.State.Harvesting) {
      const notEmptySources = room.find(FIND_SOURCES_ACTIVE, { filter: source => source.energy });
      const nearestSource = _.sortBy(notEmptySources, s => creep.pos.getRangeTo(s))[0];
      if (!nearestSource) return;
      if (creep.harvest(nearestSource) !== 0) creep.moveTo(nearestSource.pos.x, nearestSource.pos.y);
    } else {
      const notFullSpawns = room.find(FIND_MY_SPAWNS, { filter: spawn => spawn.energyCapacity - spawn.energy > 0 });
      const nearestSpawn = _.sortBy(notFullSpawns, s => creep.pos.getRangeTo(s))[0];
      if (!nearestSpawn) return;
      if (creep.transfer(nearestSpawn, RESOURCE_ENERGY) !== 0) creep.moveTo(nearestSpawn.pos.x, nearestSpawn.pos.y);
    }
  }
};

export default harvester;

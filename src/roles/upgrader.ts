import { Upgrader } from "../types/types";
import harvest from "./actions/harvest";
import transfer from "./actions/transferEnergy";

const upgraderRole = {
  run: (room: Room, creep: Creep) => {
    if (creep.carry.getFreeCapacity() === 0) creep.memory["state"] = Upgrader.State.Emptying;
    if (creep.carry.getUsedCapacity() === 0) creep.memory["state"] = Upgrader.State.Harvesting;

    if (creep.memory["state"] === Upgrader.State.Harvesting) {
      harvest(room, creep);
    } else {
      transfer(room, creep, STRUCTURE_CONTROLLER);
    }
  }
};

export default upgraderRole;

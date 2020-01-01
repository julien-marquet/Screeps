import { UpgraderState } from "../types/types";
import retrieveEnergy from "./actions/retrieveEnergy";
import transfer from "./actions/transferEnergy";

const upgraderRole = {
  run: (room: Room, creep: Creep): boolean => {
    if (creep.carry.getFreeCapacity() === 0) {
      creep.memory.state = UpgraderState.Upgrading;
    }
    if (creep.carry.getUsedCapacity() === 0) {
      creep.memory.state = UpgraderState.RetrievingEnergy;
    }
    if (creep.memory.state === UpgraderState.RetrievingEnergy) {
      return retrieveEnergy(room, creep);
    } else {
      return transfer(room, creep, STRUCTURE_CONTROLLER);
    }
  }
};

export default upgraderRole;

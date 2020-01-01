import { BuilderState } from "../types/types";
import retrieveEnergy from "./actions/retrieveEnergy";

export default {
  run: (room: Room, creep: Creep): boolean => {
    // retrieve energy or harvest
    if (creep.carry.getFreeCapacity() === 0) {
      creep.memory.state = BuilderState.Building;
    }
    if (creep.carry.getUsedCapacity() === 0) {
      creep.memory.state = BuilderState.RetrievingEnergy;
    }
    if (creep.memory.state === BuilderState.RetrievingEnergy) {
      return retrieveEnergy(room, creep);
    } else {
      const construct = room.find(FIND_MY_CONSTRUCTION_SITES)[0];
      if (creep.build(construct) !== 0) {
        creep.moveTo(construct);
      }
      return true;
    }
  }
};

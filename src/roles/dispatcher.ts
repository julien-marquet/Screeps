import { Role, RoomInfos } from "types/types";
import harvester from "./harvester";
import upgrader from "./upgrader";

function rolesDispatcher(room: Room, roomInfos: RoomInfos) {
  for (const creep of roomInfos.ownedCreeps) {
    switch (creep.memory.role) {
      case Role.Harvester:
        harvester.run(room, creep);
        break;
      case Role.Upgrader:
        upgrader.run(room, creep);
        break;
      default:
        console.log(`No role controller found for creep ${creep.name}`);
    }
  }
}

export default rolesDispatcher;

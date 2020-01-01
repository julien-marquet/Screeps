import { Role, RoomInfos } from "types/types";
import builder from "./builder";
import harvester from "./harvester";
import upgrader from "./upgrader";

function executeRole(room: Room, creep: Creep): boolean {
  switch (creep.memory.role) {
    case Role.Harvester:
      return harvester.run(room, creep);
    case Role.Upgrader:
      return upgrader.run(room, creep);
    case Role.Builder:
      return builder.run(room, creep);
    default:
      return false;
  }
}

function rolesDispatcher(room: Room, roomInfos: RoomInfos) {
  for (const creep of roomInfos.ownedCreeps) {
    if (!executeRole(room, creep)) {
      console.log(`Role of creep ${creep.name} couldn\'t be executed properly`);
    }
  }
}

export default rolesDispatcher;

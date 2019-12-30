import { ROLE_DISTRIBUTION_TEMPLATE } from "./consts";
import { Role, RoomInfos, RoleDistribution } from "./types/types";

function getSpawnOrder(room: Room): Role[] {
  return [Role.Harvester, Role.Upgrader, Role.Builder];
}

function getRoleDistribution(ownedCreeps: Creep[]): RoleDistribution {
  const roleDistribution: RoleDistribution = { ...ROLE_DISTRIBUTION_TEMPLATE };
  for (let creep of ownedCreeps) roleDistribution[creep.memory.role]++;
  return roleDistribution;
}

function observeRoom(room: Room): RoomInfos {
  const ownedCreeps = room.find(FIND_MY_CREEPS);
  const roleDistribution = getRoleDistribution(ownedCreeps);
  const spawnOrder = getSpawnOrder(room);

  return {
    ownedCreeps,
    spawnOrder,
    roleDistribution
  };
}

export default observeRoom;

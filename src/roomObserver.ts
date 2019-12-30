import { ROLES_DISTRIBUTION_TEMPLATE } from "./consts";
import { Role, RoomInfos, RolesDistribution } from "./types/types";

function getSpawnOrder(room: Room): Role[] {
  return [Role.Harvester, Role.Upgrader, Role.Builder];
}

function getRolesDistribution(ownedCreeps: Creep[]): RolesDistribution {
  const rolesDistribution: RolesDistribution = { ...ROLES_DISTRIBUTION_TEMPLATE };
  for (let creep of ownedCreeps) rolesDistribution[creep.memory.role]++;
  return rolesDistribution;
}

function getGoalRolesDistribution(spawnOrder: Role[]): RolesDistribution {
  const rolesDistribution: RolesDistribution = { ...ROLES_DISTRIBUTION_TEMPLATE };
  for (let role of spawnOrder) rolesDistribution[role]++;
  return rolesDistribution;
}

function observeRoom(room: Room): RoomInfos {
  const ownedCreeps = room.find(FIND_MY_CREEPS);
  const rolesDistribution = getRolesDistribution(ownedCreeps);
  const spawnOrder = getSpawnOrder(room);
  const goalRolesDistribution = getGoalRolesDistribution(spawnOrder);
  const spawns = room.find(FIND_MY_SPAWNS);

  return {
    ownedCreeps,
    spawnOrder,
    goalRolesDistribution,
    rolesDistribution,
    spawns
  };
}

export default observeRoom;

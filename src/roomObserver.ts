import { ROLES_DISTRIBUTION_TEMPLATE } from "./consts";
import { Role, RolesDistribution, RoomInfos } from "./types/types";

function getSpawnOrder(room: Room): Role[] {
  return [Role.Harvester, Role.Upgrader, Role.Builder];
}

function getRolesDistribution(ownedCreeps: Creep[]): RolesDistribution {
  const rolesDistribution: RolesDistribution = { ...ROLES_DISTRIBUTION_TEMPLATE };
  for (const creep of ownedCreeps) {
    rolesDistribution[creep.memory.role]++;
  }
  return rolesDistribution;
}

function getGoalRolesDistribution(spawnOrder: Role[]): RolesDistribution {
  const rolesDistribution: RolesDistribution = { ...ROLES_DISTRIBUTION_TEMPLATE };
  for (const role of spawnOrder) {
    rolesDistribution[role]++;
  }
  return rolesDistribution;
}

function getBuildOrders() {}

function observeRoom(room: Room): RoomInfos {
  const ownedCreeps = room.find(FIND_MY_CREEPS);
  const rolesDistribution = getRolesDistribution(ownedCreeps);
  const spawnOrder = getSpawnOrder(room);
  const goalRolesDistribution = getGoalRolesDistribution(spawnOrder);
  const spawns = room.find(FIND_MY_SPAWNS);
  const buildOrders = getBuildOrders();

  return {
    goalRolesDistribution,
    ownedCreeps,
    rolesDistribution,
    spawnOrder,
    spawns
  };
}

export default observeRoom;

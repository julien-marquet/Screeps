import { ROLES_PROPERTIES } from "consts";
import { Role, RoomInfos } from "../types/types";

function generateCreepName(role: Role, spawn: StructureSpawn, room: Room) {
  return `${ROLES_PROPERTIES[role].displayName}-${spawn.name}-${room.name}-${Date.now()}`;
}

function printSpawningVisuals(visual: RoomVisual, spawning: Spawning, pos: RoomPosition): void {
  const spawningCreepRole = Game.creeps[spawning.name].memory.role;
  visual.text(`${ROLES_PROPERTIES[spawningCreepRole].displayIcon} ${spawning.remainingTime}s`, pos.x + 1, pos.y, {
    align: "left",
    font: 0.4
  });
}

function getSpawnOptions(role: Role): SpawnOptions {
  return {
    memory: ROLES_PROPERTIES[role].defaultMemory
  };
}

function controlSpawn(room: Room, roomInfos: RoomInfos) {
  const rolesToSpawn = { ...roomInfos.rolesDistribution };
  const freeSpawns = roomInfos.spawns.filter(spawn => {
    if (spawn.spawning) {
      printSpawningVisuals(room.visual, spawn.spawning, spawn.pos);
    }
    return spawn.isActive && !spawn.spawning;
  });

  for (const role of roomInfos.spawnOrder) {
    rolesToSpawn[role]--;
    if (rolesToSpawn[role] < 0) {
      for (const spawn of freeSpawns) {
        if (spawn.energy >= ROLES_PROPERTIES[role].body.energyCost) {
          const spawnStatus = spawn.spawnCreep(
            ROLES_PROPERTIES[role].body.parts,
            generateCreepName(role, spawn, room),
            getSpawnOptions(role)
          );
          if (spawnStatus !== 0) {
            console.log("Spawning failed :", spawnStatus);
          }
          return;
        }
      }
    }
  }
}

export default controlSpawn;

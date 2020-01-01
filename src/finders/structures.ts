export function findUnfilledStructures(room: Room, structureType: STRUCTURE_SPAWN): StructureSpawn[];
export function findUnfilledStructures(room: Room, structureType: STRUCTURE_CONTAINER): StructureContainer[];
export function findUnfilledStructures(room: Room, structureType: STRUCTURE_EXTENSION): StructureExtension[];
export function findUnfilledStructures(room: Room, structureType: StructureConstant): Structure[] {
  switch (structureType) {
    case STRUCTURE_SPAWN:
      return room.find(FIND_MY_SPAWNS, {
        filter: spawn => spawn.isActive && spawn.energyCapacity - spawn.energy > 0
      });
    case STRUCTURE_CONTAINER:
      return room.find(FIND_STRUCTURES, {
        filter: structure =>
          structure.structureType === STRUCTURE_CONTAINER && structure.isActive && structure.store.getFreeCapacity() > 0
      });
    case STRUCTURE_EXTENSION:
      return room.find(FIND_MY_STRUCTURES, {
        filter: structure =>
          structure.structureType === STRUCTURE_EXTENSION && structure.isActive && structure.energy < structure.energyCapacity
      });
    default:
      return [];
  }
}

export function findStructureWithEnergy(room: Room, structureType: STRUCTURE_CONTAINER): StructureContainer[];
export function findStructureWithEnergy(room: Room, structureType: StructureConstant): Structure[] {
  return room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType === STRUCTURE_CONTAINER && structure.store.energy > 0
  });
}

export function findNearestStructure<S extends Structure>(creep: Creep, structures: S[]): S | undefined {
  if (structures.length === 0) {
    return;
  }
  return _.sortBy(structures, s => creep.pos.getRangeTo(s))[0];
}

import { indexOfNearest } from "finders/generic";
import { findDroppedResourcesWorthTheTravel } from "../../finders/resources";
import { findStructureWithEnergy } from "../../finders/structures";
import harvest from "./harvest";
import retrieveResourceFromTarget from "./retrieveResourceFromTarget";
import pickup from "./pickup";

// sort sources by range and multiply score by 2 if remaining energy > creep capacity

function prioritizeEnergyStore<S extends StructureContainer>(structures: S[], creep: Creep): S | undefined {
  if (structures.length === 0) {
    return undefined;
  }
  if (structures.length === 1) {
    return structures[0];
  }
  return _.sortBy(structures, s => {
    const range = creep.pos.getRangeTo(s);
    const energyFillPercentage =
      s.store.energy >= creep.carryCapacity ? 100 : 100 - ((creep.carryCapacity - s.store.energy) * 100) / creep.carryCapacity;
    return range * (1 + energyFillPercentage / 100);
  })[0];
}

function findNearestEnergyStore(room: Room, creep: Creep): Structure | undefined {
  return prioritizeEnergyStore(findStructureWithEnergy(room, STRUCTURE_CONTAINER), creep);
}

function findNearestDroppedEnergy(room: Room, creep: Creep): Resource | undefined {
  const droppedEnergy = findDroppedResourcesWorthTheTravel(creep, room, RESOURCE_ENERGY);
  const nearestIndex = indexOfNearest(
    creep,
    droppedEnergy.map(resource => resource.pos)
  );
  if (nearestIndex === -1) {
    return undefined;
  }
  return droppedEnergy[nearestIndex];
}

export default (room: Room, creep: Creep): boolean => {
  const nearestDroppedEnergy = findNearestDroppedEnergy(room, creep);
  if (nearestDroppedEnergy) {
    return pickup(creep, nearestDroppedEnergy);
  }

  const nearestEnergyStore = findNearestEnergyStore(room, creep);
  if (nearestEnergyStore) {
    return retrieveResourceFromTarget(creep, nearestEnergyStore, RESOURCE_ENERGY);
  }

  return harvest(room, creep);
};

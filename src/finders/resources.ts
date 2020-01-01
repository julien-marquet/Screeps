export function findDroppedResourcesWorthTheTravel(creep: Creep, room: Room, resourceType: ResourceConstant): Resource[] {
  return room.find(FIND_DROPPED_RESOURCES, {
    filter: f =>
      f.resourceType === resourceType && f.amount - creep.pos.getRangeTo(f.pos.x, f.pos.y) * Math.ceil(f.amount / 1000) > 0
  });
}

export function findNearestResources<R extends Resource>(creep: Creep, resources: R[]): R | undefined {
  if (resources.length === 0) {
    return;
  }
  return _.sortBy(resources, r => creep.pos.getRangeTo(r))[0];
}

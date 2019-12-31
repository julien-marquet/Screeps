export default (room: Room, creep: Creep): Boolean => {
  const notEmptySources = room.find(FIND_SOURCES_ACTIVE, { filter: source => source.energy });
  // sort sources by range and multiply score by 2 if remaining energy > creep capacity
  const nearestSource = _.sortBy(notEmptySources, s => {
    const energyMultiplier = Number(s.energy >= creep.carryCapacity) + 1;
    const range = creep.pos.getRangeTo(s);
    return range * energyMultiplier;
  })[0];
  if (!nearestSource) return false;
  if (creep.harvest(nearestSource) !== 0) creep.moveTo(nearestSource.pos.x, nearestSource.pos.y);
  return true;
};

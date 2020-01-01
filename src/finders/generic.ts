export function indexOfNearest(creep: Creep, positions: RoomPosition[]): number {
  if (positions.length === 0) {
    return -1;
  }

  let result = 0;
  let shortestRange = creep.pos.getRangeTo(positions[0].x, positions[0].y);

  for (let i = 1; i < positions.length; i++) {
    const range = creep.pos.getRangeTo(positions[i].x, positions[i].y);
    if (range < shortestRange) {
      result = i;
      shortestRange = range;
    }
  }
  return result;
}

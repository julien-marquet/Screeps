export default (room: Room, creep: Creep, target: StructureConstant): boolean => {
  switch (target) {
    case STRUCTURE_CONTROLLER:
      return transferToController(room, creep);
    default:
      return false;
  }
};

export function transferEnergyToTarget(creep: Creep, target: Structure) {
  if (creep.transfer(target, RESOURCE_ENERGY) !== 0) {
    creep.moveTo(target.pos.x, target.pos.y);
  }
  return true;
}

function transferToController(room: Room, creep: Creep): boolean {
  if (!room.controller) {
    return false;
  }
  if (creep.transfer(room.controller, RESOURCE_ENERGY) !== 0) {
    creep.moveTo(room.controller.pos.x, room.controller.pos.y);
  }
  return true;
}

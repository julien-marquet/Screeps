export default (creep: Creep, target: Structure, resourceType: ResourceConstant): boolean => {
  if (creep.withdraw(target, resourceType) !== 0) {
    creep.moveTo(target.pos.x, target.pos.y);
  }
  return true;
};

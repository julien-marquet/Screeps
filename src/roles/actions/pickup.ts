export default (creep: Creep, resource: Resource): boolean => {
  if (creep.pickup(resource) !== 0) {
    creep.moveTo(resource);
  }
  return true;
};

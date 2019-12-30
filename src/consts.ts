import { RoleDistribution, Role } from "./types/types";
import { getValuesInEnum } from "./utils/enums";

export const ROLE_DISTRIBUTION_TEMPLATE = ((): RoleDistribution => {
  const roles = getValuesInEnum<typeof Role>(Role);
  return roles.reduce<RoleDistribution>((template, role) => {
    template[parseInt(role)] = 0;
    return template;
  }, {});
})();

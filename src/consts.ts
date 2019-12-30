import { RolesDistribution, Role, RolesInfos, RoleInfos, BodyInfos, Harvester } from "./types/types";
import { getValuesInEnum } from "./utils/enums";

export const ROLES_DISTRIBUTION_TEMPLATE = ((): RolesDistribution => {
  const roles = getValuesInEnum<typeof Role>(Role);
  return roles.reduce<RolesDistribution>((template, role) => {
    template[parseInt(role)] = 0;
    return template;
  }, {});
})();

function getBodyInfos(parts: BodyPartConstant[]): BodyInfos {
  return {
    parts,
    energyCost: parts.reduce((totalCost, part) => totalCost + BODYPART_COST[part], 0)
  };
}

export const ROLES_PROPERTIES: RolesInfos = {
  [Role.Harvester]: {
    body: getBodyInfos([WORK, CARRY, CARRY, MOVE, MOVE]),
    displayName: "Harvester",
    displayIcon: "⛏️",
    defaultMemory: {
      role: Role.Harvester,
      state: Harvester.State.Harvesting
    }
  },
  [Role.Upgrader]: {
    body: getBodyInfos([WORK, CARRY, MOVE]),
    displayName: "Upgrader",
    displayIcon: "⚡",
    defaultMemory: {
      role: Role.Upgrader
    }
  },
  [Role.Builder]: {
    body: getBodyInfos([WORK, CARRY, MOVE]),
    displayName: "Builder",
    displayIcon: "🚧",
    defaultMemory: {
      role: Role.Builder
    }
  }
};

export const BODY_PART_COST = 50;

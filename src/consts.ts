import { BodyInfos, BuilderState, HarvesterState, Role, RolesDistribution, RolesInfos, UpgraderState } from "./types/types";
import { getValuesInEnum } from "./utils/enums";

export const ROLES_DISTRIBUTION_TEMPLATE = ((): RolesDistribution => {
  const roles = getValuesInEnum<typeof Role>(Role);
  return roles.reduce<RolesDistribution>((template, role) => {
    template[parseInt(role, 10)] = 0;
    return template;
  }, {});
})();

function getBodyInfos(parts: BodyPartConstant[]): BodyInfos {
  return {
    energyCost: parts.reduce((totalCost, part) => totalCost + BODYPART_COST[part], 0),
    parts
  };
}

export const ROLES_PROPERTIES: RolesInfos = {
  [Role.Harvester]: {
    body: getBodyInfos([WORK, WORK, CARRY, MOVE]),
    defaultMemory: {
      role: Role.Harvester,
      state: HarvesterState.Harvesting
    },
    displayIcon: "⛏️",
    displayName: "Harvester"
  },
  [Role.Upgrader]: {
    body: getBodyInfos([WORK, WORK, CARRY, MOVE]),
    defaultMemory: {
      role: Role.Upgrader,
      state: UpgraderState.RetrievingEnergy
    },
    displayIcon: "⚡",
    displayName: "Upgrader"
  },
  [Role.Builder]: {
    body: getBodyInfos([WORK, CARRY, CARRY, MOVE, MOVE]),
    defaultMemory: {
      role: Role.Builder,
      state: BuilderState.RetrievingEnergy
    },
    displayIcon: "🚧",
    displayName: "Builder"
  }
};

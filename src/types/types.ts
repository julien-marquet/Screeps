export interface RoomInfos {
  spawnOrder: Role[];
  goalRolesDistribution: RolesDistribution;
  rolesDistribution: RolesDistribution;
  ownedCreeps: Creep[];
  spawns: StructureSpawn[];
}

export enum Role {
  Harvester,
  Builder,
  Upgrader
}

export enum HarvesterState {
  Harvesting,
  Tranfering
}

export enum UpgraderState {
  RetrievingEnergy,
  Upgrading
}

export enum BuilderState {
  RetrievingEnergy,
  Building
}

export interface RolesProperties<T> {
  [roleIndex: number]: T;
}

export type RolesDistribution = RolesProperties<number>;

export type RolesInfos = RolesProperties<RoleInfos>;

export interface BodyInfos {
  parts: BodyPartConstant[];
  energyCost: number;
}

export interface RoleInfos {
  body: BodyInfos;
  displayName: string;
  displayIcon: string;
  defaultMemory: CreepMemory;
}

export type CreepMemory = HarvesterMemory | UpgraderMemory | BuilderMemory;

export interface HarvesterMemory {
  role: Role.Harvester;
  state: HarvesterState;
}

export interface UpgraderMemory {
  role: Role.Upgrader;
  state: UpgraderState;
}

export interface BuilderMemory {
  role: Role.Builder;
  state: BuilderState;
}

export interface RoomInfos {
  spawnOrder: Role[];
  roleDistribution: RoleDistribution;
  ownedCreeps: Creep[];
}

export type RoleDistribution = { [roleIndex: number]: number };

export enum Role {
  Harvester,
  Builder,
  Upgrader
}

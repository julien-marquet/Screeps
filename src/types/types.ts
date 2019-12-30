export interface RoomInfos {
  spawnOrder: Role[];
  roleDistribution: RoleDistribution;
  ownedCreeps: Creep[];
}

export type RoleDistribution = { [roleIndex: string]: number };

export enum Role {
  Harvester = "HARVESTER",
  Builder = "BUILDER",
  Upgrader = "UPGRADER"
}

import { ErrorMapper } from "utils/ErrorMapper";
import controlSpawn from "./spawn/controller";
import dispatchRoles from "./roles/dispatcher";
import observeRoom from "./roomObserver";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  for (let room of Object.values(Game.rooms)) {
    const roomInfos = observeRoom(room);

    // control creeps spawn
    controlSpawn(room, roomInfos);

    // role dispatch
    dispatchRoles(room);
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});

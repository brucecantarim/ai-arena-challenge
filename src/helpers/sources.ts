//@ts-nocheck
import fighter from "../../models/fighter.fbx";
import idle from "../../animations/idle.fbx";
import run from "../../animations/run.fbx";
import punch from "../../animations/punch.fbx";
import jump from "../../animations/jump.fbx";

const sources = [
  {
    name: "fighter",
    type: "fbxModel",
    path: fighter
  },
  {
    name: "idle",
    type: "fbxModel",
    path: idle
  },
  {
    name: "run",
    type: "fbxModel",
    path: run
  },
  {
    name: "punch",
    type: "fbxModel",
    path: punch
  },
  {
    name: "jump",
    type: "fbxModel",
    path: jump
  }
];

export default sources;

import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import EventEmitter from "../helpers/event-emitter";
import sources from "./sources";

export type File = GLTF | THREE.Group | THREE.Texture;
type Source = { name: string; type: string; path: string };

export default class Resources extends EventEmitter {
  private sources: Source[];
  private toLoad: number;
  private loaded: number;
  private gltfLoader: GLTFLoader;
  private fbxLoader: FBXLoader;
  private textureLoader: THREE.TextureLoader;
  public items: { [key: string]: File };

  constructor() {
    super();

    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.gltfLoader = new GLTFLoader();
    this.fbxLoader = new FBXLoader();
    this.textureLoader = new THREE.TextureLoader();
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "fbxModel") {
        this.fbxLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source: Source, file: File) {
    this.items[source.name] = file;

    this.loaded++;
    this.trigger("itemLoaded");

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}

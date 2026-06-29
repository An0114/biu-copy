import path from "node:path";

export const ELECTRON_OUT_DIRNAME = ".electron";
export const ELECTRON_OUT_DIR = path.resolve(process.cwd(), ELECTRON_OUT_DIRNAME);
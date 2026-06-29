import fs from "node:fs/promises"
import path from "node:path"
import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import { rollup, watch, type RollupOptions, type OutputOptions, type RollupWatcher } from "rollup";
import tsconfigPaths from "rollup-plugin-tsconfig-paths";

import { logger } from "@rsbuild/core";

import { ELECTRON_OUT_DIR } from "@shared/path";

const MAIN_ENTRY = path.resolve(process.cwd(), "electron/main.ts");
const PRELOAD_ENTRY = path.resolve(process.cwd(), "electron/preload.ts");

function createRollupOption(input: string): RollupOptions {
    return {
        input,
        treeshake: true,
        external: [/node_modules/],
        plugins: [
            tsconfigPaths(),
            nodeResolve({
                extensions: [".mjs", ".js", ".ts", ".tsx", ".json"],
                exportConditions: ["node"],
                preferBuiltins: true,
            }),
            esbuild({
                platform: "node",
                target: "node18",
                tsconfig: "tsconfig.json",
                sourceMap: true,
            }),
        ],
        onwarn(warning, warn) {
            if (warning.code === "THIS_IS_UNDEFINED") {
                return;
            }
            warn(warning)
        }
    }
}

function createOutput(format: "es" | "cjs", entryName: "main" | "preload"): OutputOptions {
    return {
        dir: ELECTRON_OUT_DIR,
        format,
        sourcemap: false,

        entryFileNames: entryName === "main" ? "main.mjs" : "preload.cjs",
    };
}

async function waitForFirstBuild(watcher: RollupWatcher, entryName: "main" | "preload") {
    return new Promise<void>((resolve, reject) => {
        watcher.on("event", event => {
            if (event.code === "START") {
                logger.info(`[electron] ${entryName} config build started`);
            }else if (event.code === "ERROR") {
                logger.error(`[electron] ${entryName} config build error:`, event.error);
                reject(event.error)
            }else if (event.code === "END") {
                logger.info(`[electron] ${entryName} config build finished`)
                resolve();
            }
        })
    });
}



/**
 * electron preload无法使用esm，如果使用esm，在网页环境无法正常访问 window.electron
 * https://github.com/electron/electron/issues/40777
 */
export async function buildElectronConfig(mode: "development" | "production") {
    //独立构建 main (ESM) 与 preload (CJS)
    const mainOptions = createRollupOption(MAIN_ENTRY);
    const mainOutput = createOutput("es", "main");
    const preloadOptions = createRollupOption(PRELOAD_ENTRY);
    const preloadOutput = createOutput("cjs", "preload");

    async function ensureDir(dir: string) {
        await fs.mkdir(dir, { recursive: true }).catch(() => void 0 );
    }

    async function pathExists(p: string) {
        try {
            await fs.access(p);
            return true;
        } catch {
            return false
        }
    }

    if (mode === "development") {
        const mainWatcher = watch({ ...mainOptions, output: mainOutput});
        const preloadWatcher = watch({ ...preloadOptions, output: preloadOutput});
        await Promise.all([waitForFirstBuild(mainWatcher, "main"), waitForFirstBuild(preloadWatcher, "preload")]);
        return { mainWatcher, preloadWatcher } as unknown as RollupWatcher;
    }

    const mainBundle = await rollup(mainOptions);
    const mainWrite = await mainBundle.write(mainOutput);
    await mainBundle.close();

    const preloadBundle = await rollup(preloadOptions);
    const preloadWrite = await preloadBundle.write(preloadOutput);
    await preloadBundle.close();

    const mainFiles = mainWrite.output.map(o => o.fileName).join(", ");
    const preloadFiles = preloadWrite.output.map(o => o.fileName).join(", ")

    if (!mainFiles.includes("main.mjs")) {
        logger.warn("[electron] expected main.mjs not found in ESM build")
    }
    if (!preloadFiles.includes("preload.cjs")) {
        logger.warn("[electron] expected preload.cjs not found in CJS build")
    }
    logger.info(`[electron] bundles written to ${ELECTRON_OUT_DIR}`);

    
}
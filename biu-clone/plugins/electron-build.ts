import { logger } from "@rsbuild/core";
import { build as electronBuild } from "electron-builder"



export async function buildElectron() {
    await electronBuild({
        publish: "onTag",
        config: {
            appId: ""
        }
    })
}
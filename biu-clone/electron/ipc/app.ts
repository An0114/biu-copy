import { app, ipcMain } from "electron";
import { channel } from "./channel";


export function registerAppHandlers() {
    ipcMain.handle(channel.app.getVersion, async () => {
        return app.getVersion();
    })
}
import {contextBridge, ipcRenderer} from "electron"
import { channel } from "./ipc/channel"

const api = {
    appVersion: '0.0.0',
    getNowTime: () => {
        return new Date().toLocaleDateString()
    },
    getAppVersion: () => ipcRenderer.invoke(channel.app.getVersion),
      // 返回当前应用运行的平台（macos/windows/linux）
    getPlatform: () => {
        const platform: AppPlatForm =
        process.platform === "darwin" ? "macos" : process.platform === "win32" ? "windows" : "linux";

        return platform;
    },
}

contextBridge.exposeInMainWorld("electron", api)

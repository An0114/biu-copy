import {contextBridge, ipcRenderer} from "electron"
import { channel } from "./ipc/channel"

const api = {
    appVersion: '0.0.0',
    getNowTime: () => {
        return new Date().toLocaleDateString()
    },
    getAppVersion: () => ipcRenderer.invoke(channel.app.getVersion)
}

contextBridge.exposeInMainWorld("electron", api)

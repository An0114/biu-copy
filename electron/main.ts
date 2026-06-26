import {app, BrowserWindow } from "electron"
import isDev from "electron-is-dev"
import path from "node:path"


let mainWindow: BrowserWindow | null = null

function createWindow() {
    mainWindow = new BrowserWindow({
        title: isDev ? "Biu-dev-clone" : "Biu",
        show: true,
        hasShadow: true,
        width: 1200,
        height: 800,
        minHeight: 800,
        minWidth: 1200,
        resizable: true,
        useContentSize: true,
        center: true,
        frame: false,
        transparent: false,
        titleBarStyle: "hidden",
        titleBarOverlay: false,
        trafficLightPosition: { x: 8, y: 8},
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            webSecurity: true,
            contextIsolation: true,
            nodeIntegration: false,
            devTools: isDev
        }
    });

}

app.whenReady().then(() => {
    createWindow();
})
import {app, BrowserWindow} from "electron";
import isDev from "electron-is-dev"
import path from "node:path";


let mainWindown: BrowserWindow | null = null

function createWindow() {
    mainWindown = new BrowserWindow({
        title: isDev ? "Biu-dev-clone" : "Biu",
        show: true,
        hasShadow: true,
        width: 1200,
        height: 800,
        minWidth: 1200,
        minHeight: 800,
        resizable: true,
        useContentSize: true,
        center: true,
        frame: false,
        transparent: false,
        titleBarStyle: "hidden",
        titleBarOverlay: false,
        trafficLightPosition: { x: 8, y: 8 },
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            devTools: isDev
        },
    });

    if (isDev) {
        mainWindown.loadURL("http://localhost: 5173");
        mainWindown.webContents.openDevTools();
    }

    mainWindown.webContents.setWindowOpenHandler(() => {
        return { action: "deny"};
    });

    mainWindown.webContents.on("before-input-event", (event, input) => {
        if((input.control || input.meta) && input.key.toLowerCase() === "r") {
            event.preventDefault();
        }
    });
}

app.whenReady().then(() => {
    createWindow();
})
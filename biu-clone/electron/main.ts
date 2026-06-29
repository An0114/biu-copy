import {app, BrowserWindow} from "electron";
import isDev from "electron-is-dev"
import path from "node:path";
import { fileURLToPath } from "node:url";

// import { channel } from "./ipc/channel";
// import { registerAppHandlers } from "./ipc/app";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


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
            //接受暴露API文件
            preload: path.join(__dirname, "preload.cjs"),
            //配置安全暴露API设置
            contextIsolation: true,
            nodeIntegration: false,
            //页面使用的开发工具：isDev
            devTools: isDev
        },
    });

    if (isDev) {
        mainWindown.loadURL("http://localhost:5173");
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
    // registerAppHandlers
    createWindow();
    
})
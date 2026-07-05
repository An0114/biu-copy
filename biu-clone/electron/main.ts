import {app, BrowserWindow} from "electron";
import isDev from "electron-is-dev"
import path from "node:path";
import { fileURLToPath } from "node:url";

import { channel } from "./ipc/channel";
import { registerAppHandlers } from "./ipc/app";
import { registerIpcHandlers } from "./ipc/index";

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
        mainWindown.loadURL("http://localhost:3000");
        mainWindown.webContents.openDevTools();
    }

    mainWindown.webContents.setWindowOpenHandler(() => {
        return { action: "deny"};
    });

    mainWindown.webContents.on('before-input-event', (event, input) => {
        if((input.control || input.meta) && input.key.toLowerCase() === "r") {
            event.preventDefault();
        }
    });

    mainWindown?.on('did-finish-load', () => {
        //方式一
        const version = app.getVersion();
        console.log("【主进程终端输出】App版本号：", version);

        //方式二
        mainWindown?.webContents.executeJavaScript(`
            console.log("【窗口DevTools输出】electron真实版本：${version}");
            `);

        //方式三
        (async () => {
            const ipcVersion = await channel.app.getVersion
            console.log("【IPC通道获取版本】", ipcVersion);
        })
    })
}

app.whenReady().then(() => {
    // registerIpcHandlers({
    //     getMainWindown: () => mainWindown,
    // })
    registerAppHandlers();
    createWindow();
    
})
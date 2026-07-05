import type { BrowserWindow } from "electron";

export interface IpcHandlerProps {
    getMainWindown: () => BrowserWindow | null;
}
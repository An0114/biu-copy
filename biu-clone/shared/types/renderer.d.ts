declare global {
    type AppPlatForm = "macos" | "windows" | "linux";

    interface ElectronAPI {
        /** 获取当前应用版本 */
        getAppVersion: () => Promise<string>;
    }

    interface Window {
        electron: ElectronAPI;
    }
}

export {};
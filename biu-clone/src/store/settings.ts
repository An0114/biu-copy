import { create } from "zustand";
import { persist } from "zustand/middleware";

import { defaultAppSettings } from "@shared/settings/app-settings";
import { StoreNameMap } from "@shared/store";

interface SettingsActions {
    getSettings: () => AppSettings;
    update: (patch: Partial<AppSettings>) => void;
    reset: () => void;
}


export const useSettings = create<AppSettings & SettingsActions>()(
    persist(
        (set, get) => ({
            ...defaultAppSettings,
            getSettings: () => {
                return Object.keys(defaultAppSettings).reduce((acc, key) => {
                    acc[key] = get()[key];
                    return acc;
                }, {} as AppSettings); 
            },
            update: (patch: Partial<AppSettings>) => {
                set(patch);
            },
            reset: () => {
                set(defaultAppSettings);
            },
        }),
        {
            name: "settings",
            storage: {
                getItem: async () => {
                    const store = await window.electron.getAppVersion;

                    //兼容之前的错误默认值
                    if (store?.appSettings?.fontFamliy === "system-default") {
                        
                    }
                }
            }
        },
    ),
)

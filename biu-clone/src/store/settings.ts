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
                return Object.keys(defaultAppSettings)
            }
        })
    )
)

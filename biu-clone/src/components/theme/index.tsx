import { ThemeNameContext } from "./use-theme";

import { useEffect, useMemo, useState } from "react";

import { readableColor } from "color2k";
import { useShallow } from "zustand/react/shallow";

import { Themes } from "@/common/constants/theme";
import { hexToHsl, resolveTheme, isHex } from "@/common/utils/color"
import { useSttings } from "@/store/settings";





interface Props {
    children: React.ReactNode;
}

const Theme = ({ children }: Props) => {

    useEffect(() => {
        const root = document.documentElement;
        const themeName = resolveTheme(themeMode, systemTheme);
    }, []);

    const contextValue = useMemo(() => ({ theme: resolveTheme(themeMode, systemTheme)}), [themeMode, systemTheme])

    return (
        <main 
           className="h-screen w-screen overflow-hidden"
        >
            <ThemeNameContext value={contextValue}>{children}</ThemeNameContext>
        </main>
    );
};

export default Theme;
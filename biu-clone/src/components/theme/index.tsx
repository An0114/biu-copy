import { ThemeNameContext } from "./use-theme";

import { useEffect, useMemo, useState } from "react";

import { readableColor } from "color2k";
import { useShallow } from "zustand/react/shallow";

import { Themes } from "@/common/constants/theme";
import { hexToHsl, resolveTheme, isHex } from "@/common/utils/color"
import { useSettings } from "@/store/settings";





interface Props {
    children: React.ReactNode;
}

const Theme = ({ children }: Props) => {
    const { themeMode, fontFamily, primaryColor, borderRadius, backgroundColor } = useSettings(
        useShallow(s => ({
            themeMode: s.themeMode,
            fontFamily: s.fontFamily,
            primaryColor: s.primaryColor,
            borderRadius: s.borderRadius,
            backgroundColor: s.backgroundColor,
        })),
    );

    const [systemTheme, setSystemTheme] = useState<"light" | "dark" | undefined>(undefined);

    useEffect(() => {
        if (themeMode !== "system") {
            return;
        }

        if (typeof window == "undefined" || typeof window.matchMedia !== "function") {
            setSystemTheme(undefined);
            return;
        }

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark");

        const applyTheme = (matches: boolean) => {
            setSystemTheme(matches? "dark": "light");
        };

        applyTheme(mediaQuery.matches)

        const mediaQueryHandler = (event: MediaQueryListEvent) => {
            applyTheme(event.matches);
        };

        mediaQuery.addEventListener("change", mediaQueryHandler);

        return () => {
            mediaQuery.removeEventListener("change", mediaQueryHandler);;
        };
    }, [themeMode]);

    useEffect(() => {
        const root = document.documentElement;
        const themeName = resolveTheme(themeMode, systemTheme);

        root.classList.remove("light", "dark");
        root.classList.add(themeName);
        root.style.colorScheme = themeName;

        const rootStyle = root.style;
        const _primaryColor = isHex(primaryColor) ? primaryColor : (Themes[themeName].colors?.primary as string);
        const _backgroundColor = isHex(backgroundColor)
          ? backgroundColor
          : (Themes[themeName].colors?.background as string);

        if (_primaryColor) {
          rootStyle.setProperty("--heroui-primary", hexToHsl(_primaryColor));
        }
        if (_backgroundColor) {
          rootStyle.setProperty("--heroui-background", hexToHsl(_backgroundColor));
          const fgHex = readableColor(_backgroundColor);
          rootStyle.setProperty("--heroui-foreground", hexToHsl(fgHex));
        }
        rootStyle.setProperty("--heroui-radius-medium", `${borderRadius}px`);

        const validFontFamily = fontFamily === "system-default" ? "system-ui" : fontFamily;
        rootStyle.fontFamily = validFontFamily || rootStyle.fontFamily;
    }, [fontFamily, primaryColor, borderRadius, themeMode, systemTheme, backgroundColor]);

    const contextValue = useMemo(() => ({ theme: resolveTheme(themeMode, systemTheme)}), [themeMode, systemTheme]);

    return (
        <main 
           className="h-screen w-screen overflow-hidden"
        >
            <ThemeNameContext value={contextValue}>{children}</ThemeNameContext>
        </main>
    );
};

export default Theme;
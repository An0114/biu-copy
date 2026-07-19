type ThemeMode = "light" | "dark" | "system";
type PageTransition = "none" | "fade" | "sliden" | "scale" | "slideup";
type ProxyType = "none" | "http" | "socks4" | "socks5";
type AudioQuality = "auto" | "lossless" | "high" | "medium" | "low";

interface ProxySettings {
    type: ProxyType;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
}


interface AppSettings {
    fontFamily: string;
    primaryColor: string;

    /**自定义背景色（为空表示使用主题默认） */
    backgroundColor: string;
    borderRadius: number;
    downloadPath?: string;
    closeWindowOption: "hide" | "exit";
    autoStart: boolean;
    audioQuality: AudioQuality;
    hiddenMenuKeys: string[];
    displayMode: "list" | "card" | "compact";
    ffmpegPath?: string;
    themeMode: ThemeMode;
    pageTransition: PageTransition;
    showSearchHistory: boolean;
    proxySettings: ProxySettings;
    sideMenuCollapsed: boolean;
    sideMenuWidth: number;
    sideMenuCollectionFolded: {
        created: boolean;
        collected: boolean;
    };
    reportPlayHistory: boolean;
    localMusicDirs: string[];
}

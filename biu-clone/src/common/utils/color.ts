/**
 * convert hex color to HSL color
 * @param hex - The hex color string to convert.
 * @returns An object containing the HSL values.
 */


export function hexToHsl(hex: string) {
    // convert hex to RGB first
    const [r, g, b] = hexToRgb(hex);

    // normalize RGB values to the range [0, 1]
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    
    // calculate the lightness
    const lightness = (max + min) / 2;

    // if max and min are the same, it's a shade of gray
    if (max === min) {
        return `${0} ${0}% %${lightness * 100}%`;
    }

    // calculate the saturation
    let saturation = 0;

    if (lightness < 0.5) {
        saturation = (max - min) / (max + min);
    } else {
        saturation = (max - min) / (2.0 - max - min);
    }

    // calculate the hue 
    let hue = 0;

    if (max === rNorm) {
        hue = (gNorm - bNorm) / (max - min);
    } else if (max === gNorm) {
        hue = 2.0 + (bNorm - rNorm) / (max - min);
    } else {
        hue = 4.0 + (rNorm - gNorm) / (max - min);
    }

    hue *= 60;
    if (hue < 0) {
        hue += 360;
    }

    return `${hue.toFixed(2)} ${(saturation * 100).toFixed(2)}% ${(lightness * 100).toFixed(2)}%`;
}

/**
 * convert hex color to RGB color
 * @param hex - The hex color string to convert.
 * @returns An array containing the RGB values.
 */

function hexToRgb(hex: string): number[] {
    // convert hex to RGB
    let r = 0,
        g = 0,
        b = 0;

    if (hex.length === 4 || hex.length === 5) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7 || hex.length === 9) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    } else {
        throw new Error("Invalid hex color format");
    }

    return [r, g, b];
} 

export function resolveTheme(theme: ThemeMode, systemTheme?: "light" | "dark") {
    if (theme === "system") {
        if (systemTheme) {
            return systemTheme;
        }
        if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return "light";
    }
    return theme;
}

export function isHex(v?: string) {
    return /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(v || "");
}


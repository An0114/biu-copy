import { defineConfig } from "@rsbuild/core";
// import { pluginReact } from "@rsbuild/plugin-react";
// import { pluginSvgr } from "@rsbuild/plugin-svgr";

import { buildElectronConfig } from "./plugins/electron-config-build";


export default defineConfig({
    plugins: [
        {
            name: "electron-build",
            setup(api) {
                api.onAfterStartDevServer(async () => {
                    await buildElectronConfig("development");
                });
            },
        },
    ],
});


// export default defineConfig({
//     output: {
//         distPath: {
//             root: "./dist/web",
//         },
//         //生产环境相对路径，保证通过 file：// 加载时静态资源能够正确引用
//         assetPrefix: "./",
//         cleanDistPath: true,
//     },
//     performance: {
//         removeMomentLocale: true,
//     },
//     html: {
//         template: "./src/index.html"
//     },
//     plugins: [
//         pluginReact(),
//         pluginSvgr({
//             svgrOptions: {
//                 exportType: "named",
//                 // Enable SVGO to optimize inline SVGs
//                 svgo: true,
//                 svgoConfig: {
//                     plugins: [
//                         {
//                             name: "preset-default",
//                             params: { overrides: { removeViewBox: false} },
//                         },
//                     ],
//                 },
//             },
//         }),
        
//     ],
//     dev: {
//         writeToDisk: true,
//         lazyCompilation: false,
//         cliShortcuts: false,
//         //开发环境相对路径，保证通过 file:// 加载时静态资源能够正确引用
//         assetPrefix: "./"
//     },
//     server: {
//         port: 5678,
//         strictPort: false,
//         printUrls: false,
//         open: false,
//         compress: false
//     },
// });
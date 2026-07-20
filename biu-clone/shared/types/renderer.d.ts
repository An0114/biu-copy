declare global {
    type AppPlatForm = "macos" | "windows" | "linux";

    type StoreName = keyof StoreDataMap;

    interface ElectronAPI {
        /** 获取当前应用版本 */
        getAppVersion: () => Promise<string>;
        /** 获取指定name的存储值 */
        getStore: <N extends StoreName>(name: N) => Promise<StoreDataMap[N]> | undefined
        /** 设置指定name的存储值 */
        setStore: <N extends StoreName>(name: N, value: StoreDataMap[N]) => Promise<void>
        /** 清楚指定name的存储值 */
        clearStore: (name: StoreName) => Promise<void>;
        /** 打开系统目录选择对话框，返回选中的目录路径 */
        /** 显示指定路径的文件 */
        /** 打开系统文件选择对话框， 返回选中的文件路径 */
        /** 打开本地目录 */
        /** 在外部浏览器打开连接 */
        /** 获取本地安装的字体列表 */
        /** 导航到指定路由 */
        /** 获取某个 cookie */
        /** 设置 cookie */
        /** 搜索网易云歌曲 */
        /** 获取网易云歌词 */
        /** 在 LrcLib 搜索歌曲/歌词 */
        /** 获取当前应用平台 */
        /** 更新网络代理设置 */
        /** 上报当前播放状态到主进程 */
        /** 订阅主进程下发的快捷指令 */
        /** 注册快捷键， 返回是否注册成功 */
        /** 注销指定快捷键 */
        /** 注册所有快捷键 */
        /** 注销所有快捷键 */
        /** 订阅主进程下发的播放器命令 */
        /** 判断是否为开发模式 */
        /** 是否支持自动更新 */
        /** 检查更新 */
        /** 监听应用更新下载进度 */
        /** 下载更新 */
        /** 监听应用更新下载进度 */
        /** 安装更新 */
        /** 切换 mini/主窗口 */
        /** 最小化窗口 */
        /** 最大化/还原窗口 */
        /** 关闭窗口 */
        /** 判断窗口是否最大化 */
        /** 监听窗口最大化状态变化 */
        /** 判断窗口是否全屏 */
        /** 监听窗口全屏状态变化 */
        /** 切换开发者工具 */
        /** 获取下载任务列表 */
        /** 同步下载任务列表 */
        /** 添加下载任务 */
        /** 添加下载任务列表 */
        /** 暂停下载任务 */
        /** 恢复下载任务 */
        /** 取消下载任务 */
        /** 清楚下载任务列表 */
        /** 重试下载任务 */
        /** 扫描本地音乐文件 */
        /** 删除本地音乐文件 */
    }

    interface Window {
        electron: ElectronAPI;
    }
}

export {};
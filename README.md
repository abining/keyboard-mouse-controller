# macos-keyboard-mouse-controller

一个用于 macOS 系统的命令行工具，可以监听键盘事件并控制鼠标（触控板）移动。

## 功能特点

- 全局键盘事件监听
- 鼠标/触控板移动控制
- 命令行界面
- 可配置的按键映射
- 支持自定义动作

## 安装

```bash
npm install -g macos-keyboard-mouse-controller
```

## 使用方法

```bash
# 启动监听
kmc start

# 配置按键映射
kmc config

# 查看帮助
kmc --help
```

## 配置示例

```json
{
  "keyMappings": {
    "ctrl+alt+up": "mouse-up",
    "ctrl+alt+down": "mouse-down",
    "ctrl+alt+left": "mouse-left",
    "ctrl+alt+right": "mouse-right"
  }
}
```

## 开发

```bash
# 克隆仓库
git clone https://github.com/yourusername/macos-keyboard-mouse-controller.git

# 安装依赖
npm install

# 运行测试
npm test

# 构建
npm run build
```

## 技术栈

- Node.js
- robotjs - 用于鼠标控制
- node-global-key-listener - 用于键盘事件监听
- commander - 命令行界面
- TypeScript - 类型安全

## 注意事项

- 本工具仅支持 macOS 系统
- 需要授予辅助功能权限
- 建议在使用前备份重要数据

## 许可证

MIT 
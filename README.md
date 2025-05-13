# macOS 键盘鼠标控制器

一个用于 macOS 的键盘鼠标控制工具，支持记录鼠标点击位置和键盘快捷键控制。

## 功能特性

- 记录鼠标点击位置
- 支持多屏幕配置
- 键盘快捷键控制鼠标移动
- CSV 格式导出点击记录

## 安装

```bash
npm install -g keyboard-mouse-controller-macos
```

## 使用方法

### 1. 记录鼠标点击位置

```bash
# 使用默认文件名记录鼠标点击
kmc record

# 指定输出文件记录鼠标点击
kmc record --output my-clicks.csv
```

记录的数据将保存为 CSV 格式，包含以下字段：
- timestamp: 时间戳
- x: X 坐标
- y: Y 坐标
- click_count: 点击次数
- screen_id: 屏幕 ID（0 为副屏，1 为主屏）

### 2. 键盘控制功能

```bash
# 启动键盘控制
kmc keyboard

# 停止键盘控制
kmc keyboard --stop
# 或
kmc keyboard -s
```

键盘控制功能支持以下快捷键：
- Option + Q: 在屏幕之间切换鼠标位置
  - 第一次按下：移动到副屏中心
  - 第二次按下：移动到主屏中心
  - 以此类推

### 3. 其他命令

```bash
# 显示版本信息
kmc --version

# 显示帮助信息
kmc --help

# 显示特定命令的帮助信息
kmc record --help
kmc keyboard --help
```

## 开发

### 环境要求

- Node.js >= 14
- npm >= 6
- macOS 操作系统

### 安装依赖

```bash
npm install
```

### 构建

```bash
npm run build
```



## 注意事项

1. 首次运行时可能需要授予辅助功能权限
2. 确保已正确配置多屏幕设置
3. 使用 Ctrl+C 可以随时停止记录或键盘控制

## 许可证

MIT 
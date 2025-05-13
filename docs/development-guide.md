# macOS 键盘鼠标控制器开发指南

## 目录
1. [环境准备](#环境准备)
2. [项目初始化](#项目初始化)
3. [开发流程](#开发流程)
4. [测试](#测试)
5. [发布流程](#发布流程)
6. [常见问题](#常见问题)

## 环境准备

### 1. 安装必要的工具
```bash
# 安装 Node.js (推荐使用 nvm 管理 Node.js 版本)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 16
nvm use 16

# 安装 Git
brew install git

# 安装 Visual Studio Code (推荐编辑器)
brew install --cask visual-studio-code
```

### 2. 配置 Git
```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

## 项目初始化

### 1. 创建项目目录
```bash
mkdir macos-keyboard-mouse-controller
cd macos-keyboard-mouse-controller
```

### 2. 初始化 Git 仓库
```bash
git init
```

### 3. 创建 .gitignore 文件
```bash
node_modules/
dist/
.DS_Store
*.log
```

### 4. 初始化 npm 项目
```bash
npm init -y
```

### 5. 安装开发依赖
```bash
npm install --save-dev typescript @types/node ts-node nodemon
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint
npm install --save-dev jest @types/jest ts-jest
```

### 6. 配置 TypeScript
创建 `tsconfig.json`：
```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

## 开发流程

### 1. 项目结构
```
macos-keyboard-mouse-controller/
├── src/
│   ├── index.ts          # 入口文件
│   ├── keyboard.ts       # 键盘监听模块
│   ├── mouse.ts          # 鼠标控制模块
│   └── config.ts         # 配置管理模块
├── tests/                # 测试文件
├── docs/                 # 文档
├── package.json
├── tsconfig.json
└── README.md
```

### 2. 开发步骤
1. 创建基本模块结构
2. 实现键盘监听功能
3. 实现鼠标控制功能
4. 实现配置管理
5. 实现命令行界面

### 3. 代码规范
- 使用 ESLint 进行代码检查
- 遵循 TypeScript 最佳实践
- 编写清晰的注释
- 保持代码简洁

## 测试

### 1. 单元测试
```bash
# 运行测试
npm test

# 运行测试覆盖率报告
npm test -- --coverage
```

### 2. 手动测试
- 测试键盘监听功能
- 测试鼠标控制功能
- 测试配置管理
- 测试命令行界面

## 发布流程

### 1. 准备发布
1. 更新版本号
```bash
npm version patch  # 小版本更新
npm version minor  # 中版本更新
npm version major  # 大版本更新
```

2. 更新 CHANGELOG.md
3. 更新 README.md
4. 运行测试确保一切正常

### 2. 发布到 npm
1. 登录 npm
```bash
npm login
```

2. 发布包
```bash
npm publish
```

### 3. 发布到 GitHub
1. 创建 GitHub 仓库
2. 推送代码
```bash
git add .
git commit -m "准备发布 v1.0.0"
git tag v1.0.0
git push origin main --tags
```

## 常见问题

### 1. 权限问题
- macOS 需要授予辅助功能权限
- 确保有足够的系统权限

### 2. 依赖问题
- 确保所有依赖都正确安装
- 检查版本兼容性

### 3. 发布问题
- 确保 npm 账号已登录
- 检查包名是否可用
- 确保版本号正确

### 4. 调试技巧
- 使用 `console.log` 进行调试
- 使用 VS Code 调试器
- 查看错误日志

## 维护指南

### 1. 版本管理
- 遵循语义化版本
- 保持更新日志
- 及时修复 bug

### 2. 文档维护
- 保持文档更新
- 添加使用示例
- 更新常见问题

### 3. 社区维护
- 回复 issue
- 处理 PR
- 收集用户反馈 
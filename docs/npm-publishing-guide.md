# NPM 包发布指南

## 目录
1. [准备工作](#准备工作)
2. [包的基本要求](#包的基本要求)
3. [发布流程](#发布流程)
4. [版本管理](#版本管理)
5. [包维护](#包维护)

## 准备工作

### 1. 注册 NPM 账号
1. 访问 [npmjs.com](https://www.npmjs.com)
2. 点击 "Sign Up" 注册账号
3. 验证邮箱

### 2. 配置 NPM
```bash
# 设置 npm 源（推荐使用官方源）
npm config set registry https://registry.npmjs.org/

# 淘宝
npm config set registry https://registry.npmmirror.com/
# 登录 npm
npm login
```

### 3. 检查包名可用性
```bash
# 检查包名是否可用
npm search keyboard-mouse-controller-macos
```

## 包的基本要求

### 1. package.json 必要字段
```json
{
  "name": "keyboard-mouse-controller-macos",
  "version": "1.0.0",
  "description": "包描述",
  "main": "dist/index.js",
  "bin": {
    "kmc": "./dist/index.js"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "keywords": ["macos", "keyboard", "mouse"],
  "author": "你的名字",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/username/repo.git"
  },
  "bugs": {
    "url": "https://github.com/username/repo/issues"
  },
  "homepage": "https://github.com/username/repo#readme"
}
```

### 2. 文件结构
```
package/
├── dist/           # 编译后的文件
├── src/            # 源代码
├── tests/          # 测试文件
├── docs/           # 文档
├── package.json
├── README.md
└── LICENSE
```

### 3. 必要文件
- README.md：详细的使用说明
- LICENSE：开源许可证
- .gitignore：Git 忽略文件
- .npmignore：NPM 忽略文件

## 发布流程

### 1. 构建项目
```bash
# 清理旧的构建文件
rm -rf dist/

# 运行测试
npm test

# 构建项目
npm run build
```

### 2. 检查发布内容
```bash
# 查看将要发布的文件
npm pack --dry-run
```

### 3. 发布包
```bash
# 发布到 npm
npm publish

# 如果是第一次发布，添加 --access public
npm publish --access public
```

## 版本管理

### 1. 语义化版本
- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 2. 更新版本
```bash
# 更新修订号 (0.0.x)
npm version patch

# 更新次版本号 (0.x.0)
npm version minor

# 更新主版本号 (x.0.0)
npm version major
```

### 3. 版本标签
```bash
# 发布测试版本
npm publish --tag beta

# 安装测试版本
npm install package-name@beta
```

## 包维护

### 1. 更新包
1. 修改代码
2. 更新版本号
3. 更新 CHANGELOG.md
4. 运行测试
5. 发布新版本

### 2. 废弃包
```bash
# 标记包为废弃
npm deprecate package-name "请使用新包 xxx 替代"
```

### 3. 删除包
```bash
# 删除特定版本
npm unpublish package-name@1.0.0

# 删除整个包（24小时内）
npm unpublish package-name --force
```

## 最佳实践

### 1. 文档
- 提供清晰的使用说明
- 包含代码示例
- 列出所有配置选项
- 提供常见问题解答

### 2. 测试
- 编写单元测试
- 提供测试覆盖率报告
- 包含集成测试

### 3. 安全性
- 定期更新依赖
- 检查安全漏洞
- 使用 `npm audit` 检查

### 4. 性能
- 优化包大小
- 使用 `files` 字段控制发布内容
- 提供按需加载选项

## 常见问题

### 1. 发布失败
- 检查包名是否可用
- 确认 npm 登录状态
- 检查版本号是否重复

### 2. 权限问题
- 确认是否有发布权限
- 检查组织权限设置
- 验证 2FA 状态

### 3. 依赖问题
- 检查依赖版本兼容性
- 使用 `peerDependencies` 声明
- 处理依赖冲突 
# MemVault 实现计划

## 项目概述

MemVault 是一个将个人记忆转化为科幻故事的应用程序。用户可以通过文本或图片上传记忆，然后使用 AI 技术将其转化为各种科幻风格的故事。

## 技术栈

- **前端**：Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **后端**：Next.js API Routes, Prisma, PostgreSQL
- **认证**：NextAuth.js
- **AI**：OpenAI API
- **部署**：Vercel

## 实现阶段

### 阶段 1：项目设置和基础架构

- [x] 创建 Next.js 项目
- [x] 设置 TypeScript
- [x] 配置 Tailwind CSS
- [x] 设置 ESLint 和 Prettier
- [x] 创建项目结构
- [x] 设置 Prisma 和数据库模型
- [x] 配置 NextAuth.js

### 阶段 2：核心功能实现

- [x] 实现用户认证
- [x] 创建记忆上传功能
- [x] 实现记忆转换功能
- [x] 开发记忆画廊
- [x] 创建个人资料页面

### 阶段 3：UI/UX 优化

- [x] 设计响应式布局
- [x] 添加动画效果
- [x] 优化加载状态
- [x] 实现错误处理
- [x] 添加用户反馈

### 阶段 4：测试和部署

- [ ] 编写单元测试
- [ ] 进行用户测试
- [ ] 修复 bug 和优化性能
- [ ] 部署到 Vercel
- [ ] 监控和分析

## 数据库模型

### User
- id: String (主键)
- name: String?
- email: String? (唯一)
- emailVerified: DateTime?
- image: String?
- accounts: Account[]
- sessions: Session[]
- memories: Memory[]

### Memory
- id: String (主键)
- title: String
- content: String
- type: String ('text' 或 'image')
- createdAt: DateTime
- updatedAt: DateTime
- userId: String (外键)
- user: User
- transformations: Transformation[]

### Transformation
- id: String (主键)
- style: String
- content: String
- imageUrl: String?
- createdAt: DateTime
- memoryId: String (外键)
- memory: Memory

## API 端点

### 认证
- `/api/auth/[...nextauth]` - NextAuth.js 认证

### 记忆
- `GET /api/memories` - 获取用户的所有记忆
- `POST /api/memories` - 创建新记忆

### 转换
- `POST /api/transform` - 将记忆转换为科幻故事

## 页面路由

- `/` - 首页
- `/auth/signin` - 登录页面
- `/upload` - 上传记忆页面
- `/gallery` - 记忆画廊页面
- `/profile` - 用户个人资料页面

## 未来计划

- 添加记忆标签和分类
- 实现记忆分享功能
- 添加更多科幻风格选项
- 集成图像生成 AI
- 开发移动应用 
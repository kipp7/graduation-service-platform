# 🎓 毕设助手 - 订单管理系统

一个基于 Next.js 15 + PostgreSQL 的全栈订单管理平台，支持订单追踪、支付管理、管理员后台等功能。

## ✨ 功能特性

### 🛒 订单管理
- ✅ 在线下单系统
- ✅ 订单状态追踪
- ✅ 手机号/订单号查询
- ✅ 进度可视化

### 💳 支付系统
- ✅ 30分钟支付倒计时
- ✅ 自动过期订单处理
- ✅ 支付状态实时更新
- ✅ 多种支付方式展示

### 👨‍💼 管理后台
- ✅ 订单列表管理
- ✅ 支付状态确认
- ✅ 订单删除功能
- ✅ 搜索过滤

### 🎨 设计特色
- ✅ Linear风格设计
- ✅ 响应式布局
- ✅ 中文字体优化
- ✅ 现代化交互

## 🛠 技术栈

- **前端框架**: Next.js 15 (App Router)
- **UI组件**: Tailwind CSS v4 + Radix UI
- **数据库**: PostgreSQL + Prisma ORM
- **部署平台**: Vercel
- **开发语言**: TypeScript

## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone <your-repo-url>
cd graduation-service-platform

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，配置数据库等信息

# 生成数据库
npx prisma db push

# 启动开发服务器
npm run dev
```

### Vercel 部署

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量：
   - `DATABASE_URL`: PostgreSQL 连接串
   - `JWT_SECRET`: JWT 加密密钥
4. 自动部署完成

## 📊 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── api/               # API 路由
│   ├── order/             # 下单页面
│   ├── payment/           # 支付页面
│   ├── tracking/          # 订单追踪
│   └── admin/             # 管理后台
├── components/            # 通用组件
├── lib/                   # 工具函数
└── types/                 # TypeScript 类型定义
```

## 🔧 环境变量

```env
# 数据库配置
DATABASE_URL="postgresql://..."

# JWT 密钥
JWT_SECRET="your-secret-key"

# 环境标识
NODE_ENV="production"
```

## 📝 API 文档

### 订单相关
- `POST /api/orders` - 创建订单
- `GET /api/orders` - 获取订单列表
- `GET /api/orders/[id]` - 获取订单详情
- `DELETE /api/orders/[id]` - 删除订单

### 支付相关
- `POST /api/payment/confirm` - 确认支付
- `GET /api/payment/status/[orderNumber]` - 查询支付状态

### 追踪相关
- `GET /api/tracking/[orderNumber]` - 订单号查询
- `GET /api/tracking/phone/[phone]` - 手机号查询

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

[MIT License](LICENSE)

---

**🎯 生产就绪的订单管理系统，立即部署到 Vercel！**
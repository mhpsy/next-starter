## 初始化

eslint 直接用antfu的
尝试接口 玩一玩
添加了个blog试一试

---

添加了i18n支持 使用的是next/intl
使用的路径配置/en/about, /zh-cn/about,这种的好处是 搜索引擎会根据路径来判断语言 有利于seo
link要使用@/i18n/navigation.ts 中的Link
配置过程很简单，就按照文档来就行
如果增加语言需要
1. 修改locales.ts 的locales数组
2. 修改minddleware.ts中的正则

---
iconify 使用的是tailwind4 的插件
---

### todo
 - [X] vitest 测试用例
 - [ ] prisma: seed
 - [X] 引入日志库
 - [ ] swr全局封装
 - [x] useForm
 - [x] login and signup
 - [ ] 前后端统一的错误处理 error handle
 - [ ] 项目结构好乱啊
 - [ ] authjs的适配器，数据库用prisma，session用redis，要自己写一个
 - [ ] dashboard的整体布局
 - [ ]

## docker

很完善的 docker 支持

## prisma
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"

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

### todo
iconify
docker
黑夜模式

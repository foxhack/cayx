# pfsweb

> The frontend for personal finacial service project of changan weixin

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 开发环境浏览器中调试
修改author.vue 中的code为固定值
修改api/config.js中的backServerBaseUrl


#上生产，路由改为history模式
修改router/index.js,打开mode

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


#成功提示信息显示后的确定处理
register注册组件：用currentPath是否等于该组件的path来判断组件是做为component/router使用
1.作为router时，如果注册成功，则显示result组件，并提供两个可选择的链接（完善用户中心，浏览产品列表）
2.作为component时，如果注册成功，则用弹出消息的形式提示，是否还显示该component，由父组件控制

newbank开户组件:
1.作为router时，该组件目前不支持
2.作为component时，有几种进入方式
/user -> /user/bank：开户成功后，显示result组件，确定后父组件通过状态控制是否将其关闭
/user/account -> /user/bank：同上
/products/transaction -> /user/bank：同上

newpassword设置密码组件：
1.作为router时，该组件目前不支持
2.作为component时，有几种进入方式
在/user/bank里使用，显示result组件，确定后通过父组件控制是否将其关闭
在/user/passwordsetting里使用，显示result组件，确定后通过发送关闭事件，通知父组件将其关闭
在/user/bank里使用

# vue_element
使用vue的技术栈写的vue开发框架
本意是构建一个vue的全套餐开发环境的demo，通过借鉴vue史上最牛的[开源框架](https://github.com/bailicangdu/vue2-elm)而来，学习的记录项目，感谢这些伟大的开源大神。

# 技术栈


vue2 + vuex + vue-router + axios + webpack + ES6/7  + sass + flex + iconfont +babel


# 项目运行

使用的新特性需要运行在node版本>6

```
git clone https://github.com/qq781548819/vue_element.git

cd vue_element

//网速不行推荐使用[cnpm](http://npm.taobao.org/)
npm install

//或使用yarn，一样设置淘宝源
yarn更换下载源
// 查看下载源
yarn config get registry
// 更换为淘宝源
yarn config set registry https://registry.npm.taobao.org
// 初始化项目
yarn init -y
// 安装webpack
yarn add webpack
// 更新到最新的
yarn upgrade webpack
// 安装项目里的依赖
yarn install

# 开发环境
npm run start
访问 http://localhost:8080/

# 打包
npm run build

# 实际环境
cd dist
//使用node搭建的小型服务器
node app.js
访问 http://localhost:3001/
```

# 效果演示

[查看demo请戳这里](http://120.77.83.195:3001/#/)（请用chrome手机模式预览）

# 页面布局

采用scss配合[轻量级flex框架](http://lzxb.name/flex.css/)，实现快速布局

# 网络请求

使用vue作者尤大推荐的axios，封装token授权验证，服务器响应数据结构解构等，之后会封装个全局状态信息页，动态展示异常状况。
使用async/await方案，同步流写法。[大牛](https://github.com/bailicangdu)，我偶像啊，我也好想像他一样用javascript实现，全端项目，有空的读者可以帮我看看我封装的[node开发框架]()




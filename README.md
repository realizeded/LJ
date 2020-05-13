# MVVM框架LJ
##实现意义
更好的理解vue源码,唯有实践出真知。
## 实现功能
* 1.数据代理
* 2.数据劫持+发布订阅实现响应式功能
* 3.单项数据绑定以及双向数据绑定
## api
* 1.LJ-on
* 2.LJ-text
* 3.LJ-html
* 4.LJ-show
* 5.LJ-on
* 5.插值表达式
## 不同点
* 模板编译 - vue(正则) - LJ(操纵节点以及节点属性)
## 搭建 
lib目录下为LJ代码.为了更好的开发,使用webpack模块打包器,
可以区分环境(开发、生产)进行打包。  

## 使用
````
<body>
<div id="app">
    LJ-html:<div LJ-html="msg"></div>
    LJ-text:<div LJ-text="msg"></div>
    LJ-model<input type="text" LJ-model="msg">
    插值表达式<div>{{msg}}</div>
    LJ-show <div LJ-show="msg">方块</div>
    LJ-on <div LJ-on:click="func">方块</div>
</div>
</body>
````
index.js
````
import LJ from "./lib/instance/index.js";
window.vm = new LJ({
  el:"#app",
  data:{
      msg:'344'
  },
  methods:{
      func() {
          console.log('ess')
      }
  }
});
````




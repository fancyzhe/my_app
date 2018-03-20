**居民水电收费系统。**

MySQL + node + react + material-ui项目文件。下载项目文件后，初始化文件（yarn或者npm i）再启动文件（yarn start或npm start）

xmind文件是整个项目的思维导图和表结构

命令行中 create-react-app 初始化项目文件
     
     
前端部分：

    代码命名规范：
        
        common文件夹中存放公共组件或者方法（以下划线的方式命名js）
              
               --|  admin_btn 是系统操作按钮（退出登陆、重新登陆）
               --|  bottom_nav  底部系统导航栏
               --|  utils 常用方法
               
        public文件夹中放常用的界面js
                
               --| admin文件夹是管理员
               --| login是登陆界面
               --| user是用户


    分支规范：

       常用分支以 f-xxxx 的格式，修复bug分支为 bg-xxx  的格式
       
       f-login 开发登陆界面分支
       f-user 开发用户界面分支
       f-admin 开发管理员界面分支
        
    将用户名和密码权限保存在sessionStorage中
       
后端部分：
      nodeJS写接口，用supervisor搭建了node的热更新。
      命令 npm run server 启动后端服务器
      
      开发分支f-dao
      
      接口部分
            -| '/login_post'登陆接口
            -| '/getCost'获取水电费列表 
            -| '/getTown'获取小区列表
            -| '/getUser'获取用户信息列表
            -| '/getPro'获取省份列表
            -| '/getCity'获取市列表
            -| '/getTownId'获取小区ID
            -| '/addTown'添加小区
     
      
      
      
      
遇到的问题（印象比较深）

       1.react-router的版本。按照网上很多的教程一点一点去做的时候，就存在版本不同的问题。
       网上的教程大多数是在react-router@3，但开始项目的时候，直接creact-react-app，
       获取的是react-router的最新版本。在公司学习开发的时候还没接触过版本不同引发的问题，
       因为公司已经将自己要用的依赖封装好了。也提供直接的package.json文件，
       直接npm init初始化文件就可以。
       2.封装组件。自己封装组件，在子组件与父组件传值。
       3.在刚开始使用nodejs+mysql的时候还是很不习惯，现在的开发思路是将所有的接口编写放在server.js一个文件里面，暂时不考虑性能和代码阅读问题。
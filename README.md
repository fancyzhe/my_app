**居民水电收费系统。**

react项目文件

xmind文件是整个项目的思维导图


命令行中 create-react-app 初始化项目文件

安装修改文档title插件 react-document-title

     npm install --save react-document-title   
     
     


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
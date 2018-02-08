/**
 *
 * @fanz
 */
//请求所需模块
let http = require("http");
let mysql = require("mysql");
let url = require("url");
let querystring = require("querystring");
let redis = require('redis');

//定义连接对象
let connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"test",
    port:3306
});

//查询userinfo表并赋予users对象。
connection.query('select * from userinfo;',function(error,rows,fields){
    users = rows;
});

//创建服务器
http.createServer(function(req,res){
    // 设置接收数据编码格式为 UTF-8
    req.setEncoding('utf-8');
    //定义数据块
    let postData = "";
    // 数据块接收中
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        //把接收到的字符串转为对象
        let params = querystring.parse(postData);
        //验证用户名密码
        let resStr = login.checkLogin(params,users);
        setTimeout(function(){
            //对客户端返回数据
            res.end(JSON.stringify(resStr));
        },100);
    });
}).listen(6868);
//定义users集合
let users = {};
//对function添加公共方法addmethod方法。此方法用来添加方法。添加方法如下
Function.prototype.addMethod = function(name,fn){
    this[name] = fn;
    return this;
};
//定义login函数
let login = function(){};
//对login函数添加checkLogin方法。
login.addMethod("checkLogin",function(user,users){
    for (let i = users.length - 1; i >= 0; i--) {
        if(user.username === users[i].username && user.password === users[i].password){
            return true;
        }
    }
    return false;
});
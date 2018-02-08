/**
 *
 * @fanz
 */

//启动后端服务器node

start();//连接数据库

function connet() {

    let express = require('express');

    let mysql = require('mysql');

    let app = express();

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
        next();
    });

    app.post('/login_post',function (req,res) {

        login();
       res.send('1');

    });

    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'test',
    });

    connection.connect(function () {
        console.log("服务器连接成功");
    });
    connection.query('select * from login',function (err,result,fields) {
        if(err){
            throw err
        }
        console.log(result);
    });

    return connection;

}

function start() {
    connet();

}

function login() {
    let sql = 'select * from user ';
    connet().query(sql,function (err,results,fields) {
        if (err) {
            throw err;
        }

        console.log(results);
    })
}
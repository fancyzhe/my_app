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
       let response = {
           "id" : req.body.id,
           "password":req.body.password,
       };
       login(req.body.id);
       res.send('1');

    });

    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'test',
    });

    connection.connect();

    return connection;

}

function start() {
    connet();

}

function login(id) {
    let sql = 'select * from user where id='+id;
    connet().query(sql,function (err,rows,fields) {

    })
}
/**
 *
 * @fanz
 */

//启动后端服务器node

connet();//连接数据库

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

    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'test',
    });

    connection.connect();

    return connection;

}
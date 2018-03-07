/**
 *
 * @fanz
 */

//启动后端服务器node

start();//连接数据库

function connet() {

    let express = require('express');

    let mysql = require('mysql');

    let bodyParser = require('body-parser');

    let urlencodedParser = bodyParser.urlencoded({extended: false});

    let app = express();

    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });

    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'test',
    });

    app.get('/123', (req, res) => {
        let sql = 'select * from login';
        connection.query(sql, function (err, results, fields) {
            if (err) throw err;
            res.json(results);
        });
    });

    app.post('/login_post', urlencodedParser, function (req, res) {
        let sql = 'select * from login where id=' + req.body.id;
        let data = {};
        connection.query(sql, function (err, result, fields) {
            if(err)throw err;
            for (let i = 0; i < result.length; i++) {
                if(req.body.password === result[0]['pwd']){
                    data.data={
                        'admin':result[0]['admin'],
                    }
                }else {
                    data.data=({
                        'admin':false,
                    })
                }
                res.send(data);
            }
        });

    });
    app.listen(3001);


    connection.connect(function () {
        console.log("服务器连接成功");
    });

    return connection;

}

function start() {
    connet();

}

function login(id) {
    let sql = 'select * from user where=' + id;
    let data = [];
    connet().query(sql, function (err, result, fields) {
        if (err) {
            throw err;
        }
        for (let i = 0; i < result.length; i++) {
            let firstResult = result[i];
            data.push({
                'id': firstResult['id'],
                'name': firstResult['name'],
                'pwd': firstResult['pwd'],
                'admin': firstResult['admin'],
            });
        }
        console.log(data);
    });
}
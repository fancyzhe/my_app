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
        next();
    });

    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'test',
    });

    app.post('/login_post', urlencodedParser, function (req, res) {
        let response = {
            "id": req.body.id,
            "password": req.body.password
        };
        let sql = 'select * from user where=' + response.id;
        let data = [];
        connection.query(sql, function (err, result, fields) {

            for (let i = 0; i < result.length; i++) {
                console.log(1);
                let firstResult = result[i];
                data.push({
                    'id': firstResult['id'],
                    'name': firstResult['name'],
                    'pwd': firstResult['pwd'],
                    'admin': firstResult['admin'],
                });
            }
            console.log('data', data);
        });
        res.send('1');
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
    });
}
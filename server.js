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

    let urlencodedParser = bodyParser.urlencoded({ extended: false });

    let app = express();

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
        next();
    });

    app.post('/login_post',urlencodedParser,function (req,res) {
        let response = {
            "id":req.body.id,
            "password":req.body.password
        };
        console.log(response);
        login(req.body.id);
       res.send('success');

    });
    app.listen(3001);

    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'test',
    });

    connection.connect(function () {
        console.log("服务器连接成功");
    });
    connection.query('select * from login ',function (err,result,fields) {
        if(err){
            throw err
        }
        let data = [];
        for (let i=0; i<result.length; i++) {
            let firstResult = result[i];
            data.push({
                'id':firstResult['id'],
                'name':firstResult['name'],
                'pwd':firstResult['pwd'],
                'admin':firstResult['admin'],
            });
        }
    });

    return connection;

}

function start() {
    connet();

}

function login(id) {
    let sql = 'select * from user where='+id;
    connet().query(sql,function (err,result,fields) {
        if (err) {
            throw err;
        }

        let data = [];
        for (let i=0; i<result.length; i++) {
            let firstResult = result[i];
            data.push({
                'id':firstResult['id'],
                'name':firstResult['name'],
                'pwd':firstResult['pwd'],
                'admin':firstResult['admin'],
            });
        }
        console.log(data);
    })
}
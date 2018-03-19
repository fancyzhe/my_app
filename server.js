/**
 *
 * @fanz
 */

//启动后端服务器node

const _ = require('lodash');
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


    //登陆
    app.post('/login_post', urlencodedParser, function (req, res) {
        let sql = 'select * from login where id=' + req.body.id;
        let data = {};
        connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (!result[0]) {
                data.data = {
                    'admin': false,
                }
            }
            for (let i = 0; i < result.length; i++) {
                if (req.body.password === result[0]['pwd']) {
                    data.data = {
                        'admin': result[0]['admin'],
                    }
                } else {
                    data.data = ({
                        'admin': false,
                    })
                }
            }
            res.send(data);
        });
    });

    //管理员
    app.get('/getCost', urlencodedParser, (req, res) => {
        let townName = req.query.currentTown != 'ALL_VALUE' ? `town = (select name from town where id = '${req.query.currentTown}')` : true;
        if (req.query.currentTown === '全部') townName = true;
        let isOwe = req.query.isOwe === 'true' ? 'water < 0 or manage<0' : 'water > 0 and manage > 0';
        let findName = req.query.findName ? `name LIKE '%${req.query.findName}%'` : true;
        let sql = `select distinct * from cost where ${townName} and (${isOwe}) and ${findName}`;
        let data = {data: []};
        connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            _.map(result, item => {
                data.data.push(item)
            });
            res.send(data);
        })
    });

    app.get('/getTown', (req, res) => {
        let sql = 'select id,name from town';
        let data = {data: []};
        connection.query(sql, (err, result, fields) => {
            if (err) throw err;
            _.map(result, item => {
                data.data.push(item)
            });
            res.send(data);
        })
    });

    app.get('/getUser', (req, res) => {
        let sql = 'select id,name,IDcard,Provice,city,town,loudong,room from user';
        let data = {data: []};
        connection.query(sql, (err, result, field) => {
            if (err) throw err;
            _.map(result, item => {
                data.data.push(item)
            });
            res.send(data);
        })
    });
    //获取省
    app.get('/getPro', (req, res) => {
        let sql = 'SELECT city.`name`,city.id FROM city WHERE `keys`=0';
        let data = {data: []};
        connection.query(sql, (err, result, field) => {
            if (err) throw err;
            _.map(result, item => {
                data.data.push(item)
            });
            res.send(data)
        })
    });

    //获取市
    app.get('/getCity', (req, res) => {
        let sql = 'SELECT city.`name`,city.id FROM city WHERE `keys`=' + req.query.pro;
        let data = {data: []};
        connection.query(sql, (err, result) => {
            if (err) throw err;
            _.map(result, item => {
                data.data.push(item)
            });
            res.send(data)
        })
    });

    //获取小区ID
    app.get('/getTownId', (req, res) => {
        let sql = 'SELECT id FROM town ORDER BY id DESC LIMIT 1';
        let data;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            _.map(result, item => {
                data = item
            });
            res.send(data)
        })
    });

    //添加小区
    app.post('/addTown', urlencodedParser, (req, res) => {
        const {id, name, pro, city, address} = req.body;
        let sql = `INSERT INTO TOWN (id,name,townPro,townCity,townAddress) 
       values ('${id}','${name}',(SELECT city.name FROM city WHERE city.id = '${pro}'),
       (SELECT city.name FROM city WHERE city.id = '${city}'),'${address}')`;
        connection.query(sql, (err, result) => {
            if (err) throw  err;
        });
        res.send('success')
    });

    //通过选择小区确定省市区和具体地址
    app.get('/getAddressByTown', (req, res) => {
        let sql = `SELECT townPro,townCity,townAddress FROM town  WHERE town.id = ${req.query.id}`;
        let data = {data: []};
        connection.query(sql, (err, result) => {
            if (err) throw err;
            _.map(result, item => {
                data.data.push(item)
            });
            res.send(data)
        })
    });

    //获取用户ID
    app.get('/getUserId', (req, res) => {
        let sql = 'SELECT id FROM user ORDER BY id DESC LIMIT 1';
        let data;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            _.map(result, item => {
                data = item;
            });
            res.send(data)
        })
    });

    //添加用户
    app.post('/addUser', urlencodedParser, (req, res) => {
        console.log(req.body);
        const {id, name, IDcard, Provice, city, town, loudong, room, water, manage} = req.body;
        let sql = `INSERT INTO user (id,name,IDcard,Provice,city,town,loudong,room)
                        values (
                                    '${id}',
                                    '${name}',
                                    '${IDcard}',
                                    '${Provice}',
                                    '${city}',
                                    (SELECT name FROM town WHERE id = '${town}'),
                                    '${loudong}',
                                    '${room}'
                                );
        INSERT INTO cost (id,name,town,water,manage)
                        values (
                                    '${id}',
                                    '${name}',
                                    (SELECT name FROM town WHERE id = '${town}'),
                                    '${water}',
                                    '${manage}'
                               );
        INSERT INTO login (id,name,admin,pwd)
                        values (
                                    '${id}',
                                    '${name}',
                                    '2',
                                    '123456'
                        );
`;
        console.log(sql);
        connection.query(sql, (err, result) => {
            if (err) throw  err;
        });
        res.send('success');
    });

    app.listen(3001);


    connection.connect(function () {
        console.log("服务器连接成功");
    });

    return connection;

}

function start() {

    connet().on('error',handleError);

}

function handleError (err) {
    if (err) {
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connect();
        } else {
            console.error(err.stack || err);
        }
    }
}

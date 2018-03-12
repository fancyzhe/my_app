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

    //管理员
    app.get('/getCost',urlencodedParser,(req,res)=>{
        let townName = req.query.townName  ? `town = '${req.query.townName}'`  : true;
        if(req.query.townName === '全部')townName = true;
        let isOwe = req.query.isOwe==='true' ? 'water < 0 or manage<0': 'water > 0 and manage > 0';
        let findName = req.query.findName ? `name LIKE '%${req.query.findName}%'` : true;
        let sql = `select * from cost where ${townName.toString()} and (${isOwe}) and ${findName.toString()}`;
        let data ={data:[]};
        connection.query(sql,function (err,result,fields) {
            if(err)throw err;
            _.map(result,item=>{
                data.data.push(item)
            });
            res.send(data);
        })
    });

    app.get('/getTown',(req,res)=>{
        let sql = 'select * from town';
        let data = {data:[]};
        connection.query(sql,(err,result,fields)=>{
            if(err)throw err;
            _.map(result,item=>{
                data.data.push(item.townName)
            });
            res.send(data);
        })
    });

    app.get('/getUser',(req,res)=>{
        let sql = 'select * from user';
        let data = {data:[]};
        connection.query(sql,(err,result,field)=>{
            if(err) throw err;
            _.map(result,item=>{
                data.data.push(item)
            });
            res.send(data);
        })
    });

    app.get('/getPro',(req,res)=>{
        let sql = 'SELECT NAME FROM city WHERE `keys`=0'
        let data = {data:[]}
        connection.query(sql,(err,result,field)=>{
            if(err) throw err;
            _.map(result,item=>{
                data.data.push(item)
            });
            res.send(data)
        })
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

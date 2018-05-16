/**
 *
 * @fanz
 */

//启动后端服务器node

const _ = require('lodash');
start();//连接数据库
const curTime = new Date();
let count = Math.random().toString(36).substr(2);

const dateChange = (date) => {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
};

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
            'name': result[0].name
          };
          let sql1 = `INSERT INTO loginlog (logid,id,name,time) values('${count}','${req.body.id}','${result[0].name}','${dateChange(curTime)}')`;
          connection.query(sql1);
        } else {
          data.data = ({
            'admin': false,
          })
        }
      }
      res.send(data);
    });
  });

  app.get('/getMax', urlencodedParser, (req, res) => {
    let sql = `SELECT * FROM admin where id = '${req.query.id}'`;
    let data = {
      data: []
    };
    connection.query(sql, (err, result, fields) => {
      if (err) throw err;
      _.map(result, item => {
        data.data.push(item)
      });
      res.send(data)
    })
  });

  //管理员
  app.get('/getCost', urlencodedParser, (req, res) => {
    let townName = req.query.currentTown == 'ALL_VALUE' || !req.query.currentTown ? true : `town = (select name from town where id = '${req.query.currentTown}')`;
    if (req.query.currentTown === '全部') townName = true;
    let isOwe = req.query.isOwe === 'true' ? 'water < 0 or manage<0' : 'water > 0 and manage > 0';
    let findName = req.query.findName ? `name LIKE '%${req.query.findName}%'` : true;
    let sql = `select distinct * from cost where ${townName} and (${isOwe}) and ${findName}`;
    let sql1 = `SELECT COUNT(*) AS COUNT FROM cost WHERE ${townName} and (${isOwe}) and ${findName}`;
    console.log(sql);
    let data = {data: [], total: 0};
    connection.query(sql, function (err, result, fields) {
      if (err) throw err;
      _.map(result, item => {
        data.data.push(item)
      });
    });
    connection.query(sql1, (err, result) => {
      if (err) throw err;
      _.map(result, item => {
        data.total = item.COUNT
      });
      res.send(data)
    })
  });

  app.get('/getMoney', (req, res) => {
    let sql = `SELECT * FROM money limit ${(req.query.pageIndex - 1) * 10},10`;
    let data = {data: [], total: 0};
    connection.query(sql, (err, result) => {
      if (err) throw err;
      _.map(result, item => {
        data.data.push(item)
      });
    });
    connection.query('SELECT COUNT(*) FROM money', (err, result) => {
      if (err) throw err;
      _.map(result, item => {
        data.total = item['COUNT(*)']
      });
      res.send(data)
    });

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
    let town = _.get(req.query, 'town') !== 'ALL_VALUE' && _.get(req.query, 'town') ? `town='${req.query.town}'` : true;
    let sql = `select id,name,sex,phone,IDcard,town,loudong,room from user 
        WHERE ${town}
        limit ${(req.query.page - 1) * 10},10`;
    let sql2 = `SELECT COUNT(town) AS COUNT FROM user WHERE ${town}`;
    let data = {data: []};
    connection.query(sql, (err, result, field) => {
      if (err) throw err;
      _.map(result, item => {
        data.data.push(item)
      });
    });
    connection.query(sql2, (err, result) => {
      if (err) throw err;
      _.map(result, item => {
        _.merge(data, {total: item.COUNT})
      });
      res.send(data);
    });
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

  //添加用户市获取用户最新ID
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
  //添加水电费的时候，根据ID获取用户姓名
  app.get('/getId', (req, res) => {
    let sql = `SELECT name FROM user WHERE id = '${req.query.id}'`;
    let data;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      _.map(result, item => {
        data = item;
      });
      res.send(data)
    })
  });

  //添加水电费
  app.post('/addCost', urlencodedParser, (req, res) => {
    const {id, name, adminId, adminName, water, manage} = req.body;
    let count = Math.random().toString(36).substr(2);

    let sql1 = `UPDATE cost set water = water - ${water},manage = manage - ${manage} WHERE id = '${id}'`;
    connection.query(sql1, () => {
    });
    let sql = `INSERT INTO waterlog (logid,time,adminId,adminName,userId,userName,water,manage)
                        values(
                            '${count}',
                            '${dateChange(new Date())}',
                            '${adminId}',
                            '${adminName}',
                            '${id}',
                            '${name}',
                            '${water}',
                            '${manage}'
                        )`;
    connection.query(sql, (err, result) => {
      if (err) throw err;

    });
    res.send(true);
  });

  //添加用户
  app.post('/addUser', urlencodedParser, (req, res) => {
    const {id, name, IDcard, sex, phone, Provice, city, town, loudong, room, water, manage, adminId, adminName} = req.body;
    let count = Math.random().toString(36).substr(2);

    let sql = `INSERT INTO user (id,name,sex,phone,IDcard,Provice,city,town,loudong,room)
                        values (
                                    '${id}',
                                    '${name}',
                                    '${sex}',
                                    '${phone}',
                                    '${IDcard}',
                                    '${Provice}',
                                    '${city}',
                                    (SELECT town.name FROM town WHERE town.id = '${town}'),
                                    '${loudong}',
                                    '${room}'
                                );`;
    let sql1 = ` INSERT INTO cost (id,name,town,water,manage)
                        values (
                                    '${id}',
                                    '${name}',
                                    (SELECT town.name FROM town WHERE town.id = '${town}'),
                                    '${water}',
                                    '${manage}'
                               );`;
    let sql2 = `INSERT INTO login (id,name,admin,pwd)
                        values (
                                    '${id}',
                                    '${name}',
                                    '2',
                                    '123456'
                        );`;
    let sql3 = `INSERT INTO adminlog (logid,time,id,name,content)
                        values (
                                    '${count}',
                                    '${dateChange(curTime)}',
                                    '${adminId}',
                                    '${adminName}',
                                    '增加用户'
                                )
                        `;
    connection.query(sql, (err, result) => {
      if (err) throw  err;
    });
    connection.query(sql1, (err, result) => {
      if (err) throw  err;
    });
    connection.query(sql2, (err, result) => {
      if (err) throw  err;
    });
    connection.query(sql3, (err, result) => {
      if (err) throw  err;
    });
    res.send('success');
  });

  app.get('/getLoginLog', (req, res) => {
    let sql = `SELECT * FROM loginlog LIMIT ${(req.query.page - 1) * 10},10`;
    let sql1 = `SELECT COUNT(*) AS COUNT FROM loginlog`;
    let data = {data: [], total: 0};
    connection.query(sql, (err, result) => {
      if (err) throw err;
      _.map(result, item => {
        data.data.push(item);
      });
    });
    connection.query(sql1, (err, result) => {
      if (err) throw err;
      _.map(result, item => {
        data.total = item.COUNT
      });
      res.send(data)
    })
  });

  app.get('/getAdminLog', (req, res) => {
    let sql = `SELECT * FROM adminlog LIMIT ${(req.query.page - 1) * 10},10`;
    let sql1 = `SELECT COUNT(*) AS COUNT FROM adminlog`;
    let data = {data: [], total: 0};
    connection.query(sql, (err, result) => {
      if (err) throw err;
      _.map(result, item => {
        data.data.push(item);
      });
    });
    connection.query(sql1, (err, result) => {
      if (err) throw err;
      _.map(result, item => {
        data.total = item.COUNT
      });
      res.send(data)
    })
  });

  app.get('/getAdmin', (req, res) => {
    let sql = `SELECT admin.name,admin.phone,admin.weixinCode FROM admin WHERE id = '${req.query.id}'`;
    let data = {data: []};
    connection.query(sql, (err, result) => {
      if (err) throw err;
      _.map(result, item => {
        data.data.push(item)
      });
      res.send(data)
    })
  });

  app.post('/postAdmin', urlencodedParser, (req, res) => {
    const {id, name, phone, weixinCode} = req.body;
    let sql = `UPDATE admin set name = '${name}',phone='${phone}',weixinCode='${weixinCode}' WHERE id = '${id}'`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.send(false)
      }
      else {
        res.send(true)
      }
    })
  });

  app.get('/getMsg', (req, res) => {
    let town = _.get(req.query, 'town') !== 'ALL_VALUE' && _.get(req.query, 'town') ? `townName='${req.query.town}'` : true;
    let sql = `SELECT msg.id,msg.text,msg.townName,msg.adminName,msg.time FROM msg
         WHERE ${town} LIMIT ${(req.query.page - 1) * 10},10`;
    let sql1 = `SELECT COUNT(townName) AS COUNT FROM msg WHERE ${town}`;
    let data = {data: [], total: 0};
    connection.query(sql, (err, result) => {
      if (err) throw err;
      _.map(result, item => {
        data.data.push(item)
      })
    });
    connection.query(sql1, (err, result) => {
      if (err) throw err;
      _.map(result, item => {
        data.total = item
      });
      res.send(data)
    })
  });

  app.post('/addMsg', urlencodedParser, (req, res) => {
    const {text, townName, id, name} = req.body;
    let count = Math.random().toString(36).substr(2);
    let sql = `INSERT INTO msg (id,text,townName,adminId,adminName,time) 
        VALUES('${count}','${text}','${townName}','${id}','${name}','${dateChange(new Date())}')`;
    connection.query(sql, (err, result) => {
      if (!err) {
        res.send(true)
      } else {
        res.send(false)
      }
    })
  });

  app.get('/getCostLog', (req, res) => {
    let sql = `SELECT waterlog.adminName,waterlog.userId,waterlog.userName,waterlog.water,waterlog.manage,waterlog.time 
        FROM waterlog LIMIT ${(req.query.page - 1) * 10},10`;
    let data = {data: []};
    connection.query(sql, (err, result) => {
      if (err) throw err;
      _.map(result, item => {
        data.data.push(item)
      });
      res.send(data)
    })

  });

  app.get('/getUserCostLog', (req, res) => {
    let sql = `SELECT * FROM costlog LIMIT ${(req.query.page - 1) * 10},10`;
    let sql1 = `SELECT COUNT(*) AS COUNT FORM costlog`;
    let data = {data: [], total: 0};
    connection.query(sql, (err, result) => {
      if (err) throw err;
      _.map(result, item => {
        data.data.push(item)
      });
    });
    connection.query(sql1, (err, result) => {
      _.map(result, item => {
        data.total = item.COUNT;
      });
      res.send(data)
    })
  });


  //user

  app.get('/getTownName', (req, res) => {
    let sql = `SELECT user.town FROM user WHERE id = '${req.query.id}'`;
    let data = {data: ''};
    connection.query(sql, (err, result) => {
      _.map(result, item => {
        data.data = item;
      });
      res.send(data)
    })
  });

  app.get('/getAdminMsg', (req, res) => {
    let sql = `SELECT * FROM admin WHERE townName = '${req.query.townName}'`;
    let data = {data: []};
    connection.query(sql, (err, result) => {
      _.map(result, item => {
        data.data.push(item)
      });
      res.send(data);
    })
  });

  app.get('/getCostByUser', (req, res) => {
    let sql = `SELECT * FROM cost WHERE id = '${req.query.id}'`;
    let data = {data: []};
    connection.query(sql, (err, result) => {
      _.map(result, item => {
        data.data.push(item)
      });
      res.send(data);
    })
  });

  app.get('/payManage', (req, res) => {
    let sql = `SELECT * FROM money WHERE id = '${req.query.payId}'`;
    let sql1 = `update money set used = '是' where id = ${req.query.payId}`;
    let sql2 = `update cost set manage = manage+100 where id = ${req.query.id}`;
    let sql3 = `insert into costlog values('${count}','${dateChange(curTime)}','${req.query.id}','${req.query.name}','缴纳了100元电费')`
    connection.query(sql, (err, result) => {
      if (!result.length) {
        res.send(false)
      }
      _.map(result, item => {
        if (item.pwd === req.query.payPwd) {
          connection.query(sql1);
          connection.query(sql2);
          connection.query(sql3);
          res.send(true)
        } else {
          res.send(false)
        }
      })
    })
  });

  app.get('/payWater', (req, res) => {
    let sql = `SELECT * FROM money WHERE id = '${req.query.payId}'`;
    let sql1 = `update money set used = '是' where id = ${req.query.payId}`;
    let sql2 = `update cost set water = water+100 where id = ${req.query.id}`;
    let sql3 = `insert into costlog values('${count}','${dateChange(curTime)}','${req.query.id}','${req.query.name}','缴纳了100元水费')`;
    connection.query(sql, (err, result) => {
      if (!result.length) {
        res.send(false)
      }
      _.map(result, item => {
        if (item.pwd === req.query.payPwd && item.used === '否') {
          connection.query(sql1);
          connection.query(sql2);
          connection.query(sql3);
          res.send(true)
        } else {
          res.send(false)
        }
      })
    })
  });

  app.get('/getMsgByUser', (req, res) => {
    let sql = `select * from msg where townName = '${req.query.town}'`;
    req.query.town && connection.query(sql, (err, result) => {
      _.map(result, item => {
        res.send(item.text)
      })
    })
  });

  app.get('/getUserInfo', (req, res) => {
    let sql = `select * from user where id = '${req.query.id}'`;
    let data={};
    connection.query(sql, (err, result) => {
      _.map(result, item => {
        data={data:item}
      });
      res.send(data)
    })
  });

  app.post('/updateUserInfo',urlencodedParser,(req,res)=>{
    const {name,phone,idCard,id} = req.body;
    let sql =`UPDATE user set `
  });

  app.listen(3001);


  connection.connect(function () {
    console.log("服务器连接成功");
  });

  return connection;

}

function start() {

  connet().on('error', handleError);

}

function handleError(err) {
  if (err) {
    // 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connect();
    } else {
      console.error(err.stack || err);
    }
  }
}

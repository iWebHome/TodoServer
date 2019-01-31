var express=require('express');
var app =express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//设置跨域访问
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});

global.id = 1;
var todoList = [
  { id: global.id++, title: '测试Todo', status: true },    // 添加 id 属性
  { id: global.id++, title: '还是测试', status: false },   // 添加 id 属性
  { id: global.id++, title: '再次测试', status: false },   // 添加 id 属性
];

/**
 * 获取 TODO 列表
 * 通信类型: GET
 * 通信接口: http://localhost:3000/api/list_message
 * 参数: 无
*/
app.get('/api/list_message',function(req,res){
  res.status(200),
  res.json(todoList);
});

/**
 * 新建 TODO    
 * 通信类型: POST
 * 通信接口: http://localhost:3000/api/add_message
 * 参数: {message: 'TODO项目'}
 */
app.post('/api/add_message', function (req, res) {
  const message = req.body.message;
  todoList.push({
    id: global.id++,
    title: (message === undefined) ? '': message,
    status: false
  })
  console.log("===================TodoList================");
  console.log(todoList);
  console.log('\n');
  
  res.json({ code: 0, message: '添加数据成功'});
});
 /**
  * 切换 TODO 状态
  * 通信类型: PUT
  * 通信接口: http://localhost:3000/api/toggle_message_status
  * 参数: {id: TODO的id}
  */
app.put('/api/toggle_message_status', function (req, res) {
  const id = req.body.id;

  for (var i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id){
      todoList[i].status = !todoList[i].status;
      break;
    }
  }
  
  console.log("===================TodoList================");
  console.log(todoList);
  console.log('\n');

  res.json({ code: 0, message: '切换TODO状态成功' });
});


//配置服务端口
var server = app.listen(3000, 'localhost', function () {

var host = server.address().address;
var port = server.address().port;

console.log('Example app listening at http://%s:%s', host, port);
});

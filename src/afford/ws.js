//重写控制台日志输出
// console.log = (function(oldconsole){
//     return function(o){
//         o =typeof o == "object"?JSON.stringify(o):o;
//         oldconsole.call(console,o);
//         sendlog(o);
//     };
// })(console.log);
// //远程转发
// function sendlog(o){
//     wssend({act:"normal.weblog.test",pf:"debug",msg:o,type:"msg"})
// }
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIiLCJpc3MiOiIiLCJhdWQiOiIiLCJzdWIiOiIyODcxIiwiaWF0IjoxNTAxMzA5OTQ1LCJuYmYiOjE1MDEzMDk5NDUsImV4cCI6MTUwOTk0OTk0NSwicGZtIjoicGZtIiwicHJpdiI6InByaXYiLCJhcmdzIjoiYXJncyJ9._GuEePuZ6uadg7Wv5Jx1y4xtSJALMgfO7GYl1BH4Kw4';




//ws服务
function wsServer(host, onopen, onmessage) {
  //全局变量
  ws = new WebSocket(host);
  //连接
  ws.onopen = function (e) {
    connected = true;
    onopen(e);
  };
  //接收推送
  ws.onmessage = function (e) {
    onmessage(e.data);
  };
  ws.onclose = function (e) {
    connected = false;
    console.log("onclose");
    autoConnect();

  };
  ws.onerror = function (e) {
    connected = false;
    console.log('onerror:' + e);
    //autoConnect();
  };
}

//发送
function wssend(tt) {
  if (typeof ff != 'string') tt = JSON.stringify(tt);
  if (connected) ws.send(tt);
}
//自动连接
function autoConnect() {
  console.log('autoConnect');
  //一直重连直到成功为止
  //var timer = setInterval(autoConnect,1000);
  //setTimeout(autoConnect,1000);
  if (!connected) wsServer(wspath, onopen, onmessage);
}


//连接状态标识
var connected = false;
const wspath = 'ws://new.dx2.me:9724';
var ws;
//推送服务
wsServer(wspath, onopen, onmessage);
//连接成功
function onopen(e) {
  wssend({
    "act": "wslogin",
    "token": token
  })
  console.log('onopen');
  //接收频道推送
  b2();
}
//接收推送
function onmessage(str) {
  json = JSON.parse(str);
  if (json.act == 'normal.weblog.test') return;
  tolog("receive:" + str);
  console.log('onmessage');
}

//log
function tolog(tmp) {
  var tt = document.getElementById('msg').innerHTML;
  document.getElementById('msg').innerHTML = tt + tmp + "<br>";
}


// function sendlog(o){
//     var timer1 = setInterval(function(){
//         if(connected){
//             timer1 && clearInterval(timer1);
//             wssend({act:"normal.weblog.test",pf:"debug",msg:o,type:"msg"})
//         }
//     },100);
// }

export default {
  onopen,
  onmessage,
  tolog
}

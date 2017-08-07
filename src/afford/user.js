import { isWeiXin, urlGet } from './comm.js';
import * as net from './net.js';
import * as store from './store.js';


var config={
    url:'http://new.dx2.me/v3/',
    prefix:'om_',
}

//检查登陆
function checklogin(){
    if (sta.userid==''){
      console.log('place_login');
      jump_login();
    }
}


//根据code取得token
function gettoken(code,cb){
    if (code=='') return;
    var d={act:"normal.user.codelogin"};
    d.code=code;
    net.toApi(d,function(json){
        if (json.result.msg=='user_info_error'){
            cb && cb(false);
        }else{
            sta.token=json.result['token'];
            store.save();
            cb && cb(sta.token);
        }
    });
}

//检测是否登陆
function getuserid(token,cb){
    net.callApi('token.user.id',function(json){
        if (json.result.hasOwnProperty('user_id')){
            cb && cb(json.result.user_id);
        }else{
            cb && cb(false);
        }
    });
}


//跳转微信授权
function jump_login(){
    if(isWeiXin()){
        console.log('weiwin_lgoin');
        location.href='http://shouluo.me/wx-ordermeal.php';
    }else{
        Toast('请在微信端登录');
    }
    return;
}


//跳回首页
function jump_index(){
    location.href= '/';
    return;
}


//后台帐号登陆
function login(usern,pw,cb){
    net.callApir('normal.user.login',{user:usern,password:pw},function(json){
        //保存token
        sta.token=store.set('token',json.result.token);
        sta.userid=store.set('userid',json.result.user_id);
        cb && cb(sta.token);
    });

}


//退出
function logout(){
    store.init();
    console.log('logout');
    //跳转
    return jump_index();
}



//自动登陆
function autologin(cb){
    var code=urlGet('code');
    console.log('code--'+code);
    //1授权
    if (sta.token=='' && code=='')  return jump_login();

    //2刷新去掉url上的code 必要时再加上跳转
    //if (sta.token!=='' && code!='')   return jump_index();

    //3微信授权登陆
    if (sta.token=='' && code!=''){
        gettoken(code,function(token){
            console.log('token=>'+token);
            net.callApi('token.user.info',function(res){
                sta.userinfo=res.result.info;
                store.save();
                cb && cb(token);
            });
        });
     }

    //根据token获取userid  
    if (sta.token!='' ){
        cb && cb(sta.token);
    }
}  //end autologin


export {gettoken, getuserid, jump_login, jump_index, login,logout, autologin,checklogin};

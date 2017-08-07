import * as net from './net.js';


var inwx=false;



//微信支付
function pay(totalfee,id,admin_id){
    net.callApir('token.wx.pay',{'totalfee':totalfee,"vote_id":id,'admin_id':admin_id},function(json){
       console.log(json);
       WeixinJSBridge.invoke('getBrandWCPayRequest',json.result,function(res){
                //WeixinJSBridge.log(res.err_msg);
                console.log(res);
                if(res.err_msg=='get_brand_wcpay_request:ok'){
                   location.href = 'http://a.yunshenfang.com/vote/?#/ranking';
                   return false;
                }
        });
    })
}

//初始化设置
function init(cb,url){
    if (!url) url=location.href;
    net.callApir('normal.wx.init',{'url':url},function(json){
       console.log(json);
       wx.config(json.result);
      cb && cb();
    })
}


//微信分享
function share(title,desc,link,imgUrl){
  //设置
wx.ready(function () {
    //隐藏分享
    //wx.hideOptionMenu();
    //打开分享
    wx.showOptionMenu();
    
    //发朋友
    wx.onMenuShareAppMessage({
    title:title,
    desc:desc,
    link:link,
    imgUrl:imgUrl,
      trigger: function (res) {
        //alert('用户点击分享到朋友');
      },
      success: function (res) {
        if(sta.token){
           // net.callApi('token.index.transmit',{id:sta.id},function(res){
           //  console.log(res);
           //  });
        }
      },
      cancel: function (res) {
        //alert('已取消');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
    
    //注册发朋友圈
    wx.onMenuShareTimeline({
      title:title,
      desc:desc,
      link:link,
      imgUrl:imgUrl,
      trigger: function (res) {
        //alert('用户点击分享到朋友圈');
      },
      success: function (res) {
        if(sta.token){
           // net.callApi('token.index.transmit',{id:sta.id},function(res){
           //  console.log(res);
           //  });
        }
      },
      cancel: function (res) {
        //alert('已取消');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
    

}); //ready end

//wx接口初始化错误提示
wx.error(function (res) {
  alert(res.errMsg);
});
}

//选择图片上传
function chooseImage(cb){
  wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res){
            // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            var localIds = res.localIds; 
            var uploadCount = 0;
            var localIdLength = localIds.length;
            var m = 0;
            var uploadpic=[];
            var data = [];
            data['localIds'] = localIds;
            var upload = function() {
                //串行上传
                wx.uploadImage({
                    localId:localIds[uploadCount],
                    success: function(re){
                        net.callApir('token.wx.uploadImage',{'id':re.serverId},function(json){
                            //图片ID对应图片路径
                            //uploadpic[json.result.serverId]=json.result.picpath;
                            uploadpic.push(json.result.picpath);
                            data['picpath'] = uploadpic;
                        });
                        uploadCount++;
                        //如果还有照片，继续上传
                        if (uploadCount < localIdLength){
                        	 upload();
                        } else{
                        	cb && cb(data);
                        }
                    }
                });                    
            };
            upload(); 
      }
  });
}


//上传图片
function uploadImage(localId,cb){
  console.log(localId);
  wx.uploadImage({
      localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
        // 返回图片的服务器端ID
        var serverId = res.serverId;
        net.callApir('token.wx.uploadImage',{'id':serverId},function(json){
           console.log(json);
        })
        cb && cb(serverId);
      }
  });
}

//查看图片
function previewImage(img){
	console.log(img);
	wx.previewImage({
        // 当前显示图片的http链接
        current: img,
        urls: '' // 需要预览的图片http链接列表
     });
}


//关闭窗口
function closeWindow(){
    checkWx() &&  WeixinJSBridge.call('closeWindow');
}




function checkWx(){
    if (typeof(WeixinJSBridge) != "undefined") inwx=true;
    return inwx;
}

export {inwx,checkWx,closeWindow,pay,share,init,chooseImage,uploadImage,previewImage};

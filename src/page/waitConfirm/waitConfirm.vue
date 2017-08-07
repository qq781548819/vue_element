<template>
  <div style="background:#ededed;">
  
    <section v-if="!showLoading">
      <head-top head-title="订单提交成功" goBack="true">
      </head-top>
      <!--<section class="activity">
        <ul>
          <li v-for="(item,index) in shopDetailData.promotion" :key="index">
            <span v-if="item.type=='reduce'" class="case-">{{item.icon_name}}</span>
            <span v-else-if="item.type=='new'" class="case-new">{{item.icon_name}}</span>
            <span v-else-if="item.type=='invoice'" class="case-p">{{item.icon_name}}</span>
            <span>{{item.desc}}</span>
          </li>
        </ul>
      </section>-->
  
      <section class="biz-info"  style="margin-top:2.6rem;">
        <div class="title">订单信息</div>
        <div class="info" flex="dir:left box:last">
          <span>订单编号</span>
          <span>{{orderDetail.order_sn}}</span>
        </div>
        <div class="info" flex="dir:left box:last">
          <span>时间</span>
          <span>{{orderDetail.add_time}}</span>
        </div>
        <div class="items" flex="dir:left main:center cross:center" v-for="(item,index) in orderDetail.goods_info" :key="index">
          <img class="item_goods" :src="item.one_logo"></img>
          <div class="name" flex-box="3">{{item.good_name}}</div>
          <div class="" flex-box="1" flex="dir:top main:right">
            <div class="num">x{{item.good_num}}</div>
            <div class="price">￥{{item.price}}</div>
            <div class="rebate_price">￥{{item.rebate_price}}</div>
          </div>
        </div>
      </section>
      <section class="total" flex="dir:right">
        <div class="order_amount">优惠合计：
          <span style="font-size:.5rem;color:red;">￥</span>
          <span style="color:red;">{{orderDetail.order_amount}}</span>
        </div>
        <div class="goods_price">共{{orderDetail.goods_price}}元</div>
      </section>
  
      <section class="biz-info">
        <div class="tname">{{shopDetailData.name}}</div>
        <div class="info">{{shopDetailData.biz_intro}}</div>
        <div class="info" flex="dir:left box:last">
          <span>品类</span>
          <span>{{shopDetailData.biz_cate}}</span>
        </div>
        <div class="info" flex="dir:left box:last">
          <span>商家电话</span>
          <span>{{shopDetailData.biz_phone}}</span>
        </div>
        <div class="info" flex="dir:left box:last">
          <span>地址</span>
          <span>{{shopDetailData.biz_address}}</span>
        </div>
        <div class="last" flex="dir:left box:last">
          <span>营业时间</span>
          <span>{{shopDetailData.biz_time}}</span>
        </div>
      </section>
    </section>
    <section>
      <button class="btn" @click="completeOrderClick">完结订单</button>
    </section>
    <loading v-show="showLoading"></loading>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import headTop from 'src/components/header/head'
import loading from 'src/components/common/loading'
import * as Api from 'src/afford/api'
import alertTip from 'src/components/common/alertTip'
import { setStore, getStore } from 'src/config/mUtils'
export default {
  data() {
    return {
      shopDetailData: null,
      showLoading: true,
      showAlert: false, //弹出框
      alertText: null, //弹出框内容
    }
  },
  computed: {
    ...mapState([
      'cartList', 'place', 'orderDetail'
    ])
  },
  mounted() {
    this.initData();
  },
  methods: {
    //初始化时获取基本数据
    async initData() {
      try {
        Api.log(`获得的店铺餐桌信息：${JSON.stringify(this.place)},订单信息:${JSON.stringify(this.orderDetail)}`)
        this.shopDetailData = (await Api.shopDetail(this.place.shop_id)).info;
        this.showLoading = false;
      } catch (error) {
        this.showAlert = true;
        this.alertText = `订单提交失败：${JSON.stringify(error)}`;
      }
    },
    async completeOrderClick() {
      try {
        let res = await (Api.shopFinish(this.orderDetail.order_sn));

        Api.log(`请求的数据：${JSON.stringify(res)}`);
      } catch (error) {
        Api.log(`请求的数据一场了：${JSON.stringify(error)}`);
      }
      let table = getStore("table");
      this.$router.replace({ path: '/', params: { table } });
    }
  },
  components: {
    headTop, loading, alertTip
  }
}
</script>
<style lang="scss" scoped>
.btn {
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: sandybrown;
  color: #fff;
  height: 1.5rem;
  width: 100%;
  border-radius: .4rem;
  position: relative;
  float: left;
  box-sizing: border-box;
}

.total {
  border-top: #ededed 1px solid;
  padding: .5rem;
  background-color: #fff;
  margin-bottom: .3rem;
  .order_amount {
    font-size: .7rem;
    margin-left: .6rem;
  }
  .goods_price {
    font-size: .7rem;
    text-decoration: line-through;
  }
}

.time {
  font-size: .6rem;
  padding-bottom: .4rem;
  border-bottom: 1px #ededed solid;
}

.items {
  padding-top: .4rem;
  padding-bottom: .4rem;
  margin: auto 0;
  box-sizing: border-box;
  border-bottom: 1px #ededed solid;
  height: 4.5rem;
  .name {
    font-size: .6rem;
    padding-left: .7rem;
    padding-top: .6rem;
  }
  .item_goods {
    padding: .2rem;
    border: 1px #ededed solid;
    width: 4.5rem;
    height: 100%;
  }
  .num {
    font-size: .6rem;
    text-align: right;
  }
  .price {
    font-size: .6rem;
    text-decoration: line-through;
    text-align: right;
    margin-top: .1rem;
    margin-bottom: .1rem;
  }
  .rebate_price {
    font-size: .7rem;
    text-align: right;
    color: red;
  }
}

.activity {
  margin-top: 2rem;
  background-color: #fff;
  margin-bottom: .3rem;
  padding: .5rem;
  .title {
    font-size: .65rem;
    font-weight: 600;
    margin-bottom: .3rem;
  }
  li {
    padding-bottom: .25rem;
    font-size: .6rem;
    .case- {
      font-size: .5rem;
      padding: 0.12rem 0.16rem 0.12rem 0.16rem;
      border-radius: .1rem;
      background-color: #F07373;
      color: #fff;
    }
    .case-new {
      font-size: .5rem;
      padding: 0.12rem 0.16rem 0.12rem 0.16rem;
      border-radius: .1rem;
      background-color: #97CC86;
      color: #fff;
    }
    .case-p {
      font-size: .5rem;
      border-radius: .1rem;
      padding: 0.12rem 0.16rem 0.12rem 0.16rem;
      border: .01rem solid #ededed;
    }
  }
}

.biz-info {
  background-color: #fff;
  margin-bottom: .3rem;
  padding: .5rem;
  .tname {
    font-size: .9rem;
    margin-top: .4rem;
    margin-bottom: .6rem;
    font-weight: bold;
    color: #FFCC00;
  }
  .title {
    font-size: .65rem;
    font-weight: 600;
    margin-bottom: .3rem;
  }
  .info {
    color: #888;
    padding-top: .3rem;
    padding-bottom: .3rem;
    border-bottom: .01rem solid #ededed;
    font-size: .6rem;
  }
  .last {
    color: #888;
    padding-top: .3rem;
    padding-bottom: .3rem;
    font-size: .6rem;
  }
}
</style>

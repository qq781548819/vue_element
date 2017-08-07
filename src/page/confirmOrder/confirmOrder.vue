<template>
  <div class="confirmOrderContainer">
    <section v-if="!showLoading">
      <head-top head-title="确认订单" goBack="true" signin-up='confirmOrder'></head-top>
      <section class="food_list">
        <header v-if="shopDetail.info">
          <img :src="shopDetail.info.logo">
          <span>{{shopDetail.info.name}}</span>
        </header>
        <ul class="food_list_ul" v-if="checkoutData.cart.groups">
          <li v-for="item in cartFoodList" :key="item.id" class="food_item_style">
            <p class="food_name ellipsis">{{item.name}}</p>
            <div class="num_price">
              <span>x {{item.num}}</span>
              <span>¥{{item.price}}</span>
            </div>
          </li>
        </ul>
        <div class="food_item_style total_price">
          <!--<p class="food_name ellipsis"></p>-->
          <div class="num_price">
            <span>待支付 ¥{{totalPrice}}</span>
          </div>
        </div>
      </section>
      <section class="pay_way container_style">
        <router-link :to='{path: "/confirmOrder/remark"}' class="header_style">
          <!--, query: {id: checkoutData.cart.id, sig: checkoutData.sig}-->
          <span>订单备注</span>
          <div class="more_type">
            <span class="ellipsis">{{remarkText||inputText? remarklist: '口味、偏好等'}}</span>
            <svg class="address_empty_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </router-link>
        <router-link :to="checkoutData.invoice.is_available? '/confirmOrder/invoice': ''" class="hongbo" :class="{support_is_available: checkoutData.invoice.is_available}">
          <span>发票抬头</span>
          <span>
            {{checkoutData.invoice.status_text}}
            <svg class="address_empty_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </router-link>
      </section>
      <section class="confrim_order">
        <p>待支付 ¥{{totalPrice}}</p>
        <p @click="confrimOrder">确认下单</p>
      </section>
      <transition name="fade">
        <div class="cover" v-if="showPayWay" @click="showPayWayFun"></div>
      </transition>
      <transition name="slid_up">
        <div class="choose_type_Container" v-if="showPayWay">
          <header>支付方式</header>
          <ul>
            <li v-for="item in checkoutData.payments" :key="item.id" :class="{choose: payWayId == item.id}">
              <span>{{item.name}}
                <span v-if="!item.is_online_payment">{{item.description}}</span>
              </span>
              <svg class="address_empty_right" @click="choosePayWay(item.is_online_payment, item.id)">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
              </svg>
            </li>
          </ul>
        </div>
      </transition>
    </section>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
    <loading v-if="commitLoading"></loading>
    <!--<loading :isShowBg="true" v-if="true"></loading>-->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import headTop from 'src/components/header/head'
import alertTip from 'src/components/common/alertTip'
import loading from 'src/components/common/loading'
import { imgBaseUrl } from 'src/config/env'
import checkout from 'src/data/checkout'
import * as Api from 'src/afford/api'

export default {
  data() {
    return {
      //{ shopId,cartFoodList:this.cartFoodList,totalPrice:this.totalPrice}
      place: null, //商店坐标
      cartFoodList: null,//购物车信息list
      totalPrice: 0,//总价格
      shopDetail: null,//商店详情
      commitLoading: false,
      showLoading: true, //显示加载动画
      checkoutData: null,//数据返回值
      shopCart: null,//购物车数据
      imgBaseUrl, //图片域名
      showPayWay: false,//显示付款方式
      payWayId: 1, //付款方式
      showAlert: false, //弹出框
      alertText: null, //弹出框内容
    }
  },
  created() {
    //获取上个页面传递过来的place值
    this.place = this.$route.query.place;
    this.cartFoodList = this.$route.query.cartFoodList;
    this.totalPrice = this.$route.query.totalPrice;
    Api.log(`当前cartFoodList数据${JSON.stringify(this.cartFoodList)}+${this.totalPrice}`)
    this.INIT_BUYCART();
    this.SAVE_PLACE(this.place);
  },
  mounted() {
    this.initData();
  },
  components: {
    headTop,
    alertTip,
    loading,
  },
  computed: {
    ...mapState([
      'cartList'
    ])
  },
  methods: {
    ...mapMutations([
      'SAVE_ORDER', 'INIT_BUYCART', 'SAVE_GEOHASH', 'CHOOSE_ADDRESS', 'NEED_VALIDATION', 'SAVE_CART_ID_SIG', 'SAVE_ORDER_PARAM', 'ORDER_SUCCESS', 'SAVE_PLACE'
    ]),
    //初始化数据
    async initData() {
      this.shopDetail = await Api.shopDetail(this.place.shop_id)
      Api.log(`当前数据：${JSON.stringify(this.shopDetail)}`)
      //检验订单是否满足条件
      this.checkoutData = checkout;
      this.SAVE_CART_ID_SIG({ cart_id: this.checkoutData.cart.id, sig: this.checkoutData.sig })
      this.showLoading = false;
    },
    //显示付款方式
    showPayWayFun() {
      this.showPayWay = !this.showPayWay;
    },
    //选择付款方式
    choosePayWay(is_online_payment, id) {
      if (is_online_payment) {
        this.showPayWay = !this.showPayWay;
        this.payWayId = id;
      }
    },
    //地址备注颜色
    iconColor(name) {
      switch (name) {
        case '公司': return '#4cd964';
        case '学校': return '#3190e8';
      }
    },
    //确认订单
    async confrimOrder() {
      //保存订单
      // this.SAVE_ORDER_PARAM({
      //     cart_id: this.checkoutData.cart.id,
      //     address_id: this.choosedAddress.id,
      //     description: this.remarklist,
      //     entities: this.checkoutData.cart.groups,
      //     geohash: this.geohash,
      //     sig: this.checkoutData.sig,
      // // })
      //发送订单信息
      let data = {};
      data['shop_id'] = this.place.shop_id;
      data['table_id'] = this.place.table_id;
      data['total'] = this.totalPrice;
      let goods = [];
      let goods_id = [];
      let goods_num = [];
      this.cartFoodList.forEach((item, index) => {
        Api.log(`当前数据：${JSON.stringify(item)}`)
        goods_id.push(item.id);
        goods_num.push(item.num);
        let obj = {}
        obj['good_id'] = item.id + "";
        obj['good_num'] = item.num + "";
        goods.push(obj);
      })
      // data['goods_id'] = goods_id.toString();
      // data['goods_num'] = goods_num.toString();
      data['goods_info'] = goods;
      Api.log(`goods${JSON.stringify(goods)}`)
      let orderRes;
      try {
        orderRes = await Api.postOrder(data)
      } catch (error) {
        this.showAlert = true;
        this.alertText = `订单提交失败：${JSON.stringify(error)}`;
      }
      this.SAVE_ORDER(orderRes.info);
      Api.log(`orderRes${JSON.stringify(orderRes)}`)
      this.$router.replace({ path: '/waitConfirm' });
    },
  },
  watch: {
    userInfo: function (value) {
      if (value && value.user_id) {
        this.initAddress();
      }
    },
  }
}

</script>

<style lang="scss" scoped>
@import './style';
</style>

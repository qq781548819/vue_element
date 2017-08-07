 <template>
  <div>
    <section v-if="!showLoading" class="shop_container">
      <!-- <nav class="goback" @click="goback">
                                                  <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                    <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3" />
                                                  </svg>
                                                </nav> -->
      <header class="shop_detail_header" ref="shopheader" :style="{zIndex: showActivities? '14':'10'}">
        <img :src="shopDetailData.logo" class="header_cover_img">
        <section class="description_header">
          <div class="description_top">
            <!--to="/shop/shopDetail"-->
            <section class="description_left" @click="cleartoken()">
              <!--设置头像  -->
              <img style="object-fit: cover;" :src="shopDetailData.logo">
            </section>
            <section class="description_right">
              <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
              <!--<p class="description_text">商家配送／{{shopDetailData.order_lead_time}}分钟送达／配送费¥{{shopDetailData.float_delivery_fee}}</p>-->
              <p class="description_promotion ellipsis">公告：{{shopDetailData.notice}}</p>
            </section>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
              <path d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none" />
            </svg>
          </div>
          <footer class="description_footer" v-if="shopDetailData.promotion.length" @click="showActivitiesFun">
            <p class="ellipsis">
              <span class="tip_icon" :style="{backgroundColor: '#F07373', borderColor: '#F07373' }">{{shopDetailData.promotion[0].name}}</span>
              <span>{{shopDetailData.promotion[0].desc}}</span>
            </p>
            <p>{{shopDetailData.promotion.length}}个活动</p>
            <svg class="footer_arrow">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
            </svg>
          </footer>
        </section>
      </header>
      <transition name="fade">
        <section class="activities_details" v-if="showActivities">
          <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>
          <h3 class="activities_ratingstar">
            <rating-star :rating='shopDetailData.rating'></rating-star>
          </h3>
          <section class="activities_list">
            <header class="activities_title_style">
              <span>优惠信息</span>
            </header>
            <ul>
              <li style="margin-bottom: .4rem;" v-for="(item,index) in shopDetailData.promotion" :key="index">
                <span v-if="item.type=='reduce'" class="case-">{{item.icon_name}}</span>
                <span v-else-if="item.type=='new'" class="case-new">{{item.icon_name}}</span>
                <span v-else-if="item.type=='invoice'" class="case-p">{{item.icon_name}}</span>
                <span>{{item.desc}}</span>
              </li>
            </ul>
          </section>
          <section class="activities_shopinfo">
            <header class="activities_title_style">
              <span>商家公告</span>
            </header>
            <p>{{shopDetailData.notice}}</p>
          </section>
          <svg width="60" height="60" class="close_activities" @click.stop="showActivitiesFun">
            <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none" />
            <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2" />
            <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2" />
          </svg>
        </section>
      </transition>
      <section class="change_show_type" ref="chooseType">
        <div>
          <span :class='{activity_show: changeShowType =="food"}' @click="changeShowType='food'">商品</span>
        </div>
        <div>
          <span :class='{activity_show: changeShowType =="rating"}' @click="changeShowType='rating'">商家</span>
        </div>
      </section>
      <transition name="fade-choose">
        <section v-show="changeShowType =='food'" class="food_container">
          <section class="menu_container">
            <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
              <ul>
                <li v-for="(item,index) in menuList" :key="index" class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                  <img :src="item.icon" v-if="item.icon_url">
                  <span>{{item.name}}</span>
                  <span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
                </li>
              </ul>
            </section>
            <section class="menu_right" ref="menuFoodList">
              <ul>
                <li v-for="(item,index) in menuList" :key="index">
                  <header class="menu_detail_header">
                    <section class="menu_detail_header_left">
                      <strong class="menu_item_title">{{item.name}}</strong>
                      <span class="menu_item_description">{{item.description}}</span>
                    </section>
                    <span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>
                    <p class="description_tip" v-if="index == TitleDetailIndex">
                      <span>{{item.name}}</span>
                      {{item.description}}
                    </p>
                  </header>
                  <section v-for="(foods,foodindex) in item.list" :key="foodindex" class="menu_detail_list">
                    <router-link :to="{path: '/foodDetail', query:{id:foods.id}}" tag="div" class="menu_detail_link">
                      <section class="menu_food_img">
                        <img :src="foods.one_logo">
                      </section>
                      <section class="menu_food_description">
                        <h3 class="food_description_head">
                          <strong class="description_foodname">{{foods.name}}</strong>
                        </h3>
                        <p class="food_description_content">{{foods.description}}</p>
                        <p class="food_description_sale_rating">
                          <span>月售{{foods.sale}}份</span>
                          <span>折扣价{{foods.rebate}}%</span>
                        </p>
                      </section>
                    </router-link>
                    <footer class="menu_detail_footer">
                      <section class="food_price">
                        <span>¥</span>
                        <span>{{foods.rebate_price}}</span>
                        <!--<span v-if="foods.rebate_price"></span>-->
                      </section>
                      <buy-cart :shopId='place.shop_id' :foods='foods' @moveInCart="listenInCart" @showChooseList="showChooseList" @showReduceTip="showReduceTip" @showMoveDot="showMoveDotFun"></buy-cart>
                    </footer>
                  </section>
                </li>
              </ul>
            </section>
          </section>
          <section class="buy_cart_container">
            <section @click="toggleCartList" class="cart_icon_num">
              <div class="cart_icon_container" :class="{cart_icon_activity: totalPrice > 0, move_in_cart:receiveInCart}" ref="cartContainer">
                <span v-if="totalNum" class="cart_list_length">
                  {{totalNum}}
                </span>
                <svg class="cart_icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
                </svg>
              </div>
              <div class="cart_num">
                <div>¥ {{totalPrice}}</div>
              </div>
            </section>
            <section class="gotopay" :class="{gotopay_acitvity: this.totalPrice > 0}">
              <span class="gotopay_button_style" v-if="this.totalPrice < 0">请选择菜式</span>
              <span @click="toConfirmOrder" class="gotopay_button_style" v-else>去结算</span>
              <!-- <router-link :to="{path:'/confirmOrder', query:{ place:this.place,cartFoodList:this.cartFoodList,totalPrice:this.totalPrice}}" class="gotopay_button_style" v-else>去结算</router-link> -->
            </section>
          </section>
          <transition name="toggle-cart">
            <section class="cart_food_list" v-show="showCartList&&cartFoodList.length">
              <header>
                <h4>购物车</h4>
                <div @click="clearCart">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
                  </svg>
                  <span class="clear_cart">清空</span>
                </div>
              </header>
              <section class="cart_food_details" id="cartFood">
                <ul>
                  <li v-for="(item, index) in cartFoodList" :key="index" class="cart_food_li">
                    <div class="cart_list_num">
                      <p class="ellipsis">{{item.name}}</p>
                      <p class="ellipsis">{{item.specs}}</p>
                    </div>
                    <div class="cart_list_price">
                      <span>¥</span>
                      <span>{{item.price}}</span>
                    </div>
                    <section class="cart_list_control">
                      <span @click="removeOutCart(item.id, item.name, item.price)">
                        <svg>
                          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                        </svg>
                      </span>
                      <span class="cart_num">{{item.num}}</span>
                      <svg class="cart_add" @click="addToCart(item.id, item.name, item.price)">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                      </svg>
                    </section>
                  </li>
                </ul>
              </section>
            </section>
          </transition>
          <transition name="fade">
            <div class="screen_cover" v-show="showCartList&&cartFoodList.length" @click="toggleCartList"></div>
          </transition>
        </section>
      </transition>
      <transition name="fade-choose">
        <section class="rating_container" id="ratingContainer" v-show="changeShowType =='rating'">
          <section type="2">
            <!--v-load-more="loaderMoreRating"  -->
            <section>
              <header class="rating_header">
                <section class="rating_header_left">
                  <div class="name">{{shopDetailData.name}}</div>
                  <p>
                    <rating-star :rating='shopDetailData.rating'>
                    </rating-star>
                    <span class="rating_num">{{shopDetailData.rating}}</span>
                    <span>月售{{shopDetailData.month_sales}}</span>
                  </p>
  
                </section>
              </header>
              <section style="background-color:#fff;margin-bottom:.3rem;">
                <div class="notice">[公告]{{shopDetailData.notice}}</div>
                <div class="swiper">
                  <swiper style="height:3rem;" :options="swiperOption">
                    <swiper-slide v-for="(item,index) in shopDetailData.biz_img" :key="index" class="swiper-item">
                      <img class="swimg" :src="item" />
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                  </swiper>
                </div>
              </section>
              <section class="activity">
                <div class="title">活动与服务</div>
                <ul>
                  <li v-for="(item,index) in shopDetailData.promotion" :key="index">
                    <span v-if="item.type=='reduce'" class="case-">{{item.icon_name}}</span>
                    <span v-else-if="item.type=='new'" class="case-new">{{item.icon_name}}</span>
                    <span v-else-if="item.type=='invoice'" class="case-p">{{item.icon_name}}</span>
                    <span>{{item.desc}}</span>
                  </li>
                </ul>
              </section>
  
              <section class="biz-info">
                <div class="title">商家信息</div>
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
  
              <section class="biz-license">
                <div class="title">营业资质</div>
                <div class="swiper">
                  <swiper style="height:4rem;" :options="licenseSwiperOption">
                    <swiper-slide v-for="(item,index) in shopDetailData.biz_license" :key="item" class="swiper-item">
                      <img class="swimg" :src="item" />
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                  </swiper>
                </div>
              </section>
            </section>
          </section>
        </section>
      </transition>
    </section>
  
    <section class="person" @touchmove="hubTouchMove" @click="toMe">
      <img class="avatar" src="http://img.jsqq.net/uploads/allimg/150111/1_150111080328_19.jpg"></img>
    </section>
    <transition name="fade">
      <p class="show_delete_tip" v-if="false">多规格商品只能去购物车删除哦</p>
    </transition>
    <!-- 小球  -->
    <transition appear @after-appear='afterEnter' @before-appear="beforeEnter" v-for="(item,index) in showMoveDot" :key="item">
      <span class="move_dot" v-if="item">
        <svg class="move_liner">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
        </svg>
      </span>
    </transition>
    <loading v-show="showLoading || loadRatings"></loading>
    <section class="animation_opactiy shop_back_svg_container" v-if="showLoading">
      <img src="../../images/shop_back_svg.svg">
    </section>
  
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapState, mapMutations } from 'vuex'
import loading from 'src/components/common/loading'
import buyCart from 'src/components/common/buyCart'
import ratingStar from 'src/components/common/ratingStar'
import { loadMore, getImgPath } from 'src/components/common/mixin'
import { imgBaseUrl } from 'src/config/env'
import { setStore, getStore } from 'src/config/mUtils'
import alertTip from 'src/components/common/alertTip'
// import * as WxApi from 'src/afford/wx'

import * as Api from 'src/afford/api'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      showAlert: false, //弹出框
      alertText: null, //弹出框内容
      swiperOption: {
        slidesPerView: 4,
        paginationClickable: false,
        spaceBetween: 20,
        freeMode: true,
        autoplay: 3000,
      },
      licenseSwiperOption: {
        // pagination: '.swiper-pagination',
        slidesPerView: 2,
        paginationClickable: false,
        spaceBetween: 20,
        freeMode: true,
        autoplay: 3000,
      },
      table: null,//扫描二维码后获取的code值
      place: JSON.parse(getStore('place')), //商店id值跟桌号id
      showLoading: true, //显示加载动画
      changeShowType: 'food',//切换显示商品或者评价
      shopDetailData: null, //商铺详情
      showActivities: false, //是否显示活动详情
      menuList: [], //食品列表
      menuIndex: 0, //已选菜单索引值，默认为0
      menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
      shopListTop: [], //商品列表的高度集合
      TitleDetailIndex: null, //点击展示列表头部详情
      categoryNum: [], //商品类型右上角已加入购物车的数量
      totalPrice: 0, //总共价格
      cartFoodList: [], //购物车商品列表
      showCartList: false,//显示购物车列表
      receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
      ratingOffset: 0, //评价获取数据offset值
      ratingTageIndex: 0, //评价分类索引
      preventRepeatRequest: false,// 防止多次触发数据请求
      ratingTagName: '',//评论的类型
      loadRatings: false, //加载更多评论是显示加载组件
      foodScroll: null,  //食品列表scroll
      showSpecs: true,//控制显示食品规格
      specsIndex: 0, //当前选中的规格索引值
      choosedFoods: null, //当前选中视频数据
      showDeleteTip: false, //多规格商品点击减按钮，弹出提示框
      showMoveDot: [], //控制下落的小圆点显示隐藏
      windowHeight: null, //屏幕的高度
      elLeft: 0, //当前点击加按钮在网页中的绝对top值
      elBottom: 0, //当前点击加按钮在网页中的绝对left值
      ratingScroll: null, //评论页Scroll
      imgBaseUrl,
    }
  },
  created() {
    // this.table = this.$route.query.table ? this.$route.query.table : getStore('table');
    this.table = this.$route.query.table ? this.$route.query.table : "Mi1kYTg5YjY1OGI4NmIzZjQxMGMxNzg0Zjk1ZmFiYWRiOC0x";
    //餐桌id
    setStore('table', this.table);
    console.log(this.table);
    this.INIT_BUYCART();
  },
  mounted() {
    this.initData();
    this.windowHeight = window.innerHeight;
  },
  beforeDestroy() {
    // this.foodScroll.removeEventListener('scroll', )
  },
  mixins: [loadMore, getImgPath],
  components: {
    loading,
    ratingStar,
    buyCart,
    swiper,
    swiperSlide,
    alertTip
  },
  computed: {
    ...mapState([
      'latitude', 'longitude', 'cartList', 'token', 'userinfo'
    ]),
    promotionInfo: function () {
      return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
    },
    //还差多少元起送，为负数时显示去结算按钮
    minimumOrderAmount: function () {
      if (this.shopDetailData) {
        return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
      } else {
        return null;
      }
    },
    //当前商店购物信息
    shopCart: function () {
      return { ...this.cartList[this.place.shop_id] };
    },
    //购物车中总共商品的数量
    totalNum: function () {
      let num = 0;
      this.cartFoodList.forEach(item => {
        num += item.num
      })
      return num
    },
  },
  methods: {
    ...mapMutations([
      'SAVE_ORDER', 'SAVE_PLACE', 'ADD_CART', 'REDUCE_CART', 'INIT_BUYCART', 'CLEAR_CART', 'RECORD_SHOPDETAIL', 'RECORD_TOKEN'
    ]),
    //设置确认订单事件
    toConfirmOrder() {
      // Api.log(`当前的总价：${this.totalPrice}`)
      if (this.totalPrice != '0.00') {
        this.$router.push({ path: '/confirmOrder', query: { place: this.place, cartFoodList: this.cartFoodList, totalPrice: this.totalPrice } });
      }
    },
    toMe(event) {
      this.$router.push({ path: '/me' });
    },
    hubTouchMove(event) {
      Api.log(`当前的触摸事件源：${JSON.stringify(event)}`)
      event.preventDefault();//阻止其他事件
      // 如果这个元素的位置内只有一个手指的话
      if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];  // 把元素放在手指所在的位置
        Api.log(`当前的触摸：${JSON.stringify(touch)}`)
        // div.style.left = touch.pageX + 'px';
        // div.style.top = touch.pageY + 'px';
        // div.style.background = "";
      }
    },
    //初始化时获取基本数据
    async initData() {
      try {
        // const token = getStore('token');
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIiLCJpc3MiOiIiLCJhdWQiOiIiLCJzdWIiOiIxMDY4NTUzIiwiaWF0IjoxNTAwNDMxNDMzLCJuYmYiOjE1MDA0MzE0MzMsImV4cCI6MTUzMTk2NzQzMywicGZtIjoiIiwicHJpdiI6IiIsImFyZ3MiOiIifQ.pGJHvbeieX8dYJ7yCS_mTzIP4Q1XQpMOsDMfP3vWkkA";
        const code = this.$route.query.code;
        // if (!token && !code) {
        //   //跳转微信授权
        //   window.location.href = 'http://shouluo.me/wx-ordermeal.php';
        // } else if (!token && code != '') {
        //   //根据授权code返回token
        //   // console.log(code);
        //   const token = (await Api.codelogin(code)).token;
        //   this.RECORD_TOKEN(token);//保存用户token
        //   window.location.href = 'http://big.dx2.me/om/#/shop';
        // }
        // Api.log(`当前的code值是${this.code}`)
        this.place = (await Api.shopCode(this.table)).info;//获取地址信息
        this.SAVE_PLACE(this.place);//保存地址信息
        Api.log(`当前获得的place：${JSON.stringify(this.place)}`)
        if (this.place.status == "0") {
          Api.log(`当前已经有新订单`);
          this.SAVE_ORDER(this.place.new_order);
          //隐藏加载动画
          this.hideLoading();
          // this.showLoading = false;
          this.$router.replace({ path: '/waitConfirm' });
        } else {
          // Api.log(`获得的店铺餐桌信息：${JSON.stringify(this.place)}`)
          this.shopDetailData = (await Api.shopDetail(this.place.shop_id)).info;
          // Api.log(`获得的商店详情：${JSON.stringify(this.shopDetailData)}`)
          this.menuList = (await Api.foodMenu(this.place.shop_id)).info;
          // Api.log(`获得的菜单数据：${JSON.stringify(this.menuList)}`)

          this.RECORD_SHOPDETAIL(this.shopDetailData)
          //隐藏加载动画
          this.hideLoading();
          // Api.log(`隐藏加载`)
          // Api.log(`购物车数据：${JSON.stringify(this.shopCart)}`)
          this.showLoading = false;
        }
      } catch (error) {
        Api.log(`异常出现了:${error}`)
        this.showLoading = false;
        this.showAlert = true;
        this.alertText = `订单提交失败：${JSON.stringify(error)}`;
      }
    },
    //获取食品列表的高度，存入shopListTop
    getFoodListHeight() {
      const listContainer = this.$refs.menuFoodList;
      const listArr = Array.from(listContainer.children[0].children);
      listArr.forEach((item, index) => {
        this.shopListTop[index] = item.offsetTop;
      });
      this.listenScroll(listContainer)
    },
    //当滑动食品列表时，监听其scrollTop值来设置对应的食品列表标题的样式
    listenScroll(element) {
      this.foodScroll = new BScroll(element, {
        probeType: 3,
        deceleration: 0.001,
        bounce: false,
        swipeTime: 2000,
        click: true,
      });

      const wrapperMenu = new BScroll('#wrapper_menu', {
        click: true,
      });

      const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight;
      this.foodScroll.on('scroll', (pos) => {
        if (!this.$refs.wrapperMenu) {
          return
        }
        this.shopListTop.forEach((item, index) => {
          if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
            this.menuIndex = index;
            const menuList = this.$refs.wrapperMenu.querySelectorAll('.activity_menu');
            const el = menuList[0];
            wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight / 2 - 50));
          }
        })
      })
    },
    //控制活动详情页的显示隐藏
    showActivitiesFun() {
      this.showActivities = !this.showActivities;
    },
    //点击左侧食品列表标题，相应列表移动到最顶层
    chooseMenu(index) {
      this.menuIndex = index;
      //menuIndexChange解决运动时listenScroll依然监听的bug
      this.menuIndexChange = false;
      this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
      this.foodScroll.on('scrollEnd', () => {
        this.menuIndexChange = true;
      })
    },
    showTitleDetail(index) {
      if (this.TitleDetailIndex == index) {
        this.TitleDetailIndex = null;
      } else {
        this.TitleDetailIndex = index;
      }
    },
    //加入购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
    addToCart(food_id, name, price) {
      this.ADD_CART({ shopid: this.place.shop_id, food_id, name, price });
    },
    //移出购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
    removeOutCart(food_id, name, price) {
      this.REDUCE_CART({ shopid: this.place.shop_id, food_id, name, price });
    },
    /**
     * 初始化和shopCart变化时，重新获取购物车改变过的数据，赋值 categoryNum，totalPrice，cartFoodList，整个数据流是自上而下的形式，所有的购物车数据都交给vuex统一管理，包括购物车组件中自身的商品数量，使整个数据流更加清晰
     */
    initCategoryNum() {
      this.totalPrice = 0;
      this.cartFoodList = [];
      // Api.log(`更新shopCart:${JSON.stringify(this.shopCart)}`)
      // Api.log(`当前购物车cartList：${JSON.stringify(this.cartList)}`)
      Object.values(this.shopCart).forEach((item, index) => {
        // {"num":106,"id":"9","name":"牛肉面","price":"15.00"}
        if (item.num > 0) {
          // Api.log(`shopCart  item:${JSON.stringify(item)}`)
          //    this.cartFoodList = Object.assign({}, this.cartFoodList, item)
          this.cartFoodList.push(item)
        }
      })
      // Api.log(`this.cartFoodList:${JSON.stringify(this.cartFoodList)}`)
      // Api.log(`this.cartList:${JSON.stringify(this.cartList)}`)
      this.cartFoodList.forEach((item, index) => {
        let num = item['num'];
        let price = item['price']
        this.totalPrice += item.num * item.price;
      })
      this.totalPrice = this.totalPrice.toFixed(2);
      //this.categoryNum = [...newArr];
    },
    //控制购物列表是否显示
    toggleCartList() {
      if (this.cartFoodList) {
        this.cartFoodList.length ? this.showCartList = !this.showCartList : true;
      }
    },
    //清除购物车
    clearCart() {
      this.toggleCartList();
      this.CLEAR_CART(this.place.shop_id);
    },
    //监听圆点是否进入购物车
    listenInCart() {
      if (!this.receiveInCart) {
        this.receiveInCart = true;
        this.$refs.cartContainer.addEventListener('animationend', () => {
          this.receiveInCart = false;
        })
        this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
          this.receiveInCart = false;
        })
      }
    },
    //隐藏动画
    hideLoading() {
      this.showLoading = false;
    },
    //显示规格列表
    showChooseList(foods) {
      if (foods) {
        this.choosedFoods = foods;
      }
      this.showSpecs = !this.showSpecs;
      this.specsIndex = 0;
    },
    //记录当前所选规格的索引值
    chooseSpecs(index) {
      this.specsIndex = index;
    },
    //多规格商品加入购物车
    addSpecs(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock) {
      this.ADD_CART({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock });
      this.showChooseList();
    },
    //显示提示，无法减去商品
    showReduceTip() {
      this.showDeleteTip = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        clearTimeout(this.timer);
        this.showDeleteTip = false;
      }, 3000);
    },
    //显示下落圆球
    showMoveDotFun(showMoveDot, elLeft, elBottom) {
      this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
      this.elLeft = elLeft;
      this.elBottom = elBottom;
    },
    beforeEnter(el) {
      el.style.transform = `translate3d(0,${37 + this.elBottom - this.windowHeight}px,0)`;
      el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`;
      el.children[0].style.opacity = 0;
    },
    afterEnter(el) {
      el.style.transform = `translate3d(0,0,0)`;
      el.children[0].style.transform = `translate3d(0,0,0)`;
      el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
      el.children[0].style.transition = 'transform .55s linear';
      this.showMoveDot = this.showMoveDot.map(item => false);
      el.children[0].style.opacity = 1;
      el.children[0].addEventListener('transitionend', () => {
        this.listenInCart();
      })
      el.children[0].addEventListener('webkitAnimationEnd', () => {
        this.listenInCart();
      })
    },
    goback() {
      this.$router.go(-1);
    },
    //清除购物车
    cleartoken() {
      setStore('token', '');
      console.log('清除缓存!');
    },
  },
  watch: {
    //showLoading变化时说明组件已经获取初始化数据，在下一帧nextTick进行后续操作
    showLoading: function (value) {
      if (!value) {
        this.$nextTick(() => {
          this.getFoodListHeight();
          this.initCategoryNum();
        })
      }
    },
    // shopCart: {
    //     deep: true,
    //     handler(curVal,oldVal) {
    //         Api.log('购物车变化了')
    //         this.initCategoryNum();
    //     }
    // },
    cartList: function (value) {
      // Api.log('购物车变化了')
      this.initCategoryNum();
    },
    //购物车列表发生变化，没有商铺时，隐藏
    cartFoodList: function (value) {
      if (!value.length) {
        this.showCartList = false;
      }
    },
    //商品、评论切换状态
    changeShowType: function (value) {
      if (value === 'rating') {
        this.$nextTick(() => {
          this.ratingScroll = new BScroll('#ratingContainer', {
            probeType: 3,
            deceleration: 0.003,
            bounce: false,
            swipeTime: 2000,
            click: true,
          });
          this.ratingScroll.on('scroll', (pos) => {
            if (Math.abs(Math.round(pos.y)) >= Math.abs(Math.round(this.ratingScroll.maxScrollY))) {
              // this.loaderMoreRating();
              this.ratingScroll.refresh();
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style';
</style>

 <template>
  <div class="main">
    <!-- <head-top :head-title="name" go-back='true'></head-top> -->
   <go-back back-name="返回"></go-back>
    <div class="swiper">
      <swiper style="height:13rem;" :options="swiperOption">
        <swiper-slide v-for="(item,index) in foodDetail.logo" :key="item" class="swiper-item">
          <img class="swimg" :src="item" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  
    <section class="content">
      <p class="title">{{foodDetail.name}}</p>
      <div class="desc">
        <span>月售{{foodDetail.sale}}份</span>
        <span>好评率 99%</span>
      </div>
  
      <div class="desc" style="margin-top:.4rem;">
        {{foodDetail.description}}
      </div>
      <div class="operate" flex="dir:left box:last">
        <div>
          <span class="pd">￥</span>
          <span class="price">{{foodDetail.rebate_price}}</span>
        </div>
  
        <buy-cart :shopId='shopId' :foods='foods' @moveInCart="$emit('moveInCart')"></buy-cart>
      </div>
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
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import headTop from 'src/components/header/head'
import * as Api from 'src/afford/api'
// import { getImgPath } from 'src/components/common/mixin'
// import ratingStar from 'src/components/common/ratingStar'
import buyCart from 'src/components/common/buyCart'
// import { imgBaseUrl } from 'src/config/env'
// import { shopContent, log } from 'src/afford/api'
import goBack from 'src/components/header/goBack'
export default {
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 2000,
      },
      id: 0,
      foodDetail: null,
      totalPrice: 0, //总共价格
      cartFoodList: [], //购物车商品列表
      showCartList: false,//显示购物车列表
    }
  },
  created() {
    this.id = this.$route.query.id;
    Api.log('当前的拿到的id数据：' + this.id)
  },
  mounted() {
    this.initData();
    Api.log('当前的mounted数据：' + this.id)
    this.windowHeight = window.innerHeight;
  },
  // mixins: [getImgPath],
  components: {
    headTop,
    goBack,
    swiper,
    swiperSlide
  },
  props: [],
  methods: {
    async initData() {
      this.foodDetail = (await Api.shopContent(this.id)).info;
      Api.log(`当前的foodDetail数据是：${JSON.stringify(this.foodDetail)}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.main {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ededed;
  z-index: 12; // padding-top: 1.95rem;
}

.content {
  padding: .5rem;
  background-color: #fff;
  .title {
    color: #000;
    font-weight: bold;
    font-size: .8rem;
  }
  .desc {
    color: #999;
    font-size: .5rem;
    margin-top: .3rem;
  }
  .operate {
    margin-top: 1.8rem;
    font-size: .8rem;
    .pd {
      font-size: .6rem;
      color: red;
    }
    .price {
      font-size: .8rem;
      color: red;
      font-weight: bold;
    }
  }
}

.intro {
  background-color: #fff;
  margin-top: .4rem;
  .intro-img {
    width: 100%;
    height: 2rem;
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
  }
}

.goback {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  z-index: 11;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
}

.swiper {
  // padding-top: 1rem; // padding: 0.5rem 0 .5rem 0;
  .swiper-item {
    // background-color: #6d7885;
    // border-radius: .9rem;
    .swimg {
      // width: auto;
      // height: auto;
      // border-radius: .2rem;
      width: 100%;
      height: 100%;
      -ms-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      position: absolute;
      left: 50%;
      top: 50%;
      object-fit: cover;
    }
  }
}

.rating_page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 12;
  padding-top: 1.95rem;
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}

.header_img {
  position: relative;
  .food_img {
    width: 100%;
    display: block;
  }
  .cover {
    position: absolute;
    @include wh(100%, 100%);
    top: 0;
    left: 0;
  }
}

.description {
  @include sc(.6rem, #666);
  margin-top: .5rem;
  line-height: .8rem;
  bottom: .2rem;
  padding: 0 .4rem;
}

.detail_container {
  padding: .5rem;
  @include fj;
  align-items: center;
  .detail_left {
    p:nth-of-type(1) {
      @include sc(.7rem, #333);
      margin-bottom: .2rem;
    }
    .rating_sale {
      display: flex;
      align-items: center;
      span:nth-of-type(1) {
        @include sc(.6rem, #666);
        margin-right: .2rem;
      }
      span:nth-of-type(2) {
        @include sc(.55rem, #f60);
        margin-left: .2rem;
      }
      span:nth-of-type(3) {
        @include sc(.6rem, #666);
        margin-left: .4rem;
      }
    }
    p:nth-of-type(2) {
      font-size: 0;
      margin-top: .3rem;
      span:nth-of-type(1) {
        @include sc(.6rem, #666);
        margin-right: .4rem;
      }
      span:nth-of-type(2),
      span:nth-of-type(3) {
        @include sc(.6rem, #f60);
        margin-right: .2rem;
      }
    }
    p:nth-of-type(3) {
      span {
        @include sc(.6rem, #666);
      }
    }
  }
}

.cart_food_list {
  position: fixed;
  width: 100%;
  padding-bottom: 2rem;
  z-index: 12;
  bottom: 0;
  left: 0;
  background-color: #fff;
  header {
    @include fj;
    align-items: center;
    padding: .3rem .6rem;
    background-color: #eceff1;
    svg {
      @include wh(.6rem, .6rem);
      vertical-align: middle;
    }
    h4 {
      @include sc(.7rem, #666);
    }
    .clear_cart {
      @include sc(.6rem, #666);
    }
  }
  .cart_food_details {
    background-color: #fff;
    max-height: 20rem;
    overflow-y: auto;
    .cart_food_li {
      @include fj;
      padding: .6rem .5rem;
      .cart_list_num {
        width: 55%;
        p:nth-of-type(1) {
          @include sc(.7rem, #666);
          font-weight: bold;
        }
        p:nth-of-type(2) {
          @include sc(.4rem, #666);
        }
      }
      .cart_list_price {
        font-size: 0;
        span:nth-of-type(1) {
          @include sc(.6rem, #f60);
          font-family: Helvetica Neue, Tahoma;
        }
        span:nth-of-type(2) {
          @include sc(.7rem, #f60);
          font-family: Helvetica Neue, Tahoma;
          font-weight: bold;
        }
      }
      .cart_list_control {
        display: flex;
        align-items: center;
        span {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        svg {
          @include wh(.9rem, .9rem);
          fill: #3190e8;
        }
        .specs_reduce_icon {
          fill: #999;
        }
        .cart_num {
          @include sc(.65rem, #666);
          min-width: 1rem;
          text-align: center;
          font-family: Helvetica Neue, Tahoma;
        }
      }
    }
  }
}

.toggle-cart-enter-active,
.toggle-cart-leave-active {
  transition: all .3s ease-out;
}

.toggle-cart-enter,
.toggle-cart-leave-active {
  transform: translateY(100%);
}
</style>

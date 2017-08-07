<template>
    <div>
        <nav class="goback" flex="dir:left cross:center" @click="goback">
            <svg class="i icon" aria-hidden="true">
                <use xlink:href="#icon-back"></use>
            </svg>
            <span class="back">返回</span>
        </nav>
    
        <section class="header" flex="dir:left box:justify">
            <div class="left" flex="main:center cross:center">
                <div flex="cross:center">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-back"></use>
                    </svg>
                    <div flex="dir:top cross:center">
                        <svg class="icon icon-left" xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <use xlink:href="#icon-smile"></use>
                        </svg>
                        <div style="font-size:.5rem;margin-top: .1rem;">当前等级</div>
                        <div style="font-size:.5rem;margin-top: .1rem;font-weight: bold;">V0平民</div>
                    </div>
                </div>
            </div>
            <div class="center" flex="main:center cross:center">
                <div flex="dir:top cross:center">
                    <img class="avatar" src="http://img.jsqq.net/uploads/allimg/150111/1_150111080328_19.jpg"></img>
                    <div style="font-size:.6rem;margin-top:.2rem;">永恒。</div>
                    <div style="font-size:.5rem;margin-top:.1rem;">立即绑定手机号</div>
                </div>
            </div>
            <div class="right" flex="main:center cross:center">
                <div flex="dir:top cross:center">
                    <svg class="icon icon-left" xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <use xlink:href="#icon-trade"></use>
                    </svg>
                    <div style="font-size:.5rem;margin-top: .1rem;">当前积分</div>
                    <div style="font-size:.5rem;margin-top: .1rem;font-weight: bold;">0</div>
                </div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-more"></use>
                </svg>
            </div>
        </section>
    
        <section class="sec1">
            <div class="itemOption" flex="dir:left cross:center" @click="toMember">
                <img class="icon" src="http://img.jsqq.net/uploads/allimg/150111/1_150111080328_19.jpg" />
                <div flex-box="1">我的会员卡</div>
                <svg class="icon svg" aria-hidden="true">
                    <use xlink:href="#icon-more"></use>
                </svg>
            </div>
        </section>
        <section class="sec1" style="margin-top:.4rem;">
            <div class="itemOption" flex="dir:left cross:center" style="border-bottom:1px #ededed solid;" @click="toCoupon">
                <img class="icon" src="http://img.jsqq.net/uploads/allimg/150111/1_150111080328_19.jpg" />
                <div flex-box="1">我的优惠券</div>
                <svg class="icon svg" aria-hidden="true">
                    <use xlink:href="#icon-more"></use>
                </svg>
            </div>
            <div class="itemOption" flex="dir:left cross:center" style="border-bottom:1px #ededed solid;" @click="toOrder">
                <img class="icon" src="http://img.jsqq.net/uploads/allimg/150111/1_150111080328_19.jpg" />
                <div flex-box="1">我的订单</div>
                <svg class="icon svg" aria-hidden="true">
                    <use xlink:href="#icon-more"></use>
                </svg>
            </div>
            <!--<div class="itemOption" flex="dir:left cross:center">
                                                <img class="icon" src="http://img.jsqq.net/uploads/allimg/150111/1_150111080328_19.jpg" />
                                                <div flex-box="1">外卖地址管理</div>
                                                <svg class="icon svg" aria-hidden="true">
                                                    <use xlink:href="#icon-more"></use>
                                                </svg>
                                            </div>-->
        </section>
        <section class="sec1" style="margin-top:.4rem;">
            <div class="itemOption" flex="dir:left cross:center" @click="toBizAct">
                <img class="icon" src="http://img.jsqq.net/uploads/allimg/150111/1_150111080328_19.jpg" />
                <div flex-box="1">商家活动</div>
                <div style="font-size:.4rem;">积分商城</div>
                <svg class="icon svg" aria-hidden="true">
                    <use xlink:href="#icon-more"></use>
                </svg>
            </div>
        </section>
        <section class="sec1" style="margin-top:.4rem;">
            <div class="itemOption" flex="dir:left cross:center" @click="toPersonInfo">
                <img class="icon" src="http://img.jsqq.net/uploads/allimg/150111/1_150111080328_19.jpg" />
                <div flex-box="1">个人信息</div>
                <div style="font-size:.35rem;color:#FB5660">未设置</div>
                <svg class="icon svg" aria-hidden="true">
                    <use xlink:href="#icon-more"></use>
                </svg>
            </div>
        </section>
    
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        toPersonInfo() {
            this.$router.push('/me/personInfo');
        },
        toBizAct() {
            this.$router.push('/me/bizAct');
        },
        toMember() {
            this.$router.push('/me/member');
        },
        toCoupon() {
            this.$router.push('/me/coupon');
        },
        toOrder() {
            this.$router.push('/me/order');
        }
    }
}
</script>
<style lang="scss">
.router-slid-enter-active,
.router-slid-leave-active {
    transition: all .4s;
}

.router-slid-enter,
.router-slid-leave-active {
    transform: translate3d(100%, 0, 0); // opacity: 0;
}

.icon-left {
    color: #f48502;
    font-size: .7rem;
}

.itemOption {
    height: 2rem;
    background: #fff; // line-height: 3rem;
    .icon {
        margin-left: .5rem;
        width: 1.2rem;
        height: 1.2rem; // display: inline-block;
        border-radius: 50%;
    }
    div {
        margin-left: .4rem;
        font-size: .6rem;
    }
    .svg {
        color: #666;
        height: .8rem;
    }
}

.itemOption:active {
    background: #ededed;
}

.goback {
    position: fixed;
    top: 0;
    left: 0;
    width: 20%;
    font-size: .8rem;
    background: #ddd;
    border-radius: 2rem;
    opacity: 0.5;
    height: 1.2rem;
    z-index: 11;
    margin-top: .4rem;
    margin-left: .4rem;
    .i {
        margin-left: .2rem;
        width: .9rem;
    }
    .back {
        font-size: .6rem;
    }
}

.goback:active {
    background: #FDFCE0;
}

.header {
    background: #fff;
    margin-bottom: .5rem;
    width: 100%; // margin-top: 2rem;
    height: 9rem;
    .left {
        width: 4rem;
    }
    .right {
        width: 4rem;
    }
    .center {
        .avatar {
            width: 2.2rem;
            height: 2.2rem;
            border: 2px #3190E8 solid;
            border-radius: 50%;
        }
    }
}
</style>


<template>
    <div class="content">
        <go-back back-name="返回"></go-back>
    
        <div class="center" flex="main:center cross:center">
            <div>
                <img class="avatar" src="http://img.jsqq.net/uploads/allimg/150111/1_150111080328_19.jpg"></img>
            </div>
        </div>
    
        <section class="option">
            <div @click="showPhoneDialog" class="item-option" flex="dir:left cross:center">
                <div class="title" flex-box="1">手机</div>
                <div class="desc">+86</div>
                <div style="font-size:.5rem;color:#3190E8;margin-left:.6rem;">修改</div>
                <svg class="icon svg" aria-hidden="true">
                    <use xlink:href="#icon-more"></use>
                </svg>
            </div>
            <div class="item-option" flex="dir:left cross:center">
                <div class="title" flex-box="1">生日</div>
                <svg class="icon svg" aria-hidden="true">
                    <use xlink:href="#icon-xiugai-copy"></use>
                </svg>
                <div class="desc">请设置您的生日</div>
                <svg class="icon svg" aria-hidden="true">
                    <use xlink:href="#icon-more"></use>
                </svg>
            </div>
            <div class="item-option" flex="dir:left cross:center">
                <div class="title" flex-box="1">性别</div>
                <div class="desc">男</div>
                <svg class="icon svg" aria-hidden="true">
                    <use xlink:href="#icon-more"></use>
                </svg>
            </div>
            <div class="item-option" flex="dir:left cross:center">
                <div class="title" flex-box="1">纪念日</div>
                <svg class="icon svg" aria-hidden="true">
                    <use xlink:href="#icon-xiugai-copy"></use>
                </svg>
                <div class="desc">请设置您的纪念日</div>
                <svg class="icon svg" aria-hidden="true">
                    <use xlink:href="#icon-more"></use>
                </svg>
            </div>
            <div class="item-option" flex="dir:left cross:center">
                <div class="title" flex-box="1">我的口味偏好</div>
                <svg class="icon svg" aria-hidden="true">
                    <use xlink:href="#icon-xiugai-copy"></use>
                </svg>
                <div class="desc">请设置您的口味偏好</div>
                <svg class="icon svg" aria-hidden="true">
                    <use xlink:href="#icon-more"></use>
                </svg>
            </div>
        </section>
    
        <transition name="fade" v-if="isShowPhoneDialog">
            <section class="dialog_container">
                <div class="dialog-phone">
                    <svg @click="closePhoneDialog" style="margin-bottom:.3rem;"  class="icon close" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                    <div style="height:10rem;" flex="dir:top cross:center main:center">
                        <img class="avatar" style="margin-bottom:.5rem;" src="http://img.jsqq.net/uploads/allimg/150111/1_150111080328_19.jpg"></img>
                        <div class="desc" style="margin-bottom:.5rem;">客官，为了更好的服务您，请告诉老夫您的手机号码。</div>
                        <div class="input"style="margin-bottom:.5rem;" flex="dir:left cross:center">
                            <div style="margin-right:.6rem;font-size:.5rem;">+86</div>
                            <input placeholder="请输入手机号码" />
                        </div>
                        <div flex="dir:left cross:center">
                            <input class="input" placeholder="请输入验证码" />
                            <button class="yzm-btn">获取验证码</button>
                        </div>
                    </div>
                </div>
            </section>
    
        </transition>
    
    </div>
</template>
<script>
import goBack from 'src/components/header/goBack'
export default {
    data() {
        return {
            isShowPhoneDialog: false
        }
    },
    components: {
        goBack
    },
    methods: {
        showPhoneDialog() {
            this.isShowPhoneDialog = true;
        },
        closePhoneDialog() {
            this.isShowPhoneDialog = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ededed;
    z-index: 12;
    padding-top: 1.95rem;
}

.center {
    // background: #fff;
    margin-bottom: .5rem;
    width: 100%;
    height: 5rem;
    .avatar {
        width: 2.5rem;
        height: 2.5rem;
        border: .1rem #3190E8 solid;
        border-radius: 50%;
    }
}

.option {
    background: #3190E8;
    .item-option {
        border-bottom: 1px #ededed solid;
        height: 1.8rem;
        background: #fff;
        padding-left: .6rem;
        padding-right: .6rem;
        .title {
            font-size: .6rem;
            color: #000;
        }
        .desc {
            font-size: .5rem;
            color: #888;
        }
        .svg {
            height: .8rem;
        }
    }
    .item-option:active {
        background: #ededed;
    }
}

.dialog_container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5)!important;
    background-color: #000;
    filter: Alpha(opacity=50);
    z-index: 200;
}

.dialog-phone {
    position: fixed;
    top: 50%;
    left: 50%;
    opacity: 1;
    width: 80%;
    border-radius: .2rem; // box-shadow: 2px 2px 5px #888888;
    height: 12rem;
    background: #fff;
    transform: translate(-50%, -50%);
    .close {
        float: right;
    }
    .avatar {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
    }
    .desc {
        font-size: .5rem;
        width: 7rem;
        text-align: center;
        color: #000;
    }
    .input {
        border: #ededed 1px solid;
        border-radius: .1rem;
        box-shadow: -2px -2px -2px #ededed;
        padding: .2rem;
    }
    .yzm-btn {
        padding: .2rem;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.fade-choose-enter-active,
.fade-choose-leave-active {
    transition: opacity .5s;
}

.fade-choose-leave,
.fade-choose-leave-active {
    display: none;
}

.fade-choose-enter,
.fade-choose-leave-active {
    opacity: 0;
}
</style>

<template>
    <transition name="fade">
        <div v-show="true" style="width:100%;height:100%;">
            <img src="http://img3.imgtn.bdimg.com/it/u=2187225516,2113509847&fm=26&gp=0.jpg" />
        </div>
    </transition>
</template>

<script >
// import BScroll from 'better-scroll';
// import cartControl from '../cartControl/cartControl.vue';
// import split from '../split/split.vue';
// import ratingselect from '../ratingselect/ratingselect.vue';
// import Vue from 'vue';
// import { formatDate } from '../../common/js/date';
// //  const POSITIVE = 0;
// //  const NEGATIVE = 1;
// const ALL = 2;
export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        };
    },
    methods: {
        show() {
            this.showFlag = true;
            // this.selectType = ALL;
            this.onlyContent = true;
            // this.$nextTick(() => {
            //     if (!this.scroll) {
            //         this.scroll = new BScroll(this.$el, {
            //             click: true
            //         });
            //     } else {
            //         this.scroll.refresh();
            //     }
            // });
        },
        // incrementTotal(type, data) {
        //     this[type] = data;
        //     this.$nextTick(() => {
        //         this.scroll.refresh();
        //     });
        // },
        // hide() {
        //     this.showFlag = false;
        // },
        // addFirst(event) {
        //     if (!event._constructed) {
        //         return;
        //     }
        //     Vue.set(this.food, 'count', 1);
        // },
        // needShow(type, text) {
        //     if (this.onlyContent && !text) {
        //         return false;
        //     }
        //     if (this.selectType === ALL) {
        //         return true;
        //     } else {
        //         return type === this.selectType;
        //     }
        // }
    },
    // filters: {
    //     formatDate(time) {
    //         let date = new Date(time);
    //         return formatDate(date, 'yyyy-MM-dd hh:mm');
    //     }
    // },
    // components: {
    //     cartControl,
    //     ratingselect,
    //     split
    // }
};
</script>
<style lang="scss" >
.food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 201;
    width: 100%;
    background: orange;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s linear transform translate3d(0, 0, 0)
}

.fade-enter,
.fade-leave-active {
    opacity: 0 transform translate3d(100%, 0, 0)
}
</style>

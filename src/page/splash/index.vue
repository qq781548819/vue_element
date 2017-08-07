<template>
    <div>
        <loading v-show="showLoading"></loading>
        <section style="width:100%; height:100%;" class="bg" v-if="!showLoading" @click="next">
            <!-- <img class=" img"  src="http://sjbz.fd.zol-img.com.cn/t_s320x510/g5/M00/03/0C/ChMkJljbkR6IFq_zAAIkZQDr7ocAAbLUQAfviIAAiR9002.jpg" /> -->
            <div class=" header">
                <img id="img" class="animated infinite bounce avater" :src="info.img" />
                <div style="color: #fff;">您好，{{info.nickname}}</div>
            </div>
        </section>
        <!-- <button >我的按钮，点我到下一页</button> -->
    </div>
</template>
<script>
import { userInfo, log } from 'src/afford/api'
import loading from 'src/components/common/loading'
export default {
    data() {
        return {
            info: null,
            showLoading: true
        }
    },
    components: {
        loading
    },
    mounted() {
        this.initData();
        // this.windowHeight = window.innerHeight;
    },
    created() {

    },
    methods: {
        initData() {
            userInfo()
                .then(data => {
                    //let info = JSON.parse(data);
                    this.info = data.info;
                    log(JSON.stringify(data))
                    this.showLoading = false;
                }).catch(err => {
                    log(err)
                })
        },
        next() {
            this.$router.push('shop')
        }
    }
}
</script>
<style lang="scss" scoped>
.img {
    position: fixed;
    width: 100%;
    height: 100%;
}

.bg {
    position: fixed;
    background: url(http://sjbz.fd.zol-img.com.cn/t_s320x510/g5/M00/03/0C/ChMkJljbkR6IFq_zAAIkZQDr7ocAAbLUQAfviIAAiR9002.jpg) top left;
    background-size: 100% 100%;
    overflow: hidden; // background:   url(http://sjbz.fd.zol-img.com.cn/t_s320x510/g5/M00/03/0C/ChMkJljbkR6IFq_zAAIkZQDr7ocAAbLUQAfviIAAiR9002.jpg) no-repeat top left 100% 100%;
    .header {
        position: absolute; // width: 15rem;
        // height: 15rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        font-size: 0.75rem;
        text-align: center;
        .avater {
            margin-bottom: 0.5rem;
            border-radius: 50%;
            width: 100px;
            height: 100px;
        }
    }
}
</style>
<template>
    <div>
        <nav class="goback" flex="dir:left cross:center" @click="goback">
            <svg class="i icon" aria-hidden="true">
                <use xlink:href="#icon-back"></use>
            </svg>
            <span class="back">{{backName}}</span>
        </nav>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted(){

    },
    props:["backName"],
    methods: {
        goback() {
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
.goback {
    position: fixed;
    top: 0;
    left: 0;
    width: 20%;
    font-size: .8rem;
    // background: #ddd;
    border-radius: 2rem;
    opacity: 0.5;
    height: 1.2rem;
    z-index: 12;
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
</style>

<template>
  <div class="position">
    <i class="iconfont">&#xe60e;</i>
    <span class="address"
      >马当路5号出口马当路5号出口马当路5号出口马当路5号出口马当路5号出口马当路5号出口5号出口</span
    >
    <i class="iconfont">&#xe6dd;</i>
  </div>
  <div class="search">
    <i class="iconfont">&#xe602;</i>
    <span class="placeholder">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="" />
  </div>
  <div class="icons">
    <div class="item" v-for="(item, index) in iconList" :key="index">
      <img :src="item.imgUrl" alt="" />
      <span>{{item.title}}</span>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: "StaticPart",
  setup() {
    const iconList = [
      {imgUrl: "http://www.dell-lee.com/imgs/vue3/超市.png", title: "超市便利"},
      {imgUrl: "http://www.dell-lee.com/imgs/vue3/菜市场.png", title: "菜市场"},
      {imgUrl: "http://www.dell-lee.com/imgs/vue3/水果店.png", title: "水果店"},
      {imgUrl: "http://www.dell-lee.com/imgs/vue3/鲜花.png", title: "鲜花店"},
      {imgUrl: "http://www.dell-lee.com/imgs/vue3/医药健康.png", title: "医药健康"},
      {imgUrl: "http://www.dell-lee.com/imgs/vue3/家居.png", title: "家居时尚"},
      {imgUrl: "http://www.dell-lee.com/imgs/vue3/蛋糕.png", title: "烘焙蛋糕"},
      {imgUrl: "http://www.dell-lee.com/imgs/vue3/签到.png", title: "签到"},
      {imgUrl: "http://www.dell-lee.com/imgs/vue3/大牌免运.png", title: "大牌免运"},
      {imgUrl: "http://www.dell-lee.com/imgs/vue3/红包.png", title: "红包套餐"},
    ];
    return {
      iconList
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/css/constance.scss';
@import '../../assets/css/mixin.scss';
.position {
  height: 0.22rem;
  line-height: 0.22rem;
  margin: 0.15rem 0;
  font-size: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $color_333;
  .iconfont {
    font-size: 0.18rem;
  }
  .address {
    flex: 1;
    margin-left: 0.05rem;
    @include textNoWrapper();
  }
}
.search {
  width: 100%;
  line-height: 0.32rem;
  background: #f5f5f5;
  border-radius: 0.16rem;
  color: #b7b7b7;
  .iconfont {
    padding-left: 0.15rem;
    font-size: 0.16rem;
  }
  .placeholder {
    font-size: 14px;
    margin-left: 0.08rem;
  }
}
.banner {
  width: 100%;
  margin-top: 0.1rem;
  // 防止图片加载下面元素抖动
  overflow: hidden;
  height: 0;
  padding-bottom: 25.4%;
  img {
    width: 100%;
  }
}
.icons {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 0.15rem;
  .item {
    margin-top: 0.15rem;
    width: 20%;
    text-align: center;

    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    img {
      width: 0.4rem;
      height: 0.4rem;
      vertical-align: middle;
    }
    span {
      font-size: 12px;
      margin-top: 0.1rem;
      color: $color_333;
    }
  }
}
.gap {
  height: 0.1rem;
  background-color: #f1f1f1;
  margin: 0 -0.15rem;
}
</style>
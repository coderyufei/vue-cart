<template>
  <div class="shop-info">
    <img class="pic" :src="shopInfo.imgUrl" alt="" />
    <div class="info">
      <div class="title">{{ shopInfo.name }}</div>
      <div class="basic">
        <span>月售：{{ shopInfo.sales }}</span>
        <span>起送：{{ shopInfo.expressLimit }}</span>
        <span>基础运费：{{ shopInfo.expressPrice }}</span>
        <span></span>
      </div>
      <div class="vip">{{ shopInfo.slogan }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopInfo",
  props: {
    shopInfo: Object,
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/css/constance.scss";
@import "../assets/css/mixin.scss";
.shop-info {
  display: flex;
  color: $color_333;
  padding-bottom: 0.15rem;
  margin-top: 0.15rem;
  &:last-child {
    border-bottom: none;
  }
  .pic {
    width: 0.6rem;
    height: 0.6rem;
    vertical-align: middle;
  }
  .info {
    margin-left: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 16px;
    }
    .basic {
      span {
        margin-right: 0.15rem;
      }
    }
    .vip {
      color: #e93b3b;
    }
  }
}
</style>
<template>
  <div class="top">
      <div class="header">
        <div class="back iconfont" @click="goBack">&#xe61d;</div>
        <div class="title">确认订单</div>
      </div>
      <div class="address-wrapper">
        <div class="my-address">收货地址</div>
        <div class="location">
          <span class="location-info">上海市马当路</span>
          <span class="iconfont arrow">&#xe61d;</span>
        </div>
        <div class="info">
          <span class="name">隔壁老王</span>
          <span class="mobile">13800001111</span>
        </div>
      </div>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "TopArea",
  setup() {
    const router = useRouter();
    const goBack = () => {
      router.go(-1);
    };
    return {
      goBack
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/constance.scss';
.top {
    box-sizing: border-box;
    height: 1.96rem;
    position: relative;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(
      0deg,
      rgba(0, 145, 255, 0) 4%,
      #0091ff 50%
    );
    margin-bottom: 0.2rem;
    background-repeat: no-repeat;
    .header {
      position: absolute;
      left: 0;
      top: 0.2rem;
      height: 0.44rem;
      line-height: 0.44rem;
      /* background-color: #f00; */
      position: relative;
      text-align: center;
      .back {
        position: absolute;
        left: 0.1rem;
        font-size: 0.24rem;
        color: #fff;
      }
      .title {
        margin: 0 auto;
        font-size: 16px;
        color: #fff;
      }
    }
    .address-wrapper {
      border-radius: 0.04rem;
      width: 3.4rem;
      height: 1.1rem;
      /* border: 1px solid #eee; */
      background-color: #fff;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      .my-address {
        font-size: 16px;
        color: $color_333;
        margin: 0.2rem 0 0 0.2rem;
      }
      .location {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.1rem 0.2rem 0;
        .location-info {
          font-size: 14px;
          color: #333;
        }
        .arrow {
          transform: rotateY(-180deg);
          font-size: 0.2rem;
          color: #333;
        }
      }
      .info {
        margin: 0.1rem 0 0 0.2rem;
        color: #666;
        .name {
          margin-right: 0.1rem;
        }
      }
    }
  }
</style>

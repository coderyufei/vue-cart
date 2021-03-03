<template>
  <div class="wrapper">
    <div class="top-search">
      <div class="back" @click="handleBackClick">
        <i class="iconfont">&#xe61d;</i>
      </div>
      <div class="search">
        <i class="iconfont">&#xe602;</i>
        <input class="placeholder" placeholder="请输入商品名称" />
      </div>
    </div>
  </div>
  <ShopInfo :shopInfo="shopInfo.item" class="shopInfo" v-if="shopInfo.item.imgUrl" />
  <Content :shopName="shopInfo.item.name"/>
  <Cart />
</template>

<script>
import { reactive } from 'vue';
import {useRouter, useRoute} from 'vue-router';
import ShopInfo from "../../components/ShopInfo";
import Content from './Content';
import Cart from './Cart';
import {get} from '../../utils/request';

const useBackEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  }
  return {
    handleBackClick
  }
}

const getShopInfo = () => {
  const route = useRoute();
  const shopInfo = reactive({item: {}});
  get(`/api/shop/${route.params.id}`).then(res => {
    shopInfo.item = res.data;
  })
  return {
    shopInfo,
  }
}
export default {
  name: "Shop",
  components: {
    ShopInfo,
    Content,
    Cart
  },
  setup() {
    const {handleBackClick} = useBackEffect();
    const {shopInfo} = getShopInfo();
    return {
      handleBackClick,
      shopInfo
    };
  },
};
</script>


<style lang="scss" scoped>
@import "../../assets/css/constance.scss";
@import "../../assets/css/mixin.scss";
.wrapper {
  .top-search {
    display: flex;
    justify-content: space-between;
    margin-top: 0.15rem;
    padding: 0 0.15rem;
    box-sizing: border-box;
    .back {
      width: 0.32rem;
      height: 0.32rem;
      line-height: 0.32rem;
      text-align: left;
      margin-left: -0.1rem;
      .iconfont {
        font-size: 0.3rem;
        color: #999;
      }
    }
    .search {
      flex: 1;
      line-height: 0.32rem;
      background: #f5f5f5;
      border-radius: 0.16rem;
      color: #b7b7b7;

      display: flex;
      .iconfont {
        padding-left: 0.15rem;
        font-size: 0.16rem;
      }
      .placeholder {
        flex: 1;
        background-color: #f5f5f5;
        height: 0.32rem;
        font-size: 14px;
        margin-left: 0.08rem;
        border-top-right-radius: 0.16rem;
        border-bottom-right-radius: 0.16rem;
      }
    }
  }
}
.shopInfo {
  margin-left: 0.18rem;
}
</style>
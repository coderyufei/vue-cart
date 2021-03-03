<template>
  <div class="near">
    <h3>附件店铺</h3>
    <ShopInfo v-for="item in nearByList" :key="item._id" :shopInfo="item" @click="handerClick(item._id)"/>
  </div>
</template>

<script>
import ShopInfo from '../../components/ShopInfo';

import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {get} from '../../utils/request';
const useNearByEffect = () => {
  const nearByList = ref([]);
  get("/api/shop/hot-list").then(res => {
    // console.log(res.data);
    nearByList.value = res.data;
  }).catch(err => {
    console.log(err);
  })
  return {
    nearByList
  }
}
export default {
  name: "Near",
  components: {
    ShopInfo
  },
  setup() {
    const {nearByList} = useNearByEffect();
    const router = useRouter();
    const handerClick = (id) => {
      router.push({
        path: `/shop/${id}`
      })
    }
    return {
      nearByList,
      handerClick
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/constance.scss';
@import '../../assets/css/mixin.scss';
@import '../../assets/css/pushAnimation.scss';
.near {
  h3 {
    font-size: 16px;
    margin-top: 0.15rem;
  }
  .item {
    display: flex;
    color: $color_333;
    border-bottom: 1px solid #f1f1f1;
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
}
</style>
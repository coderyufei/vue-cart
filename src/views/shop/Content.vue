<template>
  <div class="content">
    <div class="category">
      <div
        v-for="(item, index) in categoryList"
        :key="item"
        :class="['item', { active: index === currentIndex }]"
        @click="itemClick(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="product">
      <div class="item" v-for="item in contentData" :key="item._id">
        <img :src="item.imgUrl" alt="" />
        <div class="detal">
          <p class="title">{{item.name}}</p>
          <p class="sales">月售{{item.sales}}件</p>
          <div class="price">
            <div class="price-info">
              <span class="new-price">￥{{item.price}}</span>
              <span class="old-price">￥{{item.oldPrice}}</span>
            </div>
            <div class="op">
              <div class="minus">
                <span 
                class="iconfont"
                @click="() => {changeCartItem(shopId, item._id, item, -1)}"
                v-if="cartList?.[shopId]?.productList?.[item._id]?.count > 0"
              >
                &#xe71e;
              </span>
              </div>
              <span 
                class="num"
                v-if="getCurrentCount(shopId, item._id)"
              >
                <!-- {{cartList?.[shopId]?.productList?.[item._id]?.count || 0}} -->
                {{getCurrentCount(shopId, item._id)}}
              </span>
              <div class="add">
                <span 
                class="iconfont" 
                @click="() => {changeCartItem(shopId, item._id, item, 1)}"
              >
                &#xe603;
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';
import {get} from '../../utils/request';

const getContentDataEffect = () => {
  const contentData = ref([]);
  const getContentData = (id, type) => {
    get(`/api/shop/${id}/products?tab=${type}`).then(res => {
      contentData.value = res.data;
    })
  }
  return {
    getContentData,
    contentData
  }
}

// 购物车相关
const useCartEffect = () => {
  const store = useStore();
  const {cartList} = toRefs(store.state);
  const changeItemToCart = (shopId, productId, productInfo, num) => {
    store.commit("changeItemToCart", {
      shopId, productId, productInfo, num
    });
  }
  return {
    cartList,
    changeItemToCart
  }
}
export default {
  name: "Content",
  props: ['shopName'],
  setup(props) {
    const route = useRoute();
    const {getContentData, contentData} = getContentDataEffect();
    const shopId = route.params.id;
    getContentData(shopId, "all");

    const categoryList = ref(["全部", "秒杀", "新鲜水果"]);
    const types = ["all", "seckill", "fruit"];
    const currentIndex = ref(0);
    const itemClick = (index) => {
      currentIndex.value = index;
      getContentData(shopId, types[index]);
    };

    const {cartList, changeItemToCart} = useCartEffect();
    const changeCartItem = (shopId, productId, item, num) => {
      changeItemToCart(shopId, productId, item, num);
      changeShopName(shopId, props.shopName);
    }

    const store = useStore();
    const changeShopName = (shopId, shopName) => {
      store.commit("changeShopName", {
        shopId, shopName
      })
    }

    const getCurrentCount = (shopId, productId) => {
      return cartList?.value?.[shopId]?.productList?.[productId]?.count || 0
    }

    return {
      categoryList,
      currentIndex,
      itemClick,
      contentData,
      shopId,
      cartList,
      changeCartItem,
      getCurrentCount
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/constance.scss";
@import '../../assets/css/mixin.scss';
.content {
  width: 100%;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
  .category {
    overflow-y: scroll;
    background-color: #f5f5f5;
    width: 0.76rem;
    .item {
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      color: $color_333;
      font-size: 14px;
      &.active {
        background: #fff;
      }
    }
  }
  .product {
    flex: 1;
    overflow: auto;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 0.12rem 0;
      margin: 0 0.16rem;
      border-bottom: 1px solid #f5f5f5;
      overflow: hidden;
      img {
        display: inline-block;
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 0.08rem;
      }
      .detal {
        margin-left: 0.15rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 0.7rem;
        color: $color_333;
        .title {
          font-size: 14px;
          font-weight: bold;
          @include textNoWrapper();
        }
        .price {
          display: inline-block;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price-info {
            flex: 1;
            .new-price {
            color: #e93b3b;
            font-size: 14rem;
            }
            .old-price {
              text-decoration: line-through;
              color: #999;
              font-size: 12rem;
              margin-left: 0.1rem;
            }
          }
          .op {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .num {
              font-size: 0.16rem;
              margin: 0 0.06rem;
            }

            .iconfont {
              width: 0.2rem;
              height: 0.2rem;
              font-size: 0.18rem;
            }
            .minus {
              color: #666;
              display: inline-block;
              text-align: center;
              width: 0.2rem;
              height: 0.2rem;
              line-height: 0.2rem;
            }
            .add {
              color: $theme_color;
              display: inline-block;
              text-align: center;
              font-size: 0.18rem;
              width: 0.2rem;
              height: 0.2rem;
              line-height: 0.2rem;
            }
          }
        }
      }
    }
  }
}
</style>
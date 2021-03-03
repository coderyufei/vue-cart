<template>
  <div class="mask" v-if="showCart && counter > 0" @click="handleShowCart"></div>
  <div class="cart">
    <div class="product" v-if="showCart && counter > 0">
      <div class="checkCart">
        <span
          :class="['iconfont circle', { checked: checked }]"
          @click="allCheck(shopId)"
          >&#xe604;</span
        >
        <span>全选</span>
        <span @click="clearCart(shopId)">清空购物车</span>
      </div>
      <template v-for="item in contentData" :key="item._id">
        <div v-if="item.count > 0" class="item">
          <span
            :class="['circle iconfont', { isCheck: item.check }]"
            @click="changeProductChecked(shopId, item._id)"
            >&#xe604;</span
          >
          <img :src="item.imgUrl" alt="" />
          <div class="detal">
            <div class="left">
              <p class="title">{{ item.name }}</p>
              <div class="price">
                <div>
                  <span class="new-price">￥{{ item.price }}</span>
                  <span class="old-price">￥{{ item.oldPrice }}</span>
                </div>
              </div>
            </div>
            <div class="op">
              <i
                class="iconfont minus"
                @click="
                  () => {
                    changeItemToCart(shopId, item._id, item, -1);
                  }
                "
              >
                &#xe71e;
              </i>
              <div class="num">
                {{ item.count || 0 }}
              </div>
              <i
                class="iconfont add"
                @click="
                  () => {
                    changeItemToCart(shopId, item._id, item, 1);
                  }
                "
              >
                &#xe603;
              </i>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          alt=""
          @click="handleShowCart"
        />
        <span>{{ counter }}</span>
      </div>
      <div class="price">
        <span>总计：</span>
        <span class="total">￥{{ total }}</span>
      </div>
      <div class="btn" v-if="counter > 0">
        <router-link :to="{path: `/OrderConfirmation/${shopId}`}">去结算</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";

const useCartEffect = (shopId) => {
  const store = useStore();
  const cartList = store.state.cartList;
  // 计算总价
  const total = computed(() => {
    const productList = cartList?.[shopId]?.productList;
    if (!productList) return 0;
    let sum = 0;
    for (let productId in productList) {
      const item = productList[productId];
      if (item.check) {
        sum += item.count * item.price;
      }
    }
    return sum.toFixed(2);
  });
  // 商品个数
  const counter = computed(() => {
    const productList = cartList?.[shopId]?.productList;
    if (!productList) return 0;
    let sum = 0;
    for (let productId in productList) {
      const item = productList[productId];
      sum += item.count;
    }
    return sum;
  });

  // 计算是否全选
  const checked = computed(() => {
    const productList = cartList?.[shopId]?.productList;
    if (!productList) {
      return false;
    }
    let result = true;
    for (let productId in productList) {
      const item = productList[productId];
      if (!item.check) {
        result = false;
        break;
      }
    }
    return result;
  });

  // 商品数据
  const contentData = computed(() => {
    const productList = cartList[shopId]?.productList || [];
    return productList;
  });

  // 是否选中
  const changeProductChecked = (shopId, productId) => {
    store.commit("changeProductChecked", {
      shopId,
      productId,
    });
  };
  // 显示和隐藏购物车
  const showCart = ref(false);
  const toggleShowCart = () => {
    const handleShowCart = () => {
      showCart.value = !showCart.value;
    };
    return {
      showCart,
      handleShowCart
    }
  }

  // 清除购物车
  const clearCart = (shopId) => {
    showCart.value = false;
    store.commit("clearCart", {
      shopId,
    });
  };
  // 全选
  const allCheck = (shopId) => {
    store.commit("allCheck", {
      shopId,
    });
  };
  return {
    total,
    counter,
    contentData,
    cartList,
    changeProductChecked,
    clearCart,
    allCheck,
    checked,
    toggleShowCart
  };
};
export default {
  name: "Cart",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const {
      total,
      counter,
      contentData,
      changeProductChecked,
      clearCart,
      allCheck,
      checked,
      toggleShowCart
    } = useCartEffect(shopId);

    const store = useStore();
    const changeItemToCart = (shopId, productId, productInfo, num) => {
      store.commit("changeItemToCart", {
        shopId,
        productId,
        productInfo,
        num,
      });
    };

    const {showCart,handleShowCart} = toggleShowCart();
    return {
      total,
      counter,
      shopId,
      contentData,
      changeItemToCart,
      changeProductChecked,
      clearCart,
      allCheck,
      checked,
      showCart,
      handleShowCart,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/constance.scss";
@import "../../assets/css/mixin.scss";
.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.cart {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;

  .product {
    background-color: #fff;
    .checkCart {
      height: 0.5rem;
      display: flex;
      align-items: center;
      background-color: #fff;
      border-bottom: 1px solid #f5f5f5;
      padding: 0 0.16rem;
      span {
        font-size: 14px;
        &:nth-of-type(1) {
          width: 0.14rem;
          height: 0.14rem;
          font-size: 16px;
          display: inline-block;
        }
        &.checked {
          color: $theme_color;
        }
        &:nth-of-type(2) {
          flex: 1;
          margin-left: 0.16rem;
        }
      }
    }
    .item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0.12rem 0;
      margin: 0 0.16rem;
      border-bottom: 1px solid #f5f5f5;
      overflow: hidden;
      .circle {
        width: 0.14rem;
        height: 0.14rem;
        &.isCheck {
          color: $theme_color;
        }
      }
      img {
        display: inline-block;
        width: 0.46rem;
        height: 0.46rem;
        border-radius: 0.08rem;
        margin-left: 0.2rem;
      }
      .detal {
        margin-left: 0.15rem;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.46rem;
        color: $color_333;
        .left {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          .title {
            font-size: 14px;
            font-weight: bold;
            @include textNoWrapper();
            margin-bottom: 0.1rem;
          }
          .price {
            display: inline-block;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .new-price {
              color: #e93b3b;
              font-size: 14px;
            }
            .old-price {
              text-decoration: line-through;
              color: #999;
              font-size: 12px;
              margin-left: 0.1rem;
            }
          }
        }

        .op {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .iconfont {
            text-align: center;
            font-size: 0.18rem;
          }
          .minus {
            color: #666;
          }
          .add {
            color: $theme_color;
          }
          .num {
            padding: 0 0.1rem;
            font-size: 14px;
          }
        }
      }
    }
  }
  .check {
    z-index: 99;
    background: #fff;
    border-top: 1px solid #f5f5f5;
    box-sizing: border-box;
    height: 0.5rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.84rem;
      height: 0.5rem;
      line-height: 0.5rem;
      background-color: #fff;
      position: relative;
      text-align: center;
      overflow: hidden;
      img {
        width: 0.28rem;
        height: 0.26rem;
        vertical-align: middle;
        position: absolute;
        left: 45%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      span {
        position: absolute;
        left: 0.46rem;
        top: 0.06rem;
        background: #f00;
        height: 0.14rem;
        line-height: 0.14rem;
        padding: 0 0.06rem;
        border-radius: 0.07rem;
        color: #fff;
      }
    }
    .btn {
      width: 0.98rem;
      background-color: $theme_color;
      line-height: 0.5rem;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .price {
      flex: 1;
      color: $color_333;
      margin-left: 0.1rem;
      .total {
        font-size: 18px;
        color: #f00;
      }
    }
    .btn {
      a {
        color: #fff;
      }
    }
  }
}
</style>


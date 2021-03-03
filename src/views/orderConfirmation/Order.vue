<template>
  <div class="bottom">
    <div class="total-money">
      <span class="tip">实付金额</span>
      <span class="money">￥{{ total }}</span>
    </div>
    <div class="submit" @click="handlerSubmitClick">提交订单</div>
  </div>
  <div class="mask" v-if="showMask" @click="handleCancleClick">
    <div class="pay-info">
      <div class="title">确认要离开收银台?</div>
      <div class="tip">请尽快完成支付，否则将被取消</div>
      <div class="op">
        <span class="cancle" @click.stop="handleCancleClick">取消订单</span>
        <span class="confirm" @click.stop="handleConfirmClick">确认支付</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {useStore} from 'vuex';
import {post} from '../../utils/request';
export default {
  name: "Order",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const shopId = route.params.id;
    const cartList = JSON.parse(localStorage.cartList);
    const productInfo = cartList[shopId];
    const shopName = productInfo.shopName;
    const productList = productInfo.productList;

    // 计算总价
    const total = computed(() => {
      let sum = 0;
      for (let productId in productList) {
        const item = productList[productId];
        if (item.check) {
          sum += item.count * item.price;
        }
      }
      return sum.toFixed(2);
    });

    const showMask = ref(false);
    const handlerSubmitClick = () => {
      showMask.value = true;
    }

    const handleCancleClick = () => {
      showMask.value = false;
    }
    const handleConfirmClick = () => {
      let products = [];
      for (let productId in productList) {
        const item = productList[productId];
        let obj = {
          id: item._id,
          num: item.count
        }
        products.push(obj);
      }
      post("/api/order", {
        addressId: 1,
        shopId,
        shopName,
        isCancled: false,
        products
      }).then((res) => {
          console.log(res);
          store.commit("clearCart", {shopId});
          router.push("/orderList");
        })
        .catch(err => {
          console.log(err);
        });
    }
    return {
      total,
      showMask,
      handlerSubmitClick,
      handleCancleClick,
      handleConfirmClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/constance.scss";
.bottom {
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  .total-money {
    margin-left: 0.2rem;
    .tip {
      font-size: 14px;
    }
    .money {
      font-size: 14px;
      font-weight: bold;
      margin-left: 0.1rem;
    }
  }
  .submit {
    width: 0.98rem;
    line-height: 0.5rem;
    color: #fff;
    background: $theme_color;
    text-align: center;
    font-size: 14px;
  }
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  .pay-info {
    width: 2.7rem;
    height: 1.4rem;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.05rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 16px;
      font-weight: bold;
      color: $color_333;
      margin-top: 0.2rem;
    }
    .tip {
      color: #999;
      margin-top: 0.15rem;
    }
    .op {
      margin-top: 0.25rem;
      span {
        display: inline-block;
        border: 1px solid $theme_color;
        padding: 0 0.12rem;
        margin: 0 0.1rem;
        line-height: 0.26rem;
        border-radius: 0.13rem;
        &.cancle {
          color: $theme_color;
        }
        &.confirm {
          background-color: $theme_color;
          color: #fff;
        }
      }
    }
  }
}
</style>

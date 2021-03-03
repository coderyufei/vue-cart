<template>
  <div class="products">
      <div class="title">{{ shopName }}</div>
      <div class="product-list">
        <template v-for="item in productList" :key="item._id">
        <div class="item" v-if="item.count > 0">
          <img :src="item.imgUrl" alt="" />
          <div class="detal">
            <p class="name">{{ item.name }}</p>
            <div class="price-info">
              <span class="price">￥{{ item.price }} x {{ item.count }}</span>
              <span class="total-price"
                >￥{{ (item.price * item.count).toFixed(2) }}</span
              >
            </div>
          </div>
        </div>
        </template>
      </div>
    </div>
</template>

<script>
import {useRoute} from 'vue-router';
export default {
  name: "ProductList",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const cartList = JSON.parse(localStorage.cartList);
    const productInfo = cartList[shopId];
    const shopName = productInfo.shopName;
    const productList = productInfo.productList;

    return {
      shopName,
      productList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/constance.scss';
.products {
    width: 3.4rem;
    margin: 0 auto;
    background-color: #fff;
    overflow-y: scroll;
    /* overflow: hidden; */
    /* margin-bottom: 0.7rem; */
    position: absolute;
    left: 0;
    right: 0;
    top: 2.1rem;
    bottom: 0.6rem;
    .title {
      margin-top: 0.15rem;
      margin-left: 0.2rem;
      font-size: 16px;
      color: $color_333;
    }
    .product-list {
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.2rem 0.2rem;
        img {
          width: 0.46rem;
          height: 0.46rem;
        }
        .detal {
          height: 0.46rem;
          margin-left: 0.1rem;
          flex: 1;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name {
            font-size: 14px;
            font-weight: bold;
            /* margin-bottom: 0.1rem; */
          }
          .price-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price {
              color: #f00;
              font-size: 14px;
            }
            .total-price {
              color: #000;
            }
          }
        }
      }
    }
  }
</style>

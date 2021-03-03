<template>
  <div class="wrapper">
    <div class="header">
      <div class="title">我的订单</div>
    </div>
    <div class="orders-wrapper">
      <div class="orders" v-for="(item, index) in list" :key="index">
        <div class="top">
          <span>{{item.shopName}}</span>
          <span>{{item.isCancled ? "已完成" : "已取消"}}</span>
        </div>
        <div class="bottom">
          <div class="icons">
            <img
              v-for="(innerItem, idx) in item.products"
              :key="idx"
              class="icon"
              :src="innerItem.product.img"
              alt=""
            />
          </div>
          <div class="price">
            <div class="total">￥{{item.products.total}}</div>
            <div class="count">共{{item.products.num}}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue';
import {get} from '@/utils/request';
export default {
  name: "OrderList",
  setup() {
    const orderList = reactive({list: []});
    get("/api/order").then(res => {

      // 总价
      let sum = 0;
      let num = 0;
      const dataList = res.data;
      dataList.forEach(item => {
        const products = item.products;
        products.forEach(innerItem => {
          const count = innerItem.orderSales; 
          sum += count * innerItem.product.price;
          num += count;
        })
        products.total = sum.toFixed(2);
        products.num = num;
      });
      orderList.list = dataList;
    })

    const {list} = toRefs(orderList);

    return {
      list
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/constance.scss";
.wrapper {
  background-color: #f5f5f5;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .header {
    background-color: #fff;
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
    .title {
      height: 0.44rem;
      line-height: 0.44rem;
      font-size: 16px;
      color: $color_333;
    }
  }
  .orders-wrapper {
    overflow: auto;
    position: absolute;
    top: 0.44rem;
    left: 0;
    right: 0;
    bottom: 0.5rem;
    .orders {
      margin: 0.1rem 0;
      padding: 0 0.25rem;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      .top {
        display: flex;
        justify-content: space-between;
        margin-top: 0.1rem;
        span {
          font-size: 14px;
          &:first-child {
            color: $color_333;
          }
          &:last-child {
            color: #999;
          }
        }
      }
      .bottom {
        /* background-color: blue; */
        margin-top: 0.15rem;
        display: flex;
        justify-content: space-between;
        .icons {
          margin-bottom: 0.15rem;
          overflow-x: scroll;
          display: flex;
          flex-wrap: nowrap;
          margin-right: 0.1rem;
          /* //隐藏滚动条
        &::-webkit-scrollbar {
          display: none
        } */
          .icon {
            width: 0.32rem;
            height: 0.32rem;
            margin-right: 0.1rem;
            border-radius: 0.05rem;
          }
        }
        .price {
          display: flex;
          flex-direction: column;
          align-items: center;
          .total {
            color: #f00;
            font-size: 14px;
          }
          .count {
            color: $color_333;
            margin-top: 0.05rem;
          }
        }
      }
    }
  }
}
</style>

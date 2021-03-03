<template>
  <div class="wrapper">
    <TopArea/>
    <ProductList/>
    <Order/>
  </div>
</template>

<script>
import TopArea from './TopArea';
import ProductList from './ProductList';
import Order from './Order';
export default {
  name: "OrderConfirmation",
  components: {
    TopArea,
    ProductList,
    Order
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/constance.scss";
.wrapper {
  overflow-y: scroll;
  position: absolute;
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="tabbar">
    <div v-for="(item, index) in tabbarList" 
         :key="index"
         :class="{'item': true, 'item-active': $route.path === item.path}"
         @click="switchTab(item.path)"
    >
      <div class="iconfont" v-html="item.icon"></div>
      <span>{{item.title}}</span>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
export default {
  name: "TabBar",
  setup() {
    const tabbarList = [
      {icon: "&#xe601;", title: "首页", to: {name: "Home"}, path: '/home'},
      {icon: "&#xe60a;", title: "购物车", to: {name: "CartList"}, path: '/cartList'},
      {icon: "&#xe600;", title: "订单", to: {name: "OrderList"}, path: '/orderList'},
      {icon: "&#xe649;", title: "我的", to: {name: "Profile"}, path: '/profile'},
    ];
    const router = useRouter();
    const switchTab = (path) => {
      router.replace(path);
    }

    return {
      tabbarList,
      switchTab
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/constance.scss";
@import "../assets/css/mixin.scss";
.tabbar {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 0.49rem;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ddd;
  color: $color_333;
  .item {
    flex: 1;
    text-align: center;
    &.item-active {
      color: $theme_color;
    }
    .iconfont {
      font-size: 0.2rem;
    }
    span {
      display: inline-block;
      margin-top: 0.03rem;
    }
  }
}
</style>
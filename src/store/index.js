import { createStore } from 'vuex'

const setCartList = (state) => {
  const {cartList} = state;
  const cartListString = JSON.stringify(cartList);
  localStorage.cartList = cartListString;
}

const getCartList = () => {
  if (localStorage.cartList) {
    return JSON.parse(localStorage.cartList)
  } else {
    return {}
  }
}

export default createStore({
  state: {
    cartList: getCartList()
    // cartList: {
    //   // shopId: {
    //   //   shopName: "",
    //   //   productList: {
    //   //     id1: {
    //   //       name: "",
    //   //       count: 0,
    //   //       check: false
    //   //     },
    //   //     id2: {
    //   //       name: "",
    //   //       count: 0,
    //   //       check: false
    //   //     }
    //   //   }
    //   // }
    // }
  },
  mutations: {
    changeItemToCart(state, params) {
      const {shopId, productId, productInfo, num} = params;
      let shopInfo = state.cartList[shopId] || {
        shopName: "", productList: {}
      };
      let product = shopInfo.productList[productId];
      if (!product) {
        // product = productInfo,
        // product.count = 0;
        productInfo.count = 0;
        product = productInfo;
      }
      product.count += num;

      if (product.count < 0) {
        product.count = 0;
      }

      if (num > 0) {
        product.check = true;
      }
      shopInfo.productList[productId] = product;
      state.cartList[shopId] = shopInfo;
      setCartList(state);
    },
    changeShopName(state, params) {
      const {shopId, shopName} = params;
      let shopInfo = state.cartList[shopId] || {
        shopName: "", productList: {}
      };
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
      setCartList(state);
    },
    changeProductChecked(state, params) {
      const {shopId, productId} = params;
      let shopInfo = state.cartList[shopId];
      let product = shopInfo.productList[productId];
      product.check = !product.check;
      setCartList(state);
    },
    clearCart(state, params) {
      const {shopId} = params;
      state.cartList[shopId].productList = {};
      setCartList(state);
    },
    allCheck(state, params) {
      const {shopId} = params;
      let shopInfo = state.cartList[shopId].productList;
      for(let i in shopInfo) {
        let item = shopInfo[i];
        item.check = true;
      }
      setCartList(state);
    }
  },
  actions: {
  },
  modules: {
  }
})

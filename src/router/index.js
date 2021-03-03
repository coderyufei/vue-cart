import { createRouter, createWebHashHistory } from 'vue-router'

import Home from "../views/home/Home.vue";
import Register from "../views/login/Register.vue";
import Login from "../views/login/Login";

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      showTab: true
    }
  },
  {
    path: "/cartList",
    name: "CartList",
    component: () => import('../views/cartList/CartList'),
    meta: {
      showTab: true
    }
  },
  {
    path: "/orderList",
    name: "OrderList",
    component: () => import('../views/order/OrderList'),
    meta: {
      showTab: true
    }
  },
  {
    path: "/orderConfirmation/:id",
    name: "OrderConfirmation",
    component: () => import('../views/orderConfirmation/OrderConfirmation.vue'),
    meta: {
      showTab: false
    }
  },
  {
    path: "/shop/:id",
    name: "Shop",
    component: () => import("../views/shop/Shop.vue"),
    meta: {
      showTab: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      showTab: false
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import('../views/profile/Profile.vue'),
    meta: {
      showTab: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      showTab: false
    },
    // beforeEnter: (to, from, next) => {
    //   const isLogin = localStorage.getItem("isLogin");
    //   if (isLogin) {
    //     next({name: "Home"});
    //   } else {
    //     next()
    //   }
    // }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem("isLogin");
  if(isLogin || to.name === "Login" || to.name === "Register") {
    next();
  } else {
    next({name: "Login"})
  }
})

export default router

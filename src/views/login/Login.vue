<template>
  <div class="wrapper">
    <div class="login-logo">
      <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" />
    </div>
    <input
      type="text"
      class="username"
      placeholder="用户名"
      v-model="phoneNo"
    />
    <br />
    <input
      type="password"
      class="pwd"
      placeholder="请输入密码"
      v-model="password"
    />
    <br />
    <div class="login" @click="loginBtnClick">登录</div>
    <div class="register" @click="handleRegiste">立即注册</div>
    <Toast v-if="toastData.isShow" :msg="toastData.toastMsg" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

const useLoginEffect = (showToast) => {
    const router = useRouter();
    const data = reactive({
      phoneNo: "",
      password: "",
    });
    
    const loginBtnClick = () => {
      const {phoneNo, password} = data;
      if (phoneNo === '' || password === '') {
        showToast("用户名或密码错误");
        return;
      }
      post("/api/user/login", {
        username: data.phoneNo,
        password: data.password,
      }).then((res) => {
          console.log(res);
          if (res.errno === 0) {
            localStorage.setItem("isLogin", true);
            router.replace({ name: "Home" });
          } else {
            showToast("登录失败");
          }
        })
        .catch(err => {
          console.log(err);
          showToast("请求失败");
        });
    };
    const {phoneNo, password} = toRefs(data)
    return {
      phoneNo,
      password,
      loginBtnClick
    }
}

export default {
  name: "Login",
  components: {
    Toast,
  },
  setup() {
    const router = useRouter();
    const {toastData, showToast} = useToastEffect();
    const {phoneNo, password, loginBtnClick} = useLoginEffect(showToast);
    
    const handleRegiste = () => {
      router.replace({ name: "Register" });
    };

    return {
      phoneNo,
      password,
      loginBtnClick,
      handleRegiste,
      toastData
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/constance.scss";
.wrapper {
  /* background-color: #f00; */
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0 0.4rem;
  .login-logo {
    width: 0.66rem;
    height: 0.66rem;
    margin: 0 auto;
    img {
      width: 0.66rem;
      height: 0.66rem;
    }
  }
  input {
    width: 100%;
    height: 0.5rem;
    margin-top: 0.15rem;
    border-radius: 0.04rem;
    background-color: #f9f9f9;
    font-size: 16px;
    border: 1px solid #ddd;
    text-indent: 1em;
    &::placeholder {
      color: #999;
    }
  }
  .username {
    margin-top: 0.5rem;
  }
  .login {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: #0091ff;
    box-shadow: 0 0.04rem 0.08rem rgb(0 145 255 / 32%);
    border-radius: 0.04rem;
    margin-top: 0.3rem;
    text-align: center;
    color: #fff;
    font-size: 16px;
  }
  .register {
    text-align: center;
    color: #777;
    margin-top: 0.15rem;
    font-size: 14px;
  }
}
</style>
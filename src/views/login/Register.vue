<template>
  <div class="wrapper">
    <div class="login-logo">
      <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="">
    </div>
    <input type="text" class="username" placeholder="请输入用户名" v-model="phoneNo">
    <br>
    <input type="password" class="pwd" placeholder="请输入密码" v-model="password">
    <br>
    <input type="password" class="comfirm-pwd" placeholder="确认密码" v-model="confirmPassword">
    <div class="register" @click="registerBtnClick">注册</div>
    <div class="login" @click="handleLogin">已有账号去登录</div>
    <Toast v-if="toastData.isShow" :msg="toastData.toastMsg"/>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request";
import Toast, {useToastEffect} from "../../components/Toast";

const useRegisterEffect = (showToast) => {
    const router = useRouter();
    const data = reactive({
      phoneNo: "",
      password: "",
      confirmPassword: ""
    });
    
    const registerBtnClick = () => {
      post("/api/user/register", {
        username: data.phoneNo,
        password: data.password,
        confirmPassword: data.confirmPassword
      }).then((res) => {
          console.log(res);
          if (res.errno === 0) {
            router.replace({ name: "Login" });
          } else {
            showToast("注册失败");
          }
        })
        .catch(err => {
          console.log(err);
          showToast("请求失败");
        });
    };
    const {phoneNo, password, confirmPassword} = toRefs(data)
    return {
      phoneNo,
      password,
      confirmPassword,
      registerBtnClick
    }
}

export default {
  name: "Register",
  components: {
    Toast
  },
  setup() {
    const router = useRouter();
    const handleLogin = () => {
      router.replace({name: "Login"})
    }
    const {toastData,showToast} = useToastEffect();
    const {phoneNo,password,confirmPassword,registerBtnClick} = useRegisterEffect(showToast);
    return {
      phoneNo,
      password,
      confirmPassword,
      handleLogin,
      toastData,
      registerBtnClick
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/constance.scss';
.wrapper {
  /* background-color: #f00; */
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
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
  }
  .username {
    margin-top: 0.5rem;
  }
  .register {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: #0091FF;
    box-shadow: 0 0.04rem 0.08rem rgb(0 145 255 / 32%);
    border-radius: 0.04rem;
    margin-top: 0.3rem;
    text-align: center;
    color: #fff;
    font-size: 16px;
  }
  .login {
    text-align: center;
    color: #777;
    margin-top: 0.15rem;
    font-size: 14px;
  }
}
</style>
<template>
  <div class="toast">{{msg}}</div>
</template>

<script>
import {reactive} from 'vue';
export const useToastEffect = () => {
  const toastData = reactive({
    isShow: false,
    toastMsg: "",
  });

  const showToast = (msg) => {
    toastData.isShow = true;
    toastData.toastMsg = msg;
    setTimeout(() => {
      toastData.isShow = false;
      toastData.toastMsg = "";
    }, 2000);
  };

  return {
    toastData,
    showToast
  }
};

export default {
  name: "Toast",
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
.toast {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  height: 0.3rem;
  line-height: 0.3rem;
  text-align: center;
  border-radius: 0.05rem;
  padding: 0 0.2rem;
}
</style>
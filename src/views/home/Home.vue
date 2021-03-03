<template>
  <div class="wrapper">
    <StaticPart />
    <Near />
  </div>
</template>

<script>
import StaticPart from "./StaticPart";
import Near from "./Near";
export default {
  name: "Home",
  components: {
    StaticPart,
    Near
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/constance.scss";
@import "../../assets/css/mixin.scss";
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.15rem;
  box-sizing: border-box;
}
</style>

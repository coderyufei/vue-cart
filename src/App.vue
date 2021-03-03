<template>
  <keep-alive>
    <router-view/>
  </keep-alive>
  <TabBar v-if="$route.meta.showTab"/>
</template>

<script>
import TabBar from "@/components/TabBar";
export default {
  name: "App",
  components: {
    TabBar
  }
}
</script>
<style lang="scss" scoped>
@import "./assets/css/constance.scss";
@import "./assets/css/mixin.scss";
</style>

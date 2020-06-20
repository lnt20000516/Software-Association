<template>
  <div class="siae">
    <pageHeader :activeIndex="Index"></pageHeader>
    <router-view />
    <div id="universe-box">
      <img  src="@/assets/img/back/1.gif" alt width="260px" />
    </div>
  </div>
</template>
<script>
import pageHeader from "@/components/siae/header.vue";
import "@/assets/js/background.js";
export default {
  name: "siae",
  data() {
    return {
      Index: "/homePage"
    };
  },
  components: {
    pageHeader
  }
};
</script>
<style scoped>
#universe-box {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>

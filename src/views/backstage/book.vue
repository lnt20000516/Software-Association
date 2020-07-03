<template>
  <div class="book within">
    <transition name="component" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      maxH: 0,
      maxW: 0
    };
  },
  watch: {
    "$parent.$data.maxH": function(newVal) {
      this.maxH = newVal;
    },
    "$parent.$data.maxW": function(newVal) {
      this.maxW = newVal;
    }
  },
  mounted() {
    this.maxH = this.$parent.$data.maxH;
    this.maxW = this.$parent.$data.maxW;
  }
};
</script>
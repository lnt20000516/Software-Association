<template>
    <div>
    首页管理
    <p>开发中...</p>
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

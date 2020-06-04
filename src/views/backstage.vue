<template>
  <div class="HomePage">
    <el-container>
      <el-aside style=" width: 230px;">
        <backAside ref="aside"></backAside>
      </el-aside>
      <el-container style="background:none;">
        <el-main>
          <div class="outer">
            <transition name="component" mode="out-in">
              <router-view />
            </transition>
          </div>
        </el-main>
        <asideRight></asideRight>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import backAside from "@/components/backstage/aside.vue";
import asideRight from "@/components/backstage/aside-right.vue";

export default {
  name: "Home",

  components: {
    backAside,
    asideRight
  }
};
</script>
<style >
.component-enter,
.component-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
/* v-enter-active 入场动画时间段 */
/* v-leave-active 离场动画时间段 */

.component-enter-active,
.component-leave-active {
  transition: all 0.3s ease;
}
.el-main {
  color: #333;
  text-align: center;
  position: absolute;
  left: 180px;
  right: 0;
  top: -50px;
  bottom: 0;
  overflow-y: scroll;
  background-color: rgb(248, 250, 249);
}
.aside {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: white;
  width: 50px;
  background-color: #5b626b;
}

.el-container {
  width: 100%;
  margin-bottom: 40px;
}

.el-aside {
  background-color: white;
  padding: 0;
  box-shadow: 0px 0px 5px 0px #eeeeee;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
}
.outer {
  margin: 50px 50px;
  height: 100%;
  background-color: white;
  border-radius: 10px !important;
  box-shadow: 0px 0px 20px 5px #eeeeee;
}
.within {
  overflow: hidden !important;
  background-color: white;
  border-radius: 10px !important;
  padding: 40px 80px;
  min-width: 750px;
}
</style>

<template>
  <div class="imgCar">
  <el-carousel :interval="5000" type="card" height="400px">
    <el-carousel-item v-for="item in imgCars" :key="item" style="{backgroundImage:item}">
    <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
  </div>
</template>
<script>
export default {
    name:'imgCar',
    props: {
        imgCars: Array
    }
}
</script>
<style>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 400px;
    margin: 0;
  }
  .imgCar img{
      height: 100%;
      width: 100%;
  }
</style>
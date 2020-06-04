<template>
<div class="Aside">
    <div style="padding:20px;display: flex;align-items: center;">
         <img src="../../assets/img/logo.png" alt="" class="logo">
         <h2 class="logo-title">软件协会</h2>
      </div>
    <el-menu :default-active="index" class="el-menu-demo"  @open="handleOpen"
      @close="handleClose"  background-color="white"
                         text-color="#222222"
                         active-text-color="rgb(63,171,235)" router>
        <el-submenu v-for="item in sort" :key="item.menuId" :index="'/Backstage/'+item.url">
        <template slot="title">
          <span v-html="item.icon"></span>&nbsp;
          <span>{{item.name}}</span>
        </template>
          <el-menu-item  v-for="children in item.childList" :key="children.menuId" :index="'/backstage/'+children.url"><span v-html="children.icon"></span>&nbsp;{{children.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
</div>
</template>

<script>

export default {
    name:'Aside',
    data() {
        return {
            sort:[],
            accountName: '',
            index: '',
        }
    },
    created() {
        this.setIndex()
        this.allSort()
    },
    methods: {
      allSort(){
        let _this=this
       this.$axios("sys/menu/nav",{
          method:'get',
        }).then(res=>{
          _this.sort=res.data.data
        })

       },
        setIndex() {
            this.index = this.$route.fullPath
        },
  
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    watch: {
        '$route.fullPath': function () {
            this.setIndex()
        }
    },
}
</script>

<style scoped>
.logo {
    display: inline;
    height: 30px;
}

.logo-title {
    color: rgb(64,171,234);
    display: inline;
    font-weight: 400;

}

.menu-right {
    float: right;
}
.el-menu{
    font-weight: 500;
    text-align: left;
}
.el-menu-item{
    padding: auto 20px;
}
.el-menu-item:hover,.el-submenu:hover{
    background-color: rgb(227,239,248)!important;
}
</style>

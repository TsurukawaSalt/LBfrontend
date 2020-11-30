<template>
  <el-header class="header">
    <el-input class="search" placeholder="请输入你要查找的内容" v-model="input">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>

    <el-link class="r_con" :underline="false">登录</el-link>
    <el-link class="r_con" :underline="false">注册</el-link>
  </el-header>
</template>

<script>
export default {
  name: "header",
  data(){
    return {
      input:'',
    }
  }
}
</script>

<style scoped>
  .header {
    background-color: #2c3e50;
    margin: -10px -10px 0 -10px;
    padding: 0;
    /*//margin: 0;*/
    /*//padding: 0;*/
    /*//text-align: center;*/
  }
  .search {
    width: 40%;
    margin: 10px;
  }
  .r_con {
    margin: 20px;
    float: right;

  }
</style>
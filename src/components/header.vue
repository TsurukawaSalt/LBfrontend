<template>
  <div>
    <el-header class="header">
      <el-input class="h_search" placeholder="请输入你要查找的内容"  v-model="keyword" @keyup.enter.native="goSearch()">
        <el-button slot="append" icon="el-icon-search" @click="goSearch()"></el-button>
      </el-input>

      <el-link class="r_con" :underline="false">登录</el-link>
      <el-link class="r_con" :underline="false">注册</el-link>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "header",
  data(){
    return {
      keyword:'',
    }
  },
  methods:{
    goSearch(){
      if (!this.keyword) {
        alert("搜索内容为空")
      } else {
        this.$router.push({
          name:"AcademicSearch",
          params:{
            keyword:this.keyword
          }
        })
      }
    },
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
  .h_search {
    width: 40%;
    margin: 10px;
  }
  .r_con {
    margin: 20px;
    float: right;

  }
</style>
<template>
  <div class="page">
    <el-link class="title" :underline="false">
      Logo
    </el-link>
    <el-input class="search" placeholder="请输入你要查找的内容" prefix-icon="el-icon-search" v-model="keyword" @keyup.enter.native="goSearch()">
        <el-button class="button" slot="append" @click="goSearch()">搜索</el-button>
    </el-input>
    <div class="top_block">
      <el-row>
        <el-link :underline="false">站内功能</el-link>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6" v-for="(o) in 4" :key="o">
          <el-card class="card" shadow="hover"> 功能</el-card>
        </el-col>
      </el-row>
    </div>
    <div class="middle_block">
      <div class="left_block">
        <el-row v-for="(o) in this.academic_list" :key="o.title">
          <el-link class="list_title" :underline="false">{{ o.title }}</el-link>
          <br>
          <el-link class="list_author" :underline="false">{{o.author}}{{o.year}}</el-link>
        </el-row>
      </div>
      <div class="right_block">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"homePage",
  data() {
    return {
      keyword:'',
      academic_list:[
        {title:'123456', year:2020, author:'ABC', cited:195},
        {title:'654321', year:2020, author:'ABC', cited:195},
        {title:'111111', year:2020, author:'ABC', cited:195},
        {title:'222222', year:2020, author:'ABC', cited:195},
        {title:'333333', year:2020, author:'ABC', cited:195},

        {title:'444444', year:2020, author:'ABC', cited:195},
        {title:'555555', year:2020, author:'ABC', cited:195},
        {title:'666666', year:2020, author:'ABC', cited:195},
        {title:'888888', year:2020, author:'ABC', cited:195},
        {title:'777777', year:2020, author:'ABC', cited:195},
      ]
    }
  },
  methods: {
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
  .page{
    position: relative;
    min-width: 940px;
    //max-width: 1500px;
    min-height: 800px;
    //left: 10%;
  }

  .title {
    position: absolute;
    top: 27%;
    left: 25%;
    width: 50%;
    font-size: 70px;

  }
  .search {
    position: absolute;
    top: 40%;
    left: 25%;
    width: 50%;
  }
  .search >>> .el-input__inner {
    border-radius: 25px 0 0 25px;
    border-width: 2px;
    border-color: #245cc0;
    font-size: 18px;
    height: 60px;
  }
  .search >>> .el-input__prefix .el-input__icon {
    margin-left: 5px;
    font-size: 18px;
  }
  .search >>> .el-input-group__append{
    border-width: 0;
    background: rgba(0,0,0,0);
  }
  .search >>> .el-input-group__append .el-button {
    border-radius: 0 25px 25px 0;
    border-width: 10px;
    background: #245cc0;
    height: 60px;
    width: 100px;
    font-size: 18px;
    color: white;
  }
  .top_block {
    //background: blue;
    margin: -8px;
    padding: 0;
    position: absolute;
    top: 50%;
    left: 10%;
    //right: 10%;
    width: 80%;
    height: 20%;
  }
  .top_block .el-row{
    width: 100%;
  }
  .top_block .el-row .el-link {
    left: -40%;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #2461ea;
  }

  .card {
    margin: 5px;
    width: 95%;
    height: 30%;
  }

  .middle_block {
    //background: red;
    margin: -8px;
    padding: 0;
    position: absolute;
    top: 70%;
    //left: 10%;
    width: 80%;
    height: 100%;
    //display: flex;
  }
  .left_block {
    //background: black;
    //margin: -8px;
    padding: 0;
    position: absolute;
    //top: 80%;
    float: left;
    width: 100%;
    height: 100%;
  }
  .left_block .el-row {
    left: -25%;
    margin-bottom: 20px;
  }
  .left_block .el-row .el-link {

  }

  .list_title {
    font-size: 20px;
  }
  .list_author{
    left: -5px;
    font-size: 5px;
  }

  .right_block {
    background: blue;
    //margin: -8px;
    padding: 0;
    position: absolute;
    //top: 80%;
    float: left;
    margin-left: 80%;
    width: 30%;
    height: 100%;
  }
</style>
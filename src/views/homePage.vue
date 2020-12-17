<template>
  <div class="page">
    <Header status="2"></Header>
    <el-link class="title" :underline="false">
      Logo
    </el-link>
    <el-input class="search" placeholder="请输入你要查找的内容" v-model="search_words.kw" @keyup.enter.native="goSearch(false)">
      <el-button v-popover:popover type="text" class="h_button" slot="prepend" icon="el-icon-caret-bottom">高级搜索</el-button>
      <el-button class="button" slot="append" @click="goSearch(false)">搜索</el-button>
    </el-input>
    <el-popover
        ref="popover"
        placement="bottom"
        width="400"
        :offset="170"
        title="高级搜索"
        trigger="click">
      <el-form ref="searchForm" :model="searchForm" label-width="80px">
        <el-form-item label="检索词">
          <el-input v-model="search_words.kw"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="search_words.expert"></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="search_words.origin"></el-input>
        </el-form-item>
        <el-form-item label="发表时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择起始日期" v-model="search_words.startTime" style="width: 90%"></el-date-picker>
          </el-col>
<!--          <el-col class="line" :span="1"> - </el-col>-->
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择截至日期" v-model="search_words.endTime" style="width: 90%"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button @click="goSearch(true)">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-popover>
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
        <h4>热门文献</h4>
        <div class="list_left">
          <el-row class="list_item" v-for="(o, index) in this.academic_list.slice(0, 5)" :key="index">
            <el-link class="list_title" :underline="false" @click="goArticle()">{{ o.title }}</el-link>
            <el-link class="list_cited" :underline="false">{{o.cited}}</el-link>
            <br>
            <el-link class="list_author" :underline="false">{{o.author}} {{o.year}}</el-link>
          </el-row>
        </div>
        <div class="list_right">
          <el-row class="list_item" v-for="(o, index) in this.academic_list.slice(5, 10)" :key="index">
            <el-link class="list_title" :underline="false" @click="goArticle()">{{ o.title }}</el-link>
            <el-link class="list_cited" :underline="false">{{o.cited}}</el-link>
            <br>
            <el-link class="list_author" :underline="false">{{o.author}} {{o.year}}</el-link>
          </el-row>
        </div>
      </div>
      <div class="right_block">
        <h4>热门关键词</h4>
        <el-row class="keyword_list" v-for="(o, index) in this.hot_keywords" :key="index">
            <el-link class="keyword" :underline="false" @click="goSearch(o)">{{o}}</el-link>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
export default {
  name:"homePage",
  data() {
    return {
      // keyword:'',
      academic_list:[
        {title:'1234566666666666', year:2020, author:'ABC', cited:195},
        {title:'654321', year:2020, author:'ABC', cited:195},
        {title:'111111', year:2020, author:'ABC', cited:195},
        {title:'222222', year:2020, author:'ABC', cited:195},
        {title:'333333', year:2020, author:'ABC', cited:195},

        {title:'444444', year:2020, author:'ABC', cited:195},
        {title:'555555', year:2020, author:'ABC', cited:195},
        {title:'666666', year:2020, author:'ABC', cited:195},
        {title:'888888', year:2020, author:'ABC', cited:195},
        {title:'777777', year:2020, author:'ABC', cited:195},
      ],
      hot_keywords:[
          'ABC',
          'DEF',
          'GHI',
          'JKL',
          'MNO',
          'PQR',
          'STU',
          'VWX',
          'YZ',
      ],
      search_words: {
        kw:'',
        expert:'',
        origin:'',
        startTime: 0,
        endTime: 0,
      }
    }
  },
  methods: {
    goSearch(isAdvanced){
      if (!isAdvanced) {
        if (this.searchForm.kw !== '') {
          this.$router.push({
            name:"AcademicSearch",
            params:{
              search_words:this.search_words
            }
          })
        } else {
          alert("搜索内容为空")
        }
      } else {
        if (this.search_words.kw === ''
            && this.search_words.expert === ''
            && this.search_words.origin === ''
            && this.search_words.startTime === 0
            && this.search_words.endTime === 0) {
          alert("搜索内容为空")
        } else {
          alert(this.search_words.startTime)
          this.$router.push({
            name:"AcademicSearch",
            params:{
              search_words:this.search_words
            }
          })
        }
      }
    },
    goArticle(url){
      this.$router.push({
        name:"AcademicShow",
        params:{
          id:url
        }
      })
    },
  },
  components:{
    Header,
  }
}
</script>

<style scoped>
  .page{
    position: relative;
    min-width: 940px;
    /*max-width: 1500px;*/
    min-height: 800px;
    /*left: 10%;*/
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
    border-radius: 0 0 0 0;
    border-width: 2px 0px 2px 0px;
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
  .search >>> .el-input-group__append {
    border-radius: 0 25px 25px 0;
    /*border-width: 2px;*/
    background: #245cc0;
    height: 60px;
    width: 80px;
    font-size: 18px;
    color: white;
  }
  .search >>> .el-input-group__prepend{
    border-radius: 25px 0 0 25px;
    border-color: #245cc0 grey #245cc0 #245cc0;
    border-width: 2px;
    border-style: solid dotted solid solid;
    width: 70px;
    font-size: 16px;
    background: white;
    /*right: 100%;*/
  }

  .top_block {
    /*background: blue;*/
    margin: -8px;
    padding: 0;
    position: absolute;
    top: 50%;
    left: 10%;
    /*right: 10%;*/
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
    /*background: red;*/
    margin: -8px;
    padding: 0;
    position: absolute;
    top: 70%;
    /*max-width: 1000px;*/
    /*left: 10%;*/
    width: 80%;
    height: 100%;
    /*display: flex;*/
  }
  .left_block {
    /*background: black;*/
    /*margin: -8px;*/
    padding: 0;
    position: absolute;
    /*top: 80%;*/
    left: 5%;
    width: 100%;
    height: 100%;
    /*max-width: 1200px;*/
  }
  .left_block h4 {
    position: absolute;
    //background: #005cd9;
    text-align: left;
    top: -3%;
    width: 20%;
    left: 10%;
  }
  .left_block .el-row {
    top: 5%;
    left: -25%;
  }
  .list_left {
    position: absolute;
    /*float: left;*/
    /*background-color: black;*/
    text-align: left;
    max-width: 400px;
    height: 70%;
    width: 35%;
    left: 18%;
  }
  .list_right {
    position: absolute;
    /*float: left;*/
    /*background-color: red;*/
    text-align: left;
    max-width: 400px;
    height: 70%;
    width: 35%;
    left: 62%;
  }
  .list_item {
    /*background: #9c9e9c;*/
    height: 15%;
  }

  .list_title {
    /*background: #8c939d;*/
    font-size: 18px;
    height: 60px;
  }
  .list_author{
    //background: #9fa19f;
    left: 5px;
    top: -10%;
    font-size: 5px;
  }
  .list_cited {
    font-size: 7px;
    float: right;
    top: 27%;
  }

  .right_block {
    //background: blue;
    /*margin: -8px;*/
    padding: 0;
    position: absolute;
    /*top: 80%;*/
    float: left;
    /*margin-left: 90%;*/
    left: 95%;
    width: 30%;
    height: 100%;
  }
  .keyword_list {
    height: 45px;
  }
  .keyword {
    font-size: 20px;
  }
</style>
<template>
  <div class="page">
    <div class="background"></div>
    <div class="index"></div>
    <Header status="2" class="header_home"></Header>
    <el-image :src="require('@/assets/logo/logo5.png')" class="logo" :underline="false">
      Logo
    </el-image>
    <el-input class="search" placeholder="请输入你要查找的内容" v-model="search_words.searchWords" @keyup.enter.native="goSearch(false)">
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
      <el-form ref="search_words" :model="search_words" label-width="80px">
        <el-form-item label="检索词">
          <el-input v-model="search_words.searchWords" placeholder="多个检索词用空格分开"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="search_words.title" placeholder="输入标题检索"></el-input>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="search_words.keyWords" placeholder="多个关键字用空格分开"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="search_words.experts" placeholder="多个作者用空格分开"></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="search_words.origin" placeholder="输入来源"></el-input>
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
        <div class="top_title">
          快捷搜索
        </div>
      </el-row>
      <el-row class="top_card" :gutter="10">
        <el-col :span="6" v-for="(o) in this.swList" :key="o">
          <el-card class="card" shadow="hover" @click.native="goFastSearch(o.searchWords)">{{o.searchWords}}</el-card>
        </el-col>
      </el-row>
    </div>
    <div class="middle_block">
      <div class="left_block">
        <h4>热门文献</h4>
        <div class="list_left">
          <el-row class="list_item" v-for="(o, index) in this.result_list.slice(0, 5)" :key="index">
            <el-image :src="require('@/assets/home_icon/Num-'+(index+1)+'.png')" class="num-icon-ach"></el-image>
            <el-link class="list_title" :underline="false" @click="goArticle(o.id)">{{ o.title }}</el-link>
            <span class="list_cited" :underline="false">{{o.cited_quantity}}</span>
            <br>
            <span class="list_author" :underline="false">{{o.time}} {{o.experts}}</span>
          </el-row>
        </div>
        <div class="list_right">
          <el-row class="list_item" v-for="(o, index) in this.result_list.slice(5, 10)" :key="index">
            <el-image :src="require('@/assets/home_icon/Num-'+(index+6)+'.png')" class="num-icon-ach"></el-image>
            <el-link class="list_title" :underline="false" @click="goArticle(o.id)">{{ o.title }}</el-link>
            <span class="list_cited" :underline="false">{{o.cited_quantity}}</span>
            <br>
            <span class="list_author" :underline="false">{{o.time}} {{o.experts}}</span>
          </el-row>
        </div>
      </div>
      <div class="right_block">
        <h4>热门关键词</h4>
        <el-row class="keyword_list" v-for="(o, index) in this.hotKeywords" :key="index">
          <el-image :src="require('@/assets/home_icon/Num-'+(index+1)+'.png')" class="num-icon-kw"></el-image>
          <el-link class="keyword" :underline="false" @click="goKwSearch(o.keyword)">{{o.keyword}}</el-link>
          <span class="keyword_views">{{o.citedNum}}</span>
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
      // url:require('@/assets/home_icon/Num-1.png'),
      result_list:[],
      result_length:0,
      swList:[
        {searchWords:'计算机'},
        {searchWords:'人工智能'},
        {searchWords:'医学'},
        {searchWords:'航空航天'},
      ],
      hot_keywords:[
          '计算机',
          '人工智能',
          '航空',
          '深度学习',
          '合成生物学',
          '糖尿病',
          '航天',
          '新冠',
          '疫情',
      ],
      hotKeywords:[],
      search_words: {
        searchWords:'',
        title:'',
        keyWords:'',
        experts:'',
        origin:'',
        startTime: 0,
        endTime: 0,
      }
    }
  },
  methods: {
    goSearch(isAdvanced){
      if (!isAdvanced) {
        if (this.search_words.searchWords !== '') {
          this.$router.push({
            name:"AcademicSearch",
            params:{
              search_words: encodeURIComponent(JSON.stringify(this.search_words))
            }
          })
        } else {
          alert("搜索内容为空")
        }
      } else {
        if (this.search_words.searchWords === ''
            && this.search_words.title === ''
            && this.search_words.keyWords === ''
            && this.search_words.experts === ''
            && this.search_words.origin === ''
            && this.search_words.startTime === 0
            && this.search_words.endTime === 0) {
          alert("搜索内容为空")
        } else {
          // alert(this.search_words.startTime)
          this.$router.push({
            name:"AcademicSearch",
            params:{
              search_words: encodeURIComponent(JSON.stringify(this.search_words)),
            }
          })
        }
      }
    },
    goKwSearch(kw){
      // alert(kw)
      this.search_words.keyWords = kw
      this.goSearch(true)
    },
    goFastSearch(kw){
      // alert(kw)
      this.search_words.searchWords = kw
      this.goSearch(false)
    },
    goArticle(id){
      window.open(this.$router.resolve('academicShow/'+id).href)
    },
  },
  components:{
    Header,
  },
  mounted() {
    let _this = this;
    this.$api.academic.getSearchResult({
      search_words: {
        searchWords:'',
        keyWords: '',
        title: '',
        experts:'',
        origin:'',
        startTime: '0',
        endTime: '0',
      },
      filter_words: {},
      sort: "cited",
      page: 1,
      userID: sessionStorage.getItem("userID")
    }).then(res => {
      if (res.code === "200"){
        // alert(200)
        _this.result_list = res.data.result_list;
        // _this.filter_list = res.data.filter_list;
        // _this.total_rs = res.data.total;
        _this.result_length = _this.result_list.length;
        // console.log(_this.result_list[0])
        for (let i = 0; i < 10; i ++) {

          _this.result_list[i].time = _this.result_list[i].time.slice(0,4)
          _this.result_list[i].experts = _this.result_list[i].experts.replaceAll(',',' ')
          // console.log(_this.result_list[i].time)
        }
      }else {
        // _this.$message({
        //   message: res.msg,
        //   type: "error"
        // })
        // console.log("Request => getSearchResult : not 200");
      }
    })
    this.$api.academic.getHotKeywords({
      code:1
    }).then(res => {
      if (res.code === "200"){
        // alert(200)
        _this.hotKeywords = res.data.slice(0, 10);
        console.log(res.data)
      }else {
        // _this.$message({
        //   message: res.msg,
        //   type: "error"
        // })
        // console.log("Request => getSearchResult : not 200");
      }
    })
  }
}
</script>

<style scoped>
  .page{
    position: relative;
    min-width: 920px;
    /*max-width: 1500px;*/
    min-height: 800px;
    /*left: 10%;*/
    //background-image: url("../assets/backgroud1.jpg");
    //background-size: 1800px;
  }

  .background{
    position: fixed;
    background-image: url("../assets/background/back4.jpg");
    top: 0;
    left: 0;
    z-index:-10;
    background-size: cover;
    width: 100%;
    height: 100%;
  }
  .index {
    position: fixed;
    top: 0;
    left: 0;
    z-index:-9;
    width: 100%;
    height: 100%;
    background: white;
    background-size: cover;
    //filter:alpha(Opacity=50);
    //-moz-opacity:0.5;
    opacity: 0.6;
  }

  .logo {
    position: absolute;
    top: 40px;
    left: calc((100% - 600px)/2);
    width: 600px;
    font-size: 70px;

  }
  .search {
    position: absolute;
    top: 350px;
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
    display: table;
    top: 450px;
    left: calc((100% - 900px)/2);
    /*right: 10%;*/
    width: 900px;
    height: 20%;
  }
  .top_block .el-row{
    width: 100%;
  }
  .top_title {
    position: absolute;
    left: 20px;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #2461ea;
  }
  .top_card {
    top: 40px;
    font-weight: bold;
    font-size: 18px;
  }

  .card {
    margin: 5px;
    width: 95%;
    height: 30%;
    cursor: pointer;
  }

  .middle_block {
    /*background: red;*/
    margin: -8px;
    padding: 0;
    position: absolute;
    top: 75%;
    /*max-width: 1000px;*/
    left: calc((100% - 1000px)/2);
    width: 800px;
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
    top: -25px;
    width: 20%;
    left: 10px;
  }
  .left_block .el-row {
    top: 5%;
    left: -140px;
  }


  .list_left {
    position: absolute;
    /*float: left;*/
    /*background-color: black;*/
    text-align: left;
    //max-width: 400px;
    height: 70%;
    width: 200px;
    left: 150px;
  }
  .list_right {
    position: absolute;
    /*float: left;*/
    /*background-color: red;*/
    text-align: left;
    //max-width: 400px;
    height: 70%;
    width: 200px;
    left: 550px;
  }
  .list_item {
    /*background: #9c9e9c;*/
    height: 80px;
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
  }
  .num-icon-ach{
    width: 40px;
    height: 40px;
    top: 26px;
  }
  .list_title {
    /*background: #8c939d;*/
    //position: absolute;
    font-size: 15px;
    font-weight: bold;
    color: #555666;
    height: 18px;
    width: 200px;
    left: 50px;
    top: -16px;
    display: -webkit-box;/*作为弹性伸缩盒子模型显示*/
    -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
    overflow: hidden; /*超出的文本隐藏*/
    text-overflow: ellipsis; /* 溢出用省略号*/
    //white-space: nowrap;
    -webkit-box-orient: vertical
  }
  .list_author{
    //background: #9fa19f;
    position: absolute;
    color: grey;
    width: 160px;
    left: 52px;
    top: 55px;
    font-size: 14px;
    display: -webkit-box;/*作为弹性伸缩盒子模型显示*/
    -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
    overflow: hidden; /*超出的文本隐藏*/
    text-overflow: ellipsis; /* 溢出用省略号*/
  //white-space: nowrap;
    -webkit-box-orient: vertical
  }
  .list_cited {
    font-size: 15px;
    color: #005cd9;
    position: absolute;
    left: 300px;
    top: 29px;
  }

  .right_block {
    //background: blue;
    /*margin: -8px;*/
    padding: 0;
    position: absolute;
    top: -25px;
    float: left;
    /*margin-left: 90%;*/
    left: 770px;
    width: 100px;
    height: 100%;
  }
  .right_block h4 {
    position: absolute;
    //top: -25px;
    width: 100px;
    left: 45px;
  }
  .num-icon-kw{
    width: 30px;
    height: 30px;
    top: 10px;
  }
  .keyword_list {
    height: 45px;
    text-align: left;
    top: 50px;
    //width: 200px;
    left: 50px;
  }
  .keyword {
    font-size: 15px;
    color: black;
    //width: 10px;
    top: -20px;
    left: 40px;
    width: 80px;
    display: -webkit-box;/*作为弹性伸缩盒子模型显示*/
    -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
    overflow: hidden; /*超出的文本隐藏*/
    text-overflow: ellipsis; /* 溢出用省略号*/
  //white-space: nowrap;
    -webkit-box-orient: vertical
  }
  .keyword_views {
    position: absolute;
    font-size: 15px;
    color: #245cc0;
    text-align: left;
    top: 17px;
    left: 120px;
  }

  @media screen and (min-width: 1400px){
    .middle_block {
      left: calc((100% - 1200px)/2);
      width: 1000px;
    }
    .top_block {
      left: calc((100% - 1000px)/2);
      width: 1000px;
    }

    .left_block h4 {
      width: 20%;
      left: 70px;
    }

    .list_left {
      width: 300px;
      left: 200px;
    }
    .list_right {
      width: 300px;
      left: 650px;
    }
    .list_title {
      /*background: #8c939d;*/
    //position: absolute;
      font-size: 15px;
      /*height: 20px;*/
      width: 250px;
      left: 50px;
      top: -16px;
      display: -webkit-box;/*作为弹性伸缩盒子模型显示*/
      -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
      overflow: hidden; /*超出的文本隐藏*/
      text-overflow: ellipsis; /* 溢出用省略号*/
    //white-space: nowrap;
      -webkit-box-orient: vertical
    }
    .list_author{
      width: 200px;
    }
    .right_block {
      top: -25px;
      float: left;
      left: 950px;
      width: 200px;
      height: 100%;
    }
  }
</style>

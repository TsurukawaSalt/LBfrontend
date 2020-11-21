<template>
    <el-card class="card-body" ref="card" style="text-align: left">
      <div class="sc-content">
        <div class="title">
          <a class="title-link" href="https://xueshu.baidu.com">
            {{ item.title }}
          </a>
        </div>
        <div class="abstract">{{ item.abstract }}</div>
        <div class="info">
          <span v-for="(item, index) in item.authors" :key="index">
            <span class="toPageClick" @click="toDetailPage()">{{ item.name }} </span>
          </span>
          <span> - </span>
          <span class="toPageClick" @click="toDetailPage()">{{ item.source }}</span>
          <span> - 被引量：</span>
          <span class="toPageClick" @click="toDetailPage()">{{ item.n_citation}}</span>
          <span> - </span>
          <span class="grey-part">{{ item.year }}年</span>
        </div>
        <div class="allVersion">
          <span class="grey-part">来源：</span>
          <span class="toPageClick" @click="toDetailPage()">{{ item.version }}</span>
        </div>
      </div>
      <div class="sc_ext">
        <el-button class="button" id="button-favor" type="mini" round icon="el-icon-star-off" @click="favor()">收藏</el-button>
        <el-button class="button" id="button-quote" type="mini" round icon="el-icon-share" @click="quote()">引用</el-button>
        <el-button class="button" id="button-batchQuote" type="mini" round icon="el-icon-folder-add" @click="batchQuote()">批量引用</el-button>
        <el-button class="button" id="button-download" type="mini" round icon="el-icon-download" @click="download()">免费下载</el-button>
      </div>
    </el-card>
</template>

<script>
  export default {
    name: "AcademicItem",
    props: {
      item: {
        type: Object,
        default: null
      },
      width: {
        type: Number,
        default: 500,
      }
    },
    data() {
      return {

      }
    },
    methods: {
      toPage() {
        console.log("跳转文章详情页！");
      },
      toDetailPage(){
        console.log("跳转学者/来源/引用详情页！");
      },
      favor() {
        console.log("收藏文章！");
        document.getElementById("button-favor").blur();
      },
      quote() {
        console.log("引用文章！");
        document.getElementById("button-quote").blur();
      },
      batchQuote() {
        console.log("批量引用文章！");
        document.getElementById("button-batchQuote").blur();
      },
      download() {
        console.log("免费下载！");
        document.getElementById("button-download").blur();
      }
    },
    mounted() {
      // document.getElementsByClassName("card-body")[0].style.width = this.width + "px";
    }
  }
</script>

<style scoped>
 .el-card{
   width: 610px;
   margin: 0 10px 0 0;
   font-size: 13px;
   border-top: none;
   border-left: none;
   border-right: none;
   box-shadow: none;
 }
 .el-card /deep/ .el-card__body{
   padding: 10px 10px 15px 0;
 }
 .title{
   font-size: 20px;
   font-style: normal;
 }
 .title-link{
   color: #0066cc;
   text-decoration: none;
 }
 .toPageClick:hover{
   cursor: pointer;
   text-decoration-line: underline;
 }
 .abstract{
   color: #9c9e9c;
   line-height: 24px;
 }
 .info{
   margin-top: 4px;
 }
 .allVersion{
   margin-top: 6px;
 }
 .grey-part{
   color: #9fa19f;
 }
 .sc_ext{
   margin-top: 15px;
 }
 .button{
   background-color: #f1f1f1;
   border-width: 0;
 }
</style>

<template>
    <el-card class="card-body" ref="card" style="text-align: left">
      <!-- source信息部分 -->
      <div class="sc-content">
        <!-- 标题 -->
        <div class="title">
          <span class="title-click" @click="toDetailPage">{{ item.title }}</span>
        </div>
        <!-- 摘要 -->
        <div class="abstract" style="word-break: break-all;white-space: normal">{{ item.abstract }}</div>
        <!-- 其他信息：所有作者/来源(期刊/出版社/或无)/被引量/年份-->
        <div class="info">
          <span v-for="(item, index) in item.authors" :key="index">
            <span class="name-click" @click="toAuthorPage()">{{ item.name }} </span>
          </span>
          <span> - </span>
          <span class="source-click" @click="toSourcePage()">{{ item.source }}</span>
          <span> - 被引量：</span>
          <span class="citation-click" @click="toCitedPage()">{{ item.n_citation}}</span>
          <span> - </span>
          <span class="grey-part">{{ item.year }}年</span>
        </div>
        <!-- 来源：网站 -->
        <div class="allVersion">
          <span class="grey-part">来源：</span>
          <span class="version-click" @click="toVersionPage()">{{ item.version }}</span>
        </div>
      </div>
      <!-- source操作部分 -->
      <div class="sc_ext">
        <!-- 收藏/引用/批量引用/（免费下载）-->
        <el-button class="ext-button" id="button-favor" type="mini" round icon="el-icon-star-off" @click="favor()">收藏</el-button>
        <el-button class="ext-button" id="button-quote" type="mini" round icon="el-icon-share" @click="quote()">引用</el-button>
        <el-button class="ext-button" id="button-batchQuote" type="mini" round icon="el-icon-folder-add" @click="batchQuote()">批量引用</el-button>
        <el-button class="ext-button" id="button-download" type="mini" round icon="el-icon-download" @click="download()">免费下载</el-button>
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
      }
    },
    data() {
      return {

      }
    },
    methods: {
      toDetailPage() {
        console.log("跳转文章详情页！");
      },
      toAuthorPage() {
        console.log("跳转学者详情页！")
      },
      toSourcePage() {
        // 出版社/杂志期刊
        console.log("跳转来源详情页！")
      },
      toCitedPage() {
        // 到来源网站查看文章
        console.log("跳转引用详情页！")
      },
      toVersionPage() {
        console.log("跳转来源网站详情页！")
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
 .title-click{
   font-size: 20px;
   color: #0066cc;
 }
 .title-click:hover,.name-click:hover,.source-click:hover,.citation-click:hover,.version-click:hover{
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
 .ext-button{
   background-color: #f1f1f1;
   border-width: 0;
 }
</style>

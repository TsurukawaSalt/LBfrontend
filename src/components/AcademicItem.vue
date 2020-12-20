<template>
    <el-card class="card-body" ref="card" style="text-align: left">
      <!-- source信息部分 -->
      <div class="sc-content">
        <!-- 标题 -->
        <div class="title">
          <span class="title-click" @click="toDetailPage">{{ item.title }}</span>
        </div>
        <!-- 摘要 -->
        <!-- TODO 限制行数 -->
        <div class="summary">{{ item.summary }}</div>
        <!-- 其他信息：所有作者/来源(期刊/出版社/或无)/被引量/年份-->
        <div class="info">
          <span v-for="(item, index) in item.authors" :key="index">
            <span class="name-click" @click="toAuthorPage(item)">{{ item.name }} </span>
          </span>
          <span> - </span>
          <span class="source-click" @click="toSourcePage(item.origin)">{{ item.origin }}</span>
          <span> - 被引量：</span>
          <span class="citation-click" @click="toCitedPage()">{{ item.cited_quantity}}</span>
          <span> - </span>
          <span class="grey-part">{{ item.time }}年</span>
        </div>
        <!-- 来源：网站 -->
        <div class="allVersion">
          <span class="grey-part">来源：</span>
          <span class="version-click" @click="toLink(item.link)">{{ item.link }}</span>
        </div>
      </div>
      <!-- source操作部分 -->
      <div class="sc_ext">
        <!-- 收藏/引用/批量引用/（免费下载）-->
        <el-button class="ext-button" id="button-favor" type="mini" round icon="el-icon-star-off" @click="favor()" v-show="!item.is_favor">收藏</el-button>
        <el-button class="ext-button" id="button-unfavor" type="mini" round icon="el-icon-star-on" @click="favor()" v-show="item.is_favor">已收藏</el-button>
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
      c_sc: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        item: {

        }
      }
    },
    methods: {
      toDetailPage() {
        console.log("跳转文章详情页！");
        let url = window.location.origin + "/#/academicShow/"+this.item.id;
        if(window.open(url) === null){
          window.location.herf = url;
        }
      },
      toAuthorPage(item) {
        console.log("跳转学者搜索！")
        // 返回里有id的情况
        if (item.id !== ""){
          this.$router.push({
            name: 'ScholarPage',
            params: {
              expertid: item.id
            }
          })
        } else {
          this.$emit("toAuthorPage", item);
        }

        // 返回里没有id的情况 无脑emit
        // this.$emit("toAuthorPage", item);
      },
      toSourcePage(val) {
        // 出版社/杂志期刊
        console.log("跳转来源搜索！")
        this.$emit("toSourcePage", val);
      },
      toCitedPage() {
        // 到来源网站查看文章
        console.log("跳转引用详情页！")
      },
      toLink(link){
        // window.location.href = link;

        window.open(link, '_blank');
      },
      favor() {
        console.log("收藏/取消收藏文章！");
        var _this = this
        this.$api.academic.favorSc({
          document_id: _this.item.documentid,
          user_id: sessionStorage.getItem("userID")
        }).then(res => {
          if (res.code === 200){
            _this.item.is_favor = res.data.is_favor
          }
        })
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
      this.item = this.c_sc
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
 .summary{
   color: #9c9e9c;
   line-height: 24px;
   word-break: break-all;
   white-space: normal;
   display: -webkit-box;
   /* -webkit-box-orient: vertical; */
   /*! autoprefixer: off */
   -webkit-box-orient: vertical;
   /* autoprefixer: on */
   -webkit-line-clamp: 3;
   overflow: hidden;
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

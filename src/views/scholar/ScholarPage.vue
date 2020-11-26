<template>
  <div class="wrapper">
    <div class="container">
      <div id="main-content">
        <div id="author-info">
          <div class="person-image">
            <div class="person-portrait"></div>
            <div class="person-authen">
              <el-button type="small">我要认证</el-button>
            </div>
            <div class="person-focus">
              <el-button type="small">我要关注</el-button>
            </div>
          </div>
          <div class="person-baseinfo">
            <div class="p-name">时代发</div>
            <div class="p-volume c-grey">2342人看过</div>
            <div class="p-scholarID">
              <div class="p-scholarID-all c-grey">
                ScholarID:
                <span class="p-scholarID-id">
                  CN-B073VAMJ
                </span>
              </div>
            </div>
            <div class="p-affiliate">首都第一医院</div>
            <ul class="p-ach">
              <li class="p-ach-item">
                <p class="p-ach-type c-grey">被引频次</p>
                <p class="p-ach-num">1231</p>
              </li>
              <li class="p-ach-item">
                <p class="p-ach-type c-grey">被引频次</p>
                <p class="p-ach-num">1231</p>
              </li>
              <li class="p-ach-item">
                <p class="p-ach-type c-grey">被引频次</p>
                <p class="p-ach-num">1231</p>
              </li>
              <li class="p-ach-item">
                <p class="p-ach-type c-grey">被引频次</p>
                <p class="p-ach-num">1231</p>
              </li>
            </ul>
          </div>
        </div>
        <div id="main-content-left">
          <div id="achievement">
            这里是图表
          </div>
          <div id="article-list">
<!--            todo sort-->
            <div v-for="(result_item,index) in result_list" v-bind:key="index">
              <academic-item :item = result_item></academic-item>
            </div>
          </div>
        </div>
        <div id="main-content-right">这里是关系图等</div>
      </div>
    </div>
  </div>
</template>

<script>
import AcademicItem from "@/components/AcademicItem";
export default {
  name: "ScholarPage",
  components: {
    AcademicItem
  },
  data() {
    return {
      result_list:[
        {
          title : "1. this is the title",
          abstract : "this is the abstract this is the abstract this is the abstract this is the abstract this is the abstract this is the abstract this is the abstract " +
              "this is the abstract this is the abstract this is the abstract this is the abstract",
          authors: [
            {name: "学者1"},
            {name: "学者2"},
            {name: "学者3"}
          ],
          source: "this is the source",
          n_citation: 100,
          year: 1990,
          version: "中国知网"
        },
        {
          title : "这是标题",
          abstract : "this is the abstract this is the abstract this is the abstract this is the abstract this is the abstract this is the abstract this is the abstract " +
              "this is the abstract this is the abstract this is the abstract this is the abstract",
          authors: [
            {name: "学者4"},
            {name: "学者5"},
            {name: "学者6"}
          ],
          source: "this is the source",
          n_citation: 100,
          year: 1990,
          version: "中国知网"
        },
        {
          title : "3. this is the title",
          abstract : "this is the abstract this is the abstract this is the abstract this is the abstract this is the abstract this is the abstract this is the abstract " +
              "this is the abstract this is the abstract this is the abstract this is the abstract",
          authors: [
            {name: "学者7"},
            {name: "学者8"},
            {name: "学者9"}
          ],
          source: "this is the source",
          n_citation: 100,
          year: 1990,
          version: "中国知网"
        },
        {
          title : "4. this is the title",
          abstract : "this is the abstract this is the abstract this is the abstract this is the abstract this is the abstract this is the abstract this is the abstract " +
              "this is the abstract this is the abstract this is the abstract this is the abstract",
          authors: [
            {name: "学者1"},
            {name: "学者2"},
            {name: "学者3"}
          ],
          source: "this is the source",
          n_citation: 100,
          year: 1990,
          version: "中国知网"
        },
      ],
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  #main-content{
    width: 1100px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    z-index: 10;
    font-size: 13px;
    text-align: left;
  }
  #author-info{
    border-bottom: 1px solid #e3e3e3;
    padding: 32px 0 53px;
    overflow: hidden;
  }
  #main-content-left{
    float: left;
    width: 710px;
  }
  #main-content-right{
    float: right;
    width: 370px;
  }
  .person-image{
    float: left;
    width: 200px;
    text-align: center;
    /*min-height: 250px;*/
  }
  .person-portrait{
    position: relative;
    display: inline-block;
    width: 112px;
    height: 112px;
  }
  .person-authen{
    /*display: inline-block;*/
  }
  .person-focus{
    /*position: relative;*/
    /*display: inline-block;*/
    margin-top: 10px;
  }
  .person-baseinfo{
    float: left;
    width: 555px;
  }
  .p-name{
    float: left;
    font-size: 28px;
    line-height: 30px;
    color: #333;
    margin-bottom: 8px;
  }
  .p-volume{
    float: left;
    font-size: 14px;
    color: #999;
    margin-top: 10px;
    margin-left: 20px;
  }
  .p-scholarID{
    float: right;
    width: 192px;
    height: 24px;
    background-color: #fafafa;
    padding: 3px;
  }
  .p-scholarID-all{
    width: 190px;
    height: 22px;
    border: 1px solid #E6E6E6;
    background-color: #fafafa;
    color: #999;
    font-size: 13px;
    text-align: center;
    line-height: 24px;
  }
  .p-scholarID-id{
    font-size: 13px;
    color: #06c;
  }
  .p-affiliate{
    clear: both;
  }
  .p-ach-item{
    float: left;
    border-right: 1px solid #efefef;
    margin-right: 10px;
    font-size: 20px;
    width: 78px;
  }
  .p-ach-type{
    font-size: 12px;
    margin: 0;
  }
  .c-grey{
    color: #999;
  }
  .p-ach-num{
    margin: 10px 0 0 0;
  }
  ul, li{
    list-style: none;
    padding-left: 0;
  }
  #achievement{
    border-bottom: 1px dotted #bfbfbf;
  }
  #article-list{
    margin-top: 20px;
  }
</style>

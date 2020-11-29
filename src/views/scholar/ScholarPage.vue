<template>
  <div class="wrapper">
    <div class="container">
      <div id="main-content">
        <!--科研人员信息-->
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
            <div class="p-name">{{ scholar_info.name }}</div>
            <div class="p-volume c-grey">{{ scholar_info.volume }}人看过</div>
            <div class="p-scholarID">
              <div class="p-scholarID-all c-grey">
                ScholarID:
                <span class="p-scholarID-id">
                  {{ scholar_info.scholar_id }}
                </span>
              </div>
            </div>
            <div class="p-affiliate">{{ scholar_info.affiliate }}</div>
            <ul class="p-ach">
              <li class="p-ach-item" v-for="(item, index) in scholar_info.ach" :key="index">
                <p class="p-ach-type c-grey">{{ item.title }}</p>
                <p class="p-ach-num">{{ item.num }}</p>
              </li>
            </ul>
          </div>
        </div>
        <!--成就统计 & 相关文献-->
        <div id="main-content-left">
          <!--成就展示-->
          <div id="achievement">
            <div class="achievement-pie"></div>
            <div class="achievement-line"></div>
          </div>
          <!--相关文献-->
          <div id="article-list">
            <div id="article-list-container">
              <!--筛选 filter-->
              <div id="content-top">
                <div class="content-filter">
                  <div class="filter-item">
                    <el-popover
                        placement="bottom-start"
                        width="100"
                        trigger="click">
                      <!--由后端传具体有哪些年份 for循环-->
                      <div>全部时间</div>
                      <div>2020</div>
                      <div>2019</div>
                      <div>2018</div>
                      <el-button class="button-sort" slot="reference">{{ this.getYear }}
                        <i class="el-icon-s-data" style="float: right" ref="icon_year"></i>
                      </el-button>
                    </el-popover>
                  </div>
                  <div class="filter-item">
                    <el-popover
                        placement="bottom-start"
                        width="100"
                        trigger="click">
                      <div @click="paperTo0">全部</div>
                      <div @click="paperTo1">期刊</div>
                      <div @click="paperTo2">会议</div>
                      <div @click="paperTo3">专著</div>
                      <el-button class="button-sort" slot="reference">{{ this.getPaper }}
                        <i class="el-icon-s-data" style="float: right" ref="icon_paper"></i>
                      </el-button>
                    </el-popover>
                  </div>
                  <div class="filter-item">
                    <el-popover
                        placement="bottom-start"
                        width="100"
                        trigger="click">
                      <div @click="authorTo0">全部作者</div>
                      <div @click="authorTo1">第一作者</div>
                      <el-button class="button-sort" slot="reference">{{ this.getAuthor }}
                        <i class="el-icon-s-data" style="float: right" ref="icon_author"></i>
                      </el-button>
                    </el-popover>
                  </div>
                  <div class="filter-item">
                    <el-popover
                        placement="bottom-start"
                        width="100"
                        trigger="click">
                      <div @click="sortToTime">按时间降序</div>
                      <div @click="sortToCited">按被引降序</div>
                      <el-button class="button-sort" slot="reference">{{ this.getSort }}
                        <i class="el-icon-s-data" style="float: right" ref="icon_sort"></i>
                      </el-button>
                    </el-popover>
                  </div>
                </div>
              </div>
              <!--文献列表-->
              <div id="content-result">
                <div ></div>
                <div v-for="(result_item,index) in result_list" v-bind:key="index">
                  <academic-item :item = result_item></academic-item>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--合作统计展示-->
        <div id="main-content-right">
          <!--合作学者展示-->
          <div class="co-author-wr">
            <h3>合作学者</h3>
            <div class="co-author-list">
              <div v-for="(item, index) in co_authors_list" :key="index">
                <div class="co-author-item">
                  <div class="co-author-name">{{ item.name }}</div>
                  <div class="co-author-affiliate">{{ item.affiliate }}</div>
                </div>
              </div>
            </div>
          </div>
          <!--合作机构展示-->
          <div class="co-affiliate-wr">
            <h3>合作机构</h3>
            <ul class="co-affiliate-list" v-for="(item, index) in co_affiliate_list" :key="index">
              <li>
                <span class="co_affiliate_name">{{ item.name }}</span>
                <span class="co_affiliate_line">
                  <span class="co_affiliate_width"></span>
                  <span class="co_affiliate_count">{{ item.count }}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
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
      scholar_id: '0',
      scholar_info: {
        name: '张三',
        volume: 21312,
        scholar_id: 'CN-B073VAMJ',
        affiliate: '北京航空航天大学',
        ach: [
          {
            title: 'a指数',
            num: 1341
          },
          {
            title: 'b指数',
            num: 2565
          },
          {
            title: 'c指数',
            num: 241
          },
          {
            title: 'd指数',
            num: 597
          }
        ]
      },
      co_authors_list:[
        {
          scholar_id: '23423',
          name: '十六日',
          affiliate: '浙江医科大学肿瘤研究所'
        },
        {
          scholar_id: '3673',
          name: '打过交道',
          affiliate: '浙江医科大啊日嘎人学肿瘤研究所'
        }
      ],
      co_affiliate_list: [
        {
          aff_id: '13451',
          name: '啊的发挥快递费',
          count: 14351
        },
        {
          aff_id: '1414',
          name: '是该公司认为',
          count: 42654
        }
      ],
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
      sort_words: {
        sc_year: '',
        paper_type: '0',
        first_author : '0',
        sc_sort: 'time',
      }
    }
  },
  methods: {
    paperTo0() {
      this.sort_words.paper_type = '0';
    },
    paperTo1() {
      this.sort_words.paper_type = '1';
    },
    paperTo2() {
      this.sort_words.paper_type = '2';
    },
    paperTo3() {
      this.sort_words.paper_type = '3';
    },
    authorTo0() {
      this.sort_words.first_author = '0';
    },
    authorTo1() {
      this.sort_words.first_author = '1';
    },
    sortToTime() {
      this.sort_words.sc_sort = 'time';
    },
    sortToCited() {
      this.sort_words.sc_sort = 'cited';
    },
    loadInfo(){
      var _this = this
      this.$api.scholar.getInfo({
        scholar_id: _this.scholar_id
      }).then(res => {
        if (res.code === 200){
          _this.scholar_info = res.data
        }else {
          _this.$message({
            message: res.message,
            type: "error"
          })
        }
      })
    },
    loadRelateSc(){
      var _this = this
      this.$api.scholar.getRelateSc({
        scholar_id: _this.scholar_id,
        sort_words: _this.sort_words
      }).then(res => {
        if (res.code === 200){
          _this.result_list = res.data.result_list
        }else {
          _this.$message({
            message: res.message,
            type: "error"
          })
        }
      })
    },
    loadCoAuthorsList(){
      var _this = this
      this.$api.scholar.getCoAuthors({
        scholar_id: _this.scholar_id
      }).then(res => {
        if (res.code === 200) {
          _this.co_authors_list = res.data
        } else {
          _this.$message({
            message: res.message,
            type: "error"
          })
        }
      })
    },
    loadCoAffList() {
      var _this = this
      this.$api.scholar.getCoAffiliate({
        scholar_id: _this.scholar_id
      }).then(res => {
        if (res.code === 200) {
          _this.co_affiliate_list = res.data
        } else {
          _this.$message({
            message: res.message,
            type: "error"
          })
        }
      })
    }
  },
  computed: {
    getYear() {
      switch (this.sort_words.sc_year) {
        case "2020":
          return '2020'
        case '2019':
          return '2019'
        default:
          return '全部年份'
      }
    },
    getPaper() {
      switch (this.sort_words.paper_type){
        case "0":
          return '全部类型'
        case "1":
          return '期刊'
        case "2":
          return '会议'
        case "3":
          return '专著'
        default:
          return '全部类型'
      }

    },
    getAuthor() {
      switch (this.sort_words.first_author){
        case "0":
          return '全部作者'
        case "1":
          return '第一作者'
        default:
          return '全部作者'
      }
    },
    getSort() {
      switch (this.sort_words.sc_sort){
        case "time":
          return '按时间降序'
        case "cited":
          return '按被引降序'
        default:
          return '按时间降序'
      }
    }
  },
  watch: {
    sort_words: {
      handler: function () {
        this.loadRelateDate()
      },
      deep: true
    }
  },
  mounted() {
    this.loadInfo()
    this.loadRelateSc()
    this.loadCoAuthorsList()
    this.loadCoAffList()
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
    width: 510px;
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
  .achievement-pie{
    height: 166px;
  }
  .achievement-line{
    height: 170px;
  }
  #article-list{
    margin-top: 20px;
  }
  .content-filter{
    float: left;
  }
  .filter-item{
    position: relative;
    float: left;
    margin-right: 20px;
  }
  .button-sort{
    border: none;
    padding: 0;
    font-size: 12px;
  }
  .co-author-item{
    margin-bottom: 10px;
  }
  .co-author-name{
    color: #005cd9;
  }
  .co-author-name:hover{
    cursor: pointer;
  }
  .co_affiliate_list span {
    display: inline-block;
    vertical-align: middle;
    height: 16px;
  }
  .co_affiliate_line{
    float: right;
  }
</style>
<style>
  .el-popover{
    min-width: 70px;
    padding: 2px 12px 2px 12px;
    box-shadow: none;
  }
</style>

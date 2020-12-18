<template>
  <div class="wrapper">
    <div class="container">
      <div id="main-content">
        <!--科研人员信息-->
        <div id="author-info">
          <div class="person-image">
            <!--头像-->
            <div class="person-portrait">
              <div class="person-avatar-wr">
                <el-avatar class="person-avatar" :size="110" :src="sourceUrl"></el-avatar>
              </div>
            </div>
            <!--认证按钮-->
            <div class="person-authen is-hover" v-show="!scholar_info.is_authen">
              <p class="authen-button" @click="handleAuthen">我要认证</p>
            </div>
            <!--关注按钮-->
            <div class="person-focus is-hover">
              <p class="focus-button" @click="handleFocus" v-show="!scholar_info.is_focus">关注</p>
              <p class="unfocus-button" @click="handleFocus" v-show="scholar_info.is_focus">已关注
              <i class="el-icon-check"></i>
              </p>
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
<!--          <div id="achievement">-->
<!--            <div class="achievement-pie"></div>-->
<!--            <div class="achievement-line"></div>-->
<!--          </div>-->
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
                <div class="result-list">
                  <div v-for="(result_item,index) in result_list" v-bind:key="index">
                    <academic-item :item = result_item></academic-item>
                  </div>
                </div>
                <div class="result-page" v-show="total_rs>10">
                  <el-pagination
                      background
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="currentPage"
                      :page-size="10"
                      layout="prev, pager, next, jumper"
                      :total=total_rs
                      class="page">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--合作统计展示-->
        <div id="main-content-right">
          <!--合作学者展示-->
          <div class="co-author-wr">
            <i class="el-icon-d-arrow-right" style="float: right;margin-right: 10px" v-show="total_co_authors>4">更多</i>
            <h3>合作学者</h3>

            <div class="co-author-list">
              <div v-for="(item, index) in co_authors_list_show" :key="index">
                <div class="co-author-avatar is-hover"  @click="toScholarPage(item.scholar_id)">
                  <el-avatar shape="square" :size="40" :src="sourceUrl"></el-avatar>
                </div>
                <div class="co-author-item">
                  <div class="co-author-name" @click="toScholarPage(item.scholar_id)">{{ item.name }}</div>
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
      user_id: '0',
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
        ],
        is_authen: false,
        is_focus: true
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
      co_authors_list_show:[],
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
      co_affiliate_list_show: [],
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
      },
      currentPage: 1,
      total_rs: 100,
      total_co_authors: 0,
      total_co_affs: 0,
      sourceUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    toScholarPage(scholar_id) {
      this.scholar_id = scholar_id
    },
    handleAuthen(){
      console.log("点击了申请认领门户");
      var _this = this
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        _this.authen(value);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    authen(value){
      var _this = this
      this.$api.application.create({
        token: sessionStorage.getItem("token"),
        userID: sessionStorage.getItem("userID"),
        objectID: _this.scholar_id,
        flag: 1,
        email: value
      }).then(res => {
        if (res.code === "200"){
          _this.$message({
            type: "success",
            message: '成功提交申请'
          });
        } else {
          _this.$message({
            type: "error",
            message: res.message
          })
        }
      })
    },
    handleFocus() {
      var _this = this
      this.$api.scholar.focusScholar({
        scholar_id: _this.scholar_id,
        user_id: _this.user_id
      }).then(res=>{
        if (res.code === "200"){
          _this.is_focus = res.data.is_focus
        } else {
          _this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
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
        scholar_id: _this.scholar_id,
        user_id: sessionStorage.getItem("userID")
      }).then(res => {
        if (res.code === "200"){
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
      this.$api.academic.getSearchResult({
        search_words: {
          expert: _this.scholar_info.name,
        },
        filter_words: {
          year: _this.sort_words.sc_year,
          type: _this.sort_words.paper_type,
        },
        sort: "",
        page: _this.currentPage
      })
    },
    loadCoAuthorsList(){
      var _this = this
      this.$api.scholar.getCoAuthors({
        scholar_id: _this.scholar_id
      }).then(res => {
        if (res.code === "200") {
          _this.co_authors_list = res.data.result_list
          _this.total_co_authors = res.data.total_rs
          _this.total_co_authors = 2
          if (_this.total_co_authors > 4){
            _this.co_authors_list_show = _this.co_authors_list.slice(0,4)
          } else{
            _this.co_authors_list_show = _this.co_authors_list
          }
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
        if (res.code === "200") {
          _this.co_affiliate_list = res.data.result_list
          _this.total_co_affs = res.data.total_rs
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
    is_focus: function () {
      // 监听：关注状态
    },
    is_authen: function () {
      // 监听：认证状态
    },
    sort_words: {
      // 监听：过滤关键词
      handler: function () {
        this.loadRelateSc()
      },
      deep: true
    },
    currentPage: function () {
      // 监听：页码
      var _this = this
      this.$api.scholar.getRelateSc({
        scholar_id: _this.scholar_id,
        sort_words: _this.sort_words,
        page: _this.currentPage
      }).then(res=>{
        if(res.code === "200"){
          _this.result_list = res.data.result_list
        }else{
          _this.$message({
            message: res.message,
            type: "error"
          })
        }
      })
    },
    scholar_id: function () {
      this.currentPage = 1
      this.loadInfo()
      this.loadRelateSc()
      this.loadCoAuthorsList()
      this.loadCoAffList()
    }
  },
  mounted() {
    this.user_id = sessionStorage.getItem('userID')
    this.scholar_id = this.$route.params.scholar_id
    this.currentPage = 1
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
    width: 125px;
    float: left;
    text-align: center;
    margin-right: 20px;
    /*min-height: 250px;*/
  }
  .person-portrait{
    position: relative;
    display: inline-block;
    width: 122px;
    height: 132px;
  }
  .person-avatar{
    border: 6px solid #fff;
    box-shadow: 0 1px 6px rgba(0,0,0,.25);
  }
  .person-authen,.person-focus{
    width: 90px;
    display: inline-block;
  }
  .person-authen{
    display: inline-block;
  }
  .authen-button{
    display: inline-block;
    color: #ffffff;
    height: 34px;
    width: 94px;
    line-height: 34px;
    font-size: 14px;
    background-color: #0066cc;
    border-radius: 2px;
    text-align: center;
    margin: 0;
  }
  .person-focus{
    position: relative;
    display: inline-block;
    width: 90px;
    /*height: 23px;*/
  }
  .focus-button{
    color: #06c;
    border: 1px solid #87bcf0;
    border-radius: 23px;
    height: 23px;
    line-height: 23px;
  }
  .unfocus-button{
    height: 23px;
    line-height: 23px;
    color: #999;
    border: 1px solid #e5e5e5;
    border-radius: 23px;
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
  .co-author-wr{
    border-bottom: 1px dotted #bfbfbf;
    padding-bottom: 15px;
  }
  .co-author-avatar{
    display: inline-block;
  }
  .co-author-item{
    margin-bottom: 10px;
    display: inline-block;
    margin-left: 12px;
    vertical-align: top;
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
  .result-page{
    width: 610px;
  }
  .page{
    margin-top: 16px;
    text-align: center;
  }
  .is-hover:hover{
    cursor: pointer;
  }
</style>
<style>
  .el-popover{
    min-width: 70px;
    padding: 2px 12px 2px 12px;
    box-shadow: none;
  }
</style>

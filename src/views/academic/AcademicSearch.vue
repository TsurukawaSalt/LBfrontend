<template>
  <div class="wrapper">
    <div class="container">
      <div class="content-right">
        这里是右侧
      </div>
      <div class="content-left">
        <!-- filter -->
        <div class="content-left-nav">
          <div class="left-nav" v-for="(item, index) in filter_list" :key="index">
            <filter-item
                :filter_item="item"
                :c_filter_words="filter_words"
                v-on:getFilter="handleSelect"
                v-on:cancelSelect="handleCancel"></filter-item>
          </div>
        </div>
        <!-- 搜索结果 -->
        <div class="content-left-rs">
          <div class="rs-list">
            <!-- 学者列表 -->
            <div class="e_result" v-show="has_experts">
              <div class="e_border">
                <div class="e_wrapper">
                  <p class="e_tips">为您找到{{ experts_count }}个学者：</p>
                  <div>
                    <div class="e_item" v-for="(item, index) in e_result_list" :key="index">
                      <div class="e_avatar">
                        <el-avatar :size="40" :src="sourceUrl"></el-avatar>
                      </div>
                      <div class="e_info">
                        <div class="e_info_name" @click="handleToAuthor(item.id)">{{ item.name }}</div>
                        <div class="e_info_aff">{{ item.affiliate }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 工具栏 -->
            <div class="toolbar">
              <div class="sort-container">
                <el-popover
                    placement="top-start"
                    width="70"
                    trigger="hover">
                  <div class="sort-item" @click="sortByViews" >按浏览量</div>
                  <div class="sort-item" @click="sortByCited">按被引量</div>
                  <div class="sort-item" @click="sortByTime">按时间降序</div>
                  <el-button class="button-sort" slot="reference">
                    <i class="el-icon-sort">按{{ this.getSortMethod }}</i>
                  </el-button>
                </el-popover>
              </div>
              <span class="nums">找到约{{ this.total_rs }}条相关结果</span>
            </div>
            <!-- 列表 -->
            <div v-for="(result_item,index) in result_list" v-bind:key="index">
              <academic-item
                  :c_sc = result_item
                  v-on:toAuthorPage = "searchAuthor"
                  v-on:toSourcePage = "searchSource"></academic-item>
            </div>
          </div>
        </div>
        <div style="clear: both"></div>
        <!-- 页码 -->
        <p class="page">
          <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total=total_rs>
          </el-pagination>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import AcademicItem from "@/components/AcademicItem";
  import FilterItem from "@/components/FilterItem";
  export default {
    name: "AcademicSearch",
    components: {
      FilterItem,
      AcademicItem
    },
    data() {
      return {
        sourceUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        result_list:[],
        total_rs: 1000,// 搜索结果数目，非当前页面展示数量
        result_length: 0,// 当前页的显示数量
        filter_list: [],
        currentPage: 1,
        sort: "views",
        search_words: {
          experts: '',
          origin: '',
          kw:'',
          startTime: '0',
          endTime: '0'
        },
        filter_words: {
          year: '',
          cate: '',
          level: '',
          savetype: '',
          keywords: '',
          type: '',
          authors: '',
          jnls: '',
          affs: '',
        },
        e_result_list: [
          {
            name: "qefsdfadfa噶人",
            id: 43514,
            affiliate: "艾弗森adfasdfad计达"
          },
          {
            name: "按adfadsfasdf对",
            id: 17565,
            affiliate: "你头发把asdfasdfa对"
          },
          {
            name: "热火asdfasdf",
            id: 254615,
            affiliate: "啊日嘎asdfad人格"
          },
          {
            name: "二v人",
            id: 15424,
            affiliate: "安然度过FB"
          },
          {
            name: "二v人",
            id: 15424,
            affiliate: "安然度过FB"
          },
          {
            name: "二v人",
            id: 15424,
            affiliate: "安然度过FB"
          },
          {
            name: "二v人",
            id: 15424,
            affiliate: "安然度过FB"
          },
        ],
        has_experts: false,
        experts_count: 100
      }
    },
    methods: {
      handleSelect(val, name){
        console.log("父组件监听到点击了filter类别：" + name + " 的选线： " + val)
        this.filter_words[name] = val
      },
      handleCancel(name){
        console.log(name + "父组件监听到取消了filter类别：" + name);
        this.filter_words[name] = '';
      },
      handleToAuthor(id) {
        this.$router.push({
          name: 'ScholarPage',
          params: {
            expertid: id
          }
        })
      },
      searchAuthor(val){
        // 判断这个作者是否是唯一的
        this.search_words = {
          experts: val
        }
        // var _this = this
        // this.$api.scholar.getInfoByName({
        //   name: val
        // }).then(res=>{
        //   if (res === "200"){
        //     console.log("该学者有id")
        //     var id = res.data.expertid
        //     _this.$router.push({
        //       name: 'ScholarPage',
        //       query:{
        //         expertid: id
        //       }
        //     })
        //   } else {
        //     _this.search_words = {
        //       experts: val
        //     }
        //   }
        // })
      },
      searchSource(val) {
        this.search_words = {
          kw: val
        }
      },
      sortByViews() {
        console.log("按浏览量排序！");
        this.sort = "views";
      },
      sortByCited() {
        console.log("按被引量排序！");
        this.sort = "cited";
      },
      sortByTime() {
        console.log("按时间降序排序！");
        this.sort = "time";
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      loadSearchSc(){
        var _this = this;
        this.$api.academic.getSearchResult({
          search_words: _this.search_words,
          filter_words: _this.filter_words,
          sort: _this.sort,
          page: _this.currentPage,
          userID: sessionStorage.getItem("userID")
        }).then(res => {
          if (res.code === "200"){
            _this.result_list = res.data.result_list;
            _this.filter_list = res.data.filter_list;
            _this.total_rs = res.data.total;
            _this.result_length = _this.result_list.length;
            _this.e_result_list = res.data.e_result_list;
            if (_this.e_result_list.length === 0){
              _this.has_experts = false
            } else {
              _this.has_experts = true
              _this.experts_count = _this.e_result_list.length
            }
          }else {
            _this.$message({
              message: res.message,
              type: "error"
            })
            console.log("Request => getSearchResult : not 200");
          }
        })
      }
    },
    computed: {
      getSortMethod: function () {
        if (this.sort === "views"){
          return "浏览量";
        } else if (this.sort === "cited"){
          return "被引量";
        } else {
          return "时间降序";
        }
      }
    },
    watch: {
      sort: function () {
        // 监听：排序方式
        var _this = this;
        this.result_list = []
        // this.filter_words = []
        this.$api.academic.getSearchResult({
          search_words: _this.search_words,
          filter_words: _this.filter_words,
          sort: _this.sort,
          page: _this.currentPage,
          userID: sessionStorage.getItem("userID")
        }).then(res => {
          if (res.code === "200"){
            _this.result_list = res.data.result_list;
            // _this.filter_list = res.data.filter_list;
            _this.total_rs = res.data.total;
            _this.result_length = _this.result_list.length;
          } else {
            _this.$message({
              message: res.message,
              type: "error"
            })
            console.log("Request => getSearchResult : not 200");
          }
        })
      },
      currentPage: function () {
        // 监听：页码
        var _this = this
        this.result_list = []
        // this.filter_words = []
        this.$api.academic.getSearchResult({
          search_words: _this.search_words,
          filter_words: _this.filter_words,
          sort: _this.sort,
          page: _this.currentPage,
          userID: sessionStorage.getItem("userID")
        }).then(res => {
          if (res.code === "200"){
            _this.result_list = res.data.result_list;
            // _this.filter_list = res.data.filter_list;
            _this.result_length = _this.result_list.length;
            _this.total_rs = res.data.total;
          } else {
            _this.$message({
              message: res.message,
              type: "error"
            })
            console.log("Request => getSearchResult : not 200");
          }
        })
        sessionStorage.setItem("current_page", this.currentPage.toString());
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      filter_words: {
        // 监听左侧过滤项点击
        handler (){
          console.log("filters改变")
          console.log(this.filter_words)
          var _this = this
          this.result_list = []
          this.$api.academic.getSearchResult({
            search_words: _this.search_words,
            filter_words: _this.filter_words,
            sort: _this.sort,
            page: _this.currentPage,
            userID: sessionStorage.getItem("userID")
          }).then(res => {
            if (res.code === "200"){
              _this.result_list = res.data.result_list;
              // _this.filter_list = res.data.filter_list;
              _this.result_length = _this.result_list.length;
              _this.total_rs = res.data.total;
            } else {
              _this.$message({
                message: res.message,
                type: "error"
              })
              console.log("Request => getSearchResult : not 200");
            }
          })
        },
        deep: true
      },
      search_words: {
        handler () {
          console.log("search_words被修改")
          var _this = this
          this.result_list = [];
          this.$api.academic.getSearchResult({
            search_words: _this.search_words,
            filter_words: {},
            sort: "views",
            page: 1,
            userID: sessionStorage.getItem("userID")
          }).then(res => {
            if (res.code === "200"){
              _this.result_list = res.data.result_list;
              _this.filter_list = res.data.filter_list;
              _this.result_length = _this.result_list.length;
              _this.total_rs = res.data.total;
            } else {
              _this.$message({
                message: res.message,
                type: "error"
              })
              console.log("Request => getSearchResult : not 200");
            }
          })
        },
        deep: true
      }
    },
    mounted() {
      if (window.performance.navigation.type === 1) {
        console.log("页面被刷新")
        this.currentPage = parseInt(sessionStorage.getItem("current_page"))
      }else{
        console.log("首次被加载")
        this.currentPage = 1
        sessionStorage.setItem("current_page", "1")
      }
      this.search_words = JSON.parse(decodeURIComponent(this.$route.params.search_words));
      // alert(this.search_words.kw)
      console.log("获取关键词：" + this.search_words)
      // 加载检索数据
      this.loadSearchSc()
    }
  }
</script>

<style scoped>
  div{
    display: block;
  }
  .wrapper{
    min-width: 1100px;
    text-align: center;
  }
  .container{
    width: 1100px;
    min-height: 1000px;
    text-align: left;
    margin: auto;
  }
  .content-right{
    width: 240px;
    min-height: 220px;
    float: right;
  }
  .content-left{
    width: 860px;
    min-height: 1000px;
    /*margin-right: 300px;*/
  }
  .content-left-nav{
    float: left;
    width: 240px;
    min-height: 208px;
  }
  .content-left-rs{
    float: left;
    width: 620px;
    padding-top: 10px;
  }
  .e_result{
    width: 610px;
    margin-bottom: 15px;
    font-size: 13px;
    line-height: 1.54;
  }
  .e_border{
    padding: 9px;
    border: 1px solid #e3e3e3;
    border-bottom-color: #e0e0e0;
    border-right-color: #ececec;
    box-shadow: 1px 2px 1px rgba(0,0,0,.072);
  }
  .e_tips{
    margin: 0 0 10px 0;
  }
  .e_item{
    display: inline-block;
    margin-right: 10px;
    width: 135px;
    overflow: hidden
  }
  .e_avatar{
    display: inline-block;
    margin-right: 5px;
  }
  .e_info{
    display: inline-block;
    vertical-align: top;
  }
  .e_info_name{
    font-size: 14px;
    color: #0066cc;
    width:90px;
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    overflow: hidden;
  }
  .e_info_name:hover{
    cursor: pointer;
    text-decoration: underline;
  }
  .e_info_aff{
    font-size: 12px;
    width:85px;
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    overflow: hidden;
  }
  .toolbar{
    font-size: 13px;
    color: #9fa19f;
    margin-right: 20px;
  }
  .sort-container{
    float: right;
  }
  .sort-item{
    font-size: 12px;
    line-height: 25px;
    min-width: 70px;
  }
  .sort-item:hover{
    cursor: pointer;
  }
  .button-sort{
    border: none;
    padding: 0;
    font-size: 12px;
  }
  .page{
    margin-left: 240px;
    text-align: center;
  }
</style>
<style>
  .el-popover{
    min-width: 70px;
    padding: 2px 12px 2px 12px;
    box-shadow: none;
  }
</style>

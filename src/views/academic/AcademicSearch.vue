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
            <div class="toolbar">
              <div class="sort-container">
                <el-popover
                    placement="top-start"
                    width="70"
                    trigger="hover">
                  <div class="sort-item" @click="sortByRelative" >按相关性</div>
                  <div class="sort-item" @click="sortByCited">按被引量</div>
                  <div class="sort-item" @click="sortByTime">按时间降序</div>
                  <el-button class="button-sort" slot="reference">
                    <i class="el-icon-sort">按{{ this.getSortMethod }}</i>
                  </el-button>
                </el-popover>
              </div>
              <span class="nums">找到约{{ this.total_rs }}条相关结果</span>
            </div>
            <div v-for="(result_item,index) in result_list" v-bind:key="index">
              <academic-item :item = result_item></academic-item>
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
        result_list:[
          {
            id: "45145141",
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
            version: "中国知网",
            is_favor: false
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
        total_rs: 1000,// 搜索结果数目，非当前页面展示数量
        result_length: 0,// 当前页的显示数量
        filter_list: [
          {
            filter_name: 'year',
            title: "时间",
            filter_itemList: [
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "fbadf",
                count: "42545",
              },
              {
                content: "adfbadfb",
                count: "42545",
              },
              {
                content: "ntaan",
                count: "42545",
              },
              {
                content: "artgna",
                count: "42545",
              },
              {
                content: "artfn",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              }
            ]
          },
          {
            filter_name: 'cate',
            title: "类型",
            filter_itemList: [
              {
                content: "fana",
                count: "42545",
              },
              {
                content: "agtnargt",
                count: "42545",
              }
            ]
          },
          {
            filter_name: 'affs',
            title: "作者",
            filter_itemList: [
              {
                content: "afg",
                count: "42545",
              },
              {
                content: "fgb",
                count: "42545",
              },
              {
                content: "afgn",
                count: "42545",
              },
              {
                content: "afgn",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              },
              {
                content: "dfafga",
                count: "42545",
              }
            ]
          }
        ],
        currentPage: 1,
        sort: "relate",
        search_words: {
          experts: '李华',
          origin: '',
          kw:'计算机',
          startTime: '',
          endTime: ''
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
        }
      }
    },
    methods: {
      handleSelect(val, name){
        console.log(name + "父组件监听成功！成功筛选！"+val)
        this.filter_words[name] = val
      },
      handleCancel(name){
        console.log(name + "父组件监听成功！取消了筛选！");
        this.filter_words[name] = '';
      },
      sortByRelative() {
        console.log("按相关性排序！");
        this.sort = "relate";
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
          search_word: _this.search_words,// 不同检索的字段名
          filter_words: _this.filter_words,
          sort: _this.sort,// 排序方式
          page: _this.currentPage// 页码
        }).then(res => {
          if (res.code === 200){
            _this.result_list = res.data.result_list;
            // _this.filter_list = res.data.filter_list;
            _this.total_rs = res.data.total;
            _this.result_length = _this.result_list.length;
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
        if (this.sort === "relate"){
          return "相关性";
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
        this.$api.academic.getSearchResult({
          search_words: _this.search_words,
          filter_words: _this.filter_words,
          sort: _this.sort,
          page: _this.currentPage
        }).then(res => {
          if (res.code === 200){
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
      currentPage: function () {
        // 监听：页码
        var _this = this
        this.$api.academic.getSearchResult({
          search_words: _this.search_words,
          filter_words: _this.filter_words,
          sort: _this.sort,
          page: _this.currentPage
        }).then(res => {
          if (res.code === 200){
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
      filter_words: {
        // 监听左侧过滤项点击
        handler (){
          console.log("filter_words 父组件对自己深度监听成功！")
          console.log(this.filter_words)
          var _this = this
          this.$api.academic.getSearchResult({
            search_words: _this.search_words,
            filter_words: _this.filter_words,
            sort: _this.sort,
            page: _this.currentPage
          }).then(res => {
            if (res.code === 200){
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
      }
    },
    mounted() {
      this.search_words.kw = this.$route.params.keyword // todo:rbl修改
      console.log("获取关键词：" + this.search_words.kw)
      this.currentPage = 1;
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

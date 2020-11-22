<template>
  <div class="wrapper">
    <div class="container">
      <div class="content-right">
        这里是右侧
      </div>
      <div class="content-left">
        <div class="content-left-nav">
          <div class="left-nav" v-for="(item, index) in category_list" :key="index">
            <screen-item :category="item"></screen-item>
          </div>
        </div>
        <div class="content-left-rs">
          <div class="rs-list">
            <div class="toolbar">
              <div class="sort-container">
                <el-popover
                    placement="top-start"
                    width="70"
                    trigger="hover">
                  <div class="sort-item" @click="sortByRelative()" >按相关性</div>
                  <div class="sort-item" @click="sortByCitation()">按被引量</div>
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
  import ScreenItem from "@/components/ScreenItem";
  export default {
    name: "AcademicSearch",
    components: {
      ScreenItem,
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
        result_length: 0,
        category_list: [
          {
            title: "时间",
            list: [
              {
                name: 9102,
                kind: 1,
                nums: 100
              },
              {
                name: 2020,
                kind: 2,
                nums: 200
              },
              {
                name: 2021,
                kind: 3,
                nums: 300,
              },
              {
                name: 2020,
                kind: 4,
                nums: 200
              },
              {
                name: 2021,
                kind: 5,
                nums: 300,
              },
              {
                name: 2020,
                kind: 6,
                nums: 200
              },
              {
                name: 2021,
                kind: 7,
                nums: 300,
              },
              {
                name: 2020,
                kind: 8,
                nums: 200
              },
              {
                name: 2021,
                kind: 9,
                nums: 300,
              },
              {
                name: 2020,
                kind: 10,
                nums: 200
              },
              {
                name: 2021,
                kind: 11,
                nums: 300,
              },
              {
                name: 2020,
                kind: 12,
                nums: 200
              },
              {
                name: 2021,
                kind: 13,
                nums: 300,
              },
              {
                name: 2021,
                kind: 14,
                nums: 300,
              }
            ]
          },
          {
            title: "时间",
            list: [
              {
                name: 9102,
                kind: 1,
                nums: 100
              },
              {
                name: 2020,
                kind: 2,
                nums: 200
              }
            ]
          },
          {
            title: "时间",
            list: [
              {
                name: 9102,
                kind: 1,
                nums: 100
              },
              {
                name: 2020,
                kind: 2,
                nums: 200
              },
              {
                name: 2021,
                kind: 3,
                nums: 300,
              },
              {
                name: 2020,
                kind: 4,
                nums: 200
              },
              {
                name: 2021,
                kind: 5,
                nums: 300,
              },
              {
                name: 2020,
                kind: 6,
                nums: 200
              },
              {
                name: 2021,
                kind: 7,
                nums: 300,
              },
              {
                name: 2020,
                kind: 8,
                nums: 200
              },
              {
                name: 2021,
                kind: 9,
                nums: 300,
              },
              {
                name: 2020,
                kind: 10,
                nums: 200
              },
              {
                name: 2021,
                kind: 11,
                nums: 300,
              },
              {
                name: 2020,
                kind: 12,
                nums: 200
              },
              {
                name: 2021,
                kind: 13,
                nums: 300,
              },
              {
                name: 2021,
                kind: 14,
                nums: 300,
              }
            ]
          }
        ],
        total_rs: 1000,// 搜索结果数目，非当前页面展示数量
        currentPage: 0,
        sort: "relate",
      }
    },
    methods: {
      sortByRelative() {
        // sort_method = 1
        console.log("按相关性排序！");
        this.sort = "relate";
      },
      sortByCitation() {
        // sort_method = 2
        console.log("按被引量排序！");
        this.sort = "cited";
      },
      sortByTime() {
        // sort_method = 3
        console.log("按时间降序排序！");
        this.sort = "time";
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        var that = this;
        this.$api.academic.getSearchResult({
          search:{
            kw: "big data",
          },
          sort: that.sort,
          page: that.currentPage
        }).then(res=>{
          if (res.code === 200){
            that.result_list = res.data.result_list;
            that.result_length = that.result_list.length;
            that.total_rs = res.data.total;
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
    mounted() {
      var that = this;
      this.$api.academic.getSearchResult({
        search:{
          kw: "big data",
        },
        sort: that.sort,
        page: that.currentPage
      }).then(res => {
        if (res.code === 200){
          console.log("200!!");
          that.result_list = res.data.result_list;
          that.result_length = that.result_list.length;
          that.total_rs = res.data.total;
        }else {
          console.log("not 200!!");
        }
      })
      this.currentPage = 1;
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

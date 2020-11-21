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
                    width="10"
                    trigger="hover">
                  <div class="sort-item" @click="sortByRelative()">按相关性</div>
                  <div class="sort-item" @click="sortByCitation()">按被引量</div>
                  <div class="sort-item" @click="sortByTime">按时间降序</div>
                  <el-button class="button-sort" slot="reference">
                    <i class="el-icon-sort">按{{ this.sort_method }}</i>
                  </el-button>
                </el-popover>
              </div>
              <span class="nums">找到约xxxx条相关结果</span>
            </div>
            <div v-for="(result_item,index) in result_list" v-bind:key="index">
              <academic-item :item = result_item ></academic-item>
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
              :page-size="100"
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
        sort_method: "被引量",
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
        width: 600,
        total_rs: 0,
        currentPage: 0
      }
    },
    methods: {
      sortByRelative() {
        console.log("按相关性排序！");
        this.sort_method = "相关性";
      },
      sortByCitation() {
        console.log("按被引量排序！");
        this.sort_method = "被引量";
      },
      sortByTime() {
        console.log("按时间降序排序！");
        this.sort_method = "时间降序";
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    mounted() {
      this.total_rs = this.result_list.length;
      this.currentPage = 0;
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
  .content-left-nav{
    float: left;
    width: 240px;
    min-height: 208px;
  }
  .content-left-rs{
    float: left;
    width: 620px;
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

<template>
  <div>
    <br>
    <div style="width: 1000px; margin: 0 auto">
      <el-col :span="17">
        <el-row>
          <div style="font-size: 35px; color: #0066cc; float: left;">
            {{academic.title}}
          </div>
        </el-row>
        <table>
          <tr>
            <td style="width: 70px;">
            <span class="tableleft">
              作者：
            </span>
            </td>
            <td style="float:left;">
              <span v-for="expert in academic.experts" :key="expert"
                    class="expert">
                {{expert.name}}
              </span>
            </td>
          </tr>
          <tr valign="top">
            <td>
            <span class="tableleft" >
              摘要：
            </span>
            </td>
            <td style="float:left; text-align: left">
            <span style="white-space: normal">
              {{academic.summary}}
            </span>
            </td>
          </tr>
          <tr >
            <td>
              <span class="tableleft" >关键词：</span>
            </td>
            <td style="float:left;">
            <span v-for="word in academic.keywords" :key="word"
                  class="keyword">
              {{word}}
            </span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="tableleft" >年份：</span>
            </td>
            <td style="float:left;">
              {{academic.time}}
            </td>
          </tr>

          <tr>
            <td>
              <span class="tableleft" >引用量：</span>
            </td>
            <td style="float:left;">
              {{academic.cited_quantity}}
            </td>
          </tr>
          <tr>
            <td>
              <span class="tableleft" >来源：</span>
            </td>
            <td style="float:left;">
              {{academic.origin}}
            </td>
          </tr>
        </table>
        <el-row style="margin-top: 20px">
          <el-col :offset="2" :span="4">
            <el-button type="primary" plain>查看全文</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" round>收藏</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" round>分享</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" round>举报</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" round>认领</el-button>
          </el-col>
        </el-row>
        <hr color="#9c9e9c">
        <p style="text-align: left;font-size: 25px">相关推荐</p>
        这里还没写，就用那个插件
      </el-col>
      <el-col :offset="2" :span="5" align="left">
        这里是右侧<br>

        假装有广告
        <el-image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606065792082&di=7d187b0d11086ec9c4c70aa75dff916f&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa4157de7d4305c8cd4747ccbd137e6301c0f0f5fc746-evgJqN_fw658"></el-image>
      </el-col>
    </div>
  </div>
</template>

<script>

  export default {
    name: "AcademicShow",
    data() {
      return {
        academic: {
          title: "this is the title",
          summary: "摘要 this is the summary this is the summary this is the summary this is the summary this is the summary this is the summary this is the summary this is the summary this is the summary this is the summary this is the summary",
          experts: [
            {name: "学者1"},
            {name: "学者2"},
            {name: "学者3"}
          ],
          keywords:["fds","kdfIFD","段通风户籍"],
          link: "this is the link",
          cited_quantity: 100,
          time: 1990,
          origin: "中国知网"
        },
      }
    },
    mounted() {
      let vue = this;
      this.$api.academic.getById(
          {id:"123"}
      ).then(
          res =>{
            console.log(res);
            console.log(res.data);
            vue.academic = res.data;
          }
      ).catch(err=>{console.log(err)})
    }
  }
</script>

<style scoped>
  .expert{
    color: #0066cc;
  }
  .expert:hover{
    text-decoration: underline;
  }
  .keyword{
    color: #0066cc;
  }
  .keyword:hover{
    text-decoration: underline;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .td{
    float: left;
  }
  .tableleft{
    text-align: left;
    float: left;
    color: #9c9e9c;
  }
</style>

<template>
  <div>
    <br>
    <div style="width: 1000px; margin: 0 auto;">
      <el-col :span="17">
        <el-row>
          <div @click="jumptoLink(academic.link)"
               style="font-size: 35px; color: #0066cc; float: left;cursor: pointer; ">
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
            <td style="float:left;cursor: pointer; ">
              <span v-for="author in academic.authors" :key="author"
                    @click="findByExpert(author.name)"
                    class="expert">
                {{author.name}}
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
            <td style="float:left;cursor: pointer; ">
            <span v-for="word in academic.keywordList" :key="word"
                  @click="findByKw(word)"
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
          <tr>
            <td>
              <span class="tableleft" >浏览量：</span>
            </td>
            <td style="float:left;">
              {{academic.views}}
            </td>
          </tr>
        </table>
        <el-row style="margin-top: 20px">
          <el-col :offset="2" :span="5">
            <el-button type="primary" plain @click="jumptoLink(academic.link)">查看全文</el-button>
          </el-col>
          <el-col :span="5">
            <el-button v-if="academic.is_favor" type="primary" @click="cancelFavorite" round>取消收藏</el-button>
            <el-button v-else type="primary" @click="favorite" round>收藏</el-button>
          </el-col>
          <el-col :span="5">
            <el-button type="primary" round @click="sharedialogVisible = true">分享</el-button>
          </el-col>
<!--          <el-col :span="4">-->
<!--            <el-button type="primary" round>举报</el-button>-->
<!--          </el-col>-->
          <el-col :span="5">
            <el-button type="primary" round @click="dialogVisible = true">认领</el-button>
          </el-col>
        </el-row>

        <hr color="#9c9e9c">
        <p style="text-align: left;font-size: 25px">相关推荐</p>

        <div v-for="(result_item,index) in relation_list" v-bind:key="index">
          <academic-item :item = result_item></academic-item>
        </div>

      </el-col>
      <el-col :offset="2" :span="5" align="left">
        这里是右侧<br>

        假装有广告
        <el-image :src="img"></el-image>
        <el-image :src="img"></el-image>
      </el-col>
      <el-dialog
              title="提示"
              :visible.sync="sharedialogVisible"
              width="30%">
        <el-row style="text-align: left">
          复制下面链接，粘贴到浏览器即可
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-input
                    placeholder="url"
                    v-model="url"
                    :readonly="true">
            </el-input>
          </el-col>

          <el-col :offset="2" :span="2">
            <el-button icon="el-icon-document-copy"
                       v-clipboard:copy="url"
                       v-clipboard:success="copySuccess"
                       v-clipboard:error="copyError"
            ></el-button>
          </el-col>
        </el-row>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sharedialogVisible=false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%">
        <el-row style="text-align: left">
          您确认要认领这篇文献吗？<br>
          请输入您的常用邮箱，管理员会在和您联系后审核您的申请。
        </el-row>

        <el-input
                placeholder="请输入您的邮箱"
                v-model="email"
                clearable>
        </el-input>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="claimSubmit">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import AcademicItem from "@/components/AcademicItem";

  export default {
    name: "AcademicShow",
    components: {
      AcademicItem
    },
    data() {
      return {
        img:require('../../../src/assets/adver.jpg'),
        academic: {
          title: "this is the title",
          summary: "摘要 this is the summary this is the summary this is the summary this is the summary this is the summary this is the summary this is the summary this is the summary this is the summary this is the summary this is the summary",
          authors: [ "学者1","学者2","学者3"],
          keywordList:["fds","kdfIFD","段通风户籍"],
          link: "this is the link",
          cited_quantity: 100,
          time: 1990,
          origin: "中国知网",
          views:123,
          is_favor:true,
        },
        relation_list:[],
        dialogVisible:false,
        sharedialogVisible:false,
        academicID:123,
        url:window.location,
        email:"",
        search_words: {
          kw:'',
          experts:'',
          origin:'',
          startTime: 0,
          endTime: 0,
        }
      }
    },
    methods:{
      findByExpert(expertName){
        this.search_words.experts = expertName;
        this.$router.push({
          name:"AcademicSearch",
          params:{
            search_words: encodeURIComponent(JSON.stringify(this.search_words)),
          }
        })
      },
      findByKw(keyword){
        this.search_words.kw = keyword;
        this.$router.push({
          name:"AcademicSearch",
          params:{
            search_words: encodeURIComponent(JSON.stringify(this.search_words)),
          }
        })
      },
      favorite(){
        let vue = this;
        this.$api.academic.favorSc({
          document_id:vue.academicID,
          token: sessionStorage.getItem("token"),
          user_id: sessionStorage.getItem("userID"),
        }).then(()=>{
          this.$message({
            message: '收藏成功',
            type: 'success'
          });
          vue.academic.is_favor = false;
        }).catch(err=>{
          this.$message.error("请先登录")
          console.log(err)
        })
      },
      cancelFavorite(){
        let vue = this;
        this.$api.academic.favorSc({
          document_id:vue.academicID,
          token: sessionStorage.getItem("token"),
          user_id: sessionStorage.getItem("userID"),
        }).then(()=>{
          this.$message({
            message: '取消收藏成功',
            type: 'success'
          });
          vue.academic.is_favor = true;
        }).catch(err=>{
          this.$message.error("请先登录")
          console.log(err)
        })
      },
      copySuccess(){
        this.$message({
          message: '复制成功',
          type: 'success'
        });
        this.sharedialogVisible = false;
      },
      copyError(){
        this.$message.error('您的浏览器不支持该功能，请自行复制链接内容');
      },
      claimSubmit(){
        let vue = this;
        this.$api.application.create({
          token: sessionStorage.getItem("token"),
          userID: sessionStorage.getItem("userID"),
          objectID: vue.academicID,
          flag: 0,
          email: vue.email
        }).then(res=>{
          if(res.code !== "200"){
            this.$message.error(res.msg);
          }else{
            this.$message({
              message: '认领申请成功',
              type: 'success'
            });
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      jumptoLink(url){
        console.log(url)
        if(window.open(url) === null){
          window.location.herf = url;
        }
      },
      getRelation(){
        let vue = this;
        let kw = "";
        for(let key of vue.academic.keywords){
          kw += key + " "
        }
        this.$api.academic.getSearchResult({
          search_words:{
            experts:"",
            origin:"",
            kw:kw,
            startTime:0,
            endTime:0
          }
        }).then(
            res=>{
              vue.relation_list = res.data.result_list
              console.log(vue.relation_list)
            }
        )
      }
    },
    mounted() {
      let vue = this;
      this.academicID = this.$route.params.academicID
      console.log(this.academicID)
      this.$api.academic.getById(
          {
            document_id:vue.academicID,
            user_id:sessionStorage.getItem("userID"),
          }
      ).then(
          res =>{
            if(res.code == 200) {
              vue.academic = res.data;
              console.log(vue.academic);
            }
            else{
              this.$message.error("文章不存在或已被删除")
            }
          }
      ).catch(err=>{
        console.log(err)
        this.$message.error("文章不存在或已被删除")
      })
      this.getRelation();
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

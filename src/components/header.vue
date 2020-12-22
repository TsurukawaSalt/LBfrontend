<template>
  <div>
    <el-header v-if="this.status == 1" class="header_1">
      <el-input class="h_search" placeholder="请输入你要查找的内容" v-model="search_words.searchWords" @keyup.enter.native="goSearch(false)">
        <el-button v-popover:search type="text" slot="prepend" icon="el-icon-caret-bottom">高级搜索</el-button>
        <el-button icon="el-icon-search" slot="append" @click="goSearch(false)"></el-button>
      </el-input>
      <el-popover
          ref="search"
          placement="bottom"
          width="600"
          :offset="-250"
          title="高级搜索"
          trigger="click">
        <el-form ref="search_words" :model="search_words" label-width="80px">
          <el-form-item label="检索词">
            <el-input v-model="search_words.searchWords" placeholder="多个检索词用空格分开"></el-input>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="search_words.title" placeholder="输入标题检索"></el-input>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="search_words.keyWords" placeholder="多个关键字用空格分开"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="search_words.experts" placeholder="多个作者用空格分开"></el-input>
          </el-form-item>
          <el-form-item label="来源">
            <el-input v-model="search_words.origin"></el-input>
          </el-form-item>
          <el-form-item label="发表时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择起始日期" v-model="search_words.startTime" style="width: 90%"></el-date-picker>
            </el-col>
            <!--          <el-col class="line" :span="1"> - </el-col>-->
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择截至日期" v-model="search_words.endTime" style="width: 90%"></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button @click="goSearch(true)">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-popover>

      <div class="r_con">
        <el-badge value="new" class="newMsg">
          <el-button v-popover:popover type="info" icon="el-icon-message" class="r_con_mess_1">消息</el-button>
        </el-badge>
        <el-button type="text" v-if="isLogin" class="r_con_user" @click="goUser()">{{this.userName}}</el-button>
        <el-button type="text" v-if="isLogin" class="r_con_reLogin" @click="reLogin()">退出登录</el-button>
        <el-button type="text" v-if="!isLogin" class="r_con_login" @click="goLogin()">登录</el-button>
        <el-button type="text" v-if="!isLogin" class="r_con_Register" @click="goRegister()">注册</el-button>
      </div>
      <el-popover
          ref="popover"
          title="消息列表"
          placement="bottom"
          width="290"
          trigger="click"
          content="123456789"
      >
<!--          <span>卡片名称</span>-->
        <el-button v-if="!this.isRead" class="check_isRead_button" type="text" @click="isRead = true">查看已读消息</el-button>
        <el-button v-if="this.isRead" class="goBack_isRead_button" type="text" @click="isRead = false">返回</el-button>
        <el-col v-if="!this.isRead" class="MsgCol">
          <el-row v-for="(o, index) in 8" :key="index" class="MsgRow">
            <el-card class="MsgCard">
              <div slot="header" class="clearfix">
                <span>title</span>
              </div>
              <div class="MsgContent">123465</div>
              <br>
              <div class="button_block">
                <el-button class="read_button"  type="success" icon="el-icon-check" circle></el-button>
                <el-button class="del_button" type="danger" icon="el-icon-delete" circle></el-button>
              </div>

            </el-card>
          </el-row>
        </el-col>
        <el-col v-if="this.isRead" class="MsgCol">
          <el-row v-for="(o, index) in 8" :key="index" class="MsgRow">
            <el-card class="MsgCard">
              <div slot="header" class="clearfix">
                <span>title</span>
              </div>
              <div class="MsgContent">54321</div>
              <br>
              <div class="r_button_block">
                <el-button class="not_read_button" >设为未读</el-button>
                <el-button class="del_button" type="danger" icon="el-icon-delete" circle></el-button>
              </div>
            </el-card>
          </el-row>
        </el-col>
      </el-popover>

    </el-header>

    <el-header v-if="this.status == 2" class="header_2">
      <div class="r_con">
        <el-button v-popover:popover type="text" class="r_con_mess_2">消息</el-button>
        <el-button v-if="isLogin" class="r_con_user" type="text" @click="goUser()">{{this.userName}}</el-button>
        <el-button v-if="isLogin" class="r_con_reLogin" type="text" @click="reLogin()">退出登录</el-button>
        <el-button v-if="!isLogin" class="r_con_login" type="text" @click="goLogin()">登录</el-button>
        <el-button v-if="!isLogin" class="r_con_Register" type="text" @click="goRegister()">注册</el-button>
      </div>
      <el-popover
          ref="popover"
          title="消息"
          placement="bottom"
          width="200"
          trigger="click"
      >
        <el-row v-for="(o, index) in 4" :key="index">
          <el-card>123456</el-card>
        </el-row>
      </el-popover>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "header",
  data(){
    return {
      search_words: {
        searchWords:'',
        title:'',
        keyWords:'',
        experts:'',
        origin:'',
        startTime: 0,
        endTime: 0,
      },
      isLogin:false,
      userName:'',
      isRead: false,
      msgList:[],
      msgNum: 0
    }
  },
  props: {
    status: {
      // type: String,
      required: false,
      default: "1",
    }
  },
  methods:{
    goSearch(isAdvanced){
      if (!isAdvanced) {
        if (this.search_words.searchWords !== '') {
          this.$router.push({
            name:"AcademicSearch",
            params:{
              search_words: encodeURIComponent(JSON.stringify(this.search_words))
            }
          })
        } else {
          alert("搜索内容为空")
        }
      } else {
        if (this.search_words.searchWords === ''
            && this.search_words.title === ''
            && this.search_words.keyWords === ''
            && this.search_words.experts === ''
            && this.search_words.origin === ''
            && this.search_words.startTime === 0
            && this.search_words.endTime === 0) {
          alert("搜索内容为空")
        } else {
          // alert(this.search_words.startTime)
          this.$router.push({
            name:"AcademicSearch",
            params:{
              search_words: encodeURIComponent(JSON.stringify(this.search_words)),
            }
          })
        }
      }
    },
    goUser() {
      this.$router.push({
        name:"PerInfo"
      })
    },
    goLogin() {
      this.$router.push({
        name:"Login"
      })
    },
    goRegister() {
      this.$router.push({
        name:"Register"
      })
    },
    reLogin() {
      sessionStorage.clear()
      location.reload()
    }
  },
  mounted() {
    if(sessionStorage.getItem("userName")!=null||sessionStorage.getItem("userID")!=null){
      this.isLogin = true
      this.userName = sessionStorage.getItem("userName")

      // 获取消息列表
      let _this = this
      this.$api.message.getMessage({
        token: sessionStorage.getItem("token"),
        userID: sessionStorage.getItem("userID"),
      }).then(res => {
        if (res.code === "200"){
          _this.msgList = res.data.rows;
          _this.msgNum = res.data.rows.length;
        } else {
          // _this.$message({
          //   message: res.msg,
          //   type: "error"
          // })
        }
      })
    }
  }
}
</script>

<style scoped>
  .header_1 {
    /*position: absolute;*/
    min-width: 800px;
    /*width: 100%;*/
    background-color: #2c3e50;
    margin: -10px -8px 0 -8px;
    padding: 0;
  }

  .h_search {
    width: 400px;
    margin: 10px;
  }
  .h_search >>> .el-input__inner {
    border-radius: 0 0 0 0;
    border-width: 2px 0px 2px 0px;
    border-width: 0;
    border-color: #245cc0;
    font-size: 18px;
    /*height: 60px;*/
  }

  .h_search >>> .el-input-group__append {
    border-radius: 0 15px 15px 0;
    border-width: 0;
    /*border-style: dashed;*/
    /*border-color: grey;*/
    background: white;
    /*height: 60px;*/
    width: 20px;
    font-size: 18px;
    /*color: black;*/
  }

  .h_search >>> .el-input-group__prepend {
    border-radius: 15px 0 0 15px;
    border-width: 0 1px 0 0;
    background: white;
    border-style: solid dashed solid solid;
    /*height: 60px;*/
    width: 60px;
    font-size: 15px;
    color: grey;
  }

  @media screen and (min-width: 1400px){
    .h_search {
      width: 600px;
    }
  }
  .r_con {
    //position: absolute;
    margin-top: 12px;
    width: 300px;
    float: right;
    left: calc(100% - 200px);
  }
  .r_con_mess_1 {
    border-radius: 15px;
    margin-right: 10px;
    border-width: 0;
    background: darkslateblue;
    /*color: #8c939d;*/
  }
  .r_con_mess_2 {
    border-radius: 15px;
    margin-right: 10px;
    border-width: 0;
    //background: darkslateblue;
    /*color: #8c939d;*/
  }
  .newMsg {
    width: 77px;
    /*height: 10px;*/
  }
  .r_con_user {
    margin-right: 15px;
    margin-left: 50px;
  }
  .r_con_reLogin {
    left: 10px;
  }
  .r_con_login {
    margin-right: 10px;
    margin-left: 35px;
  }
  .r_con_Register {
  }

  .MsgCol {
    height: 500px;
    width: 300px;
    overflow-x: hidden;
  }

   .MsgCol::-webkit-scrollbar {
      width: 6px;
      height: 6px;
   }
   .MsgCol::-webkit-scrollbar-thumb {
     background-color: #ddd;
     border-radius: 3px;
   }

  .MsgRow{
    height: 230px;
    width: 280px;
  }
  .MsgCard {
    height: 200px;
  }
  .MsgContent {
    height: 100px;

    /*margin-bottom: 10px;*/
  }

  .button_block {
    position: absolute;
    width: 200px;
    left: 150px;
    top: -90px;
  }
  .r_button_block {
    position: absolute;
    width: 200px;
    left: 100px;
    top: -90px;
  }

  .check_isRead_button{
    position: absolute;
    color: #0066cc;
    top: 5px;
    left: 230px;
  }
  .goBack_isRead_button{
    position: absolute;
    color: #8c939d;
    top: 5px;
    left: 250px;
  }
  .read_button {
    //position: absolute;
    left: 150px;
  }
  .not_read_button {
    //position: absolute;
    background: #409EFF;
    color: white;
    border-radius: 25px;
    //left: 100px;
  }

  .del_button {
    //position: absolute;
    left: 200px;
  }

  .header_2 {
    min-width: 800px;
    margin: -10px -8px 0 -10px;
    padding: 0;
  }
</style>
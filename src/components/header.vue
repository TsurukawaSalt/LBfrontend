<template>
  <div>
    <el-header v-if="this.status == 1" class="header_1">
      <el-input class="h_search" placeholder="请输入你要查找的内容" v-model="search_words.kw" @keyup.enter.native="goSearch(false)">
        <el-button v-popover:search slot="append">高级搜索</el-button>
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
            <el-input v-model="search_words.kw" placeholder="多个检索词用空格分开"></el-input>
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
<!--        <el-badge is-dot>-->
          <el-button v-popover:popover type="text" class="r_con_mess">消息</el-button>
<!--        </el-badge>-->
        <el-button type="text" v-if="isLogin" class="r_con_user" @click="goUser()">{{this.userName}}</el-button>
        <el-button type="text" v-if="isLogin" class="r_con_reLogin" @click="reLogin()">退出登录</el-button>
        <el-button type="text" v-if="!isLogin" class="r_con_login" @click="goLogin()">登录</el-button>
        <el-button type="text" v-if="!isLogin" class="r_con_Register" @click="goRegister()">注册</el-button>
      </div>
      <el-popover
          ref="popover"
          title="消息"
          placement="bottom"
          width="200"
          trigger="click"
          content="123456789"
      >
        <el-row v-for="(o, index) in 4" :key="index">
          <el-card>123456</el-card>
        </el-row>
      </el-popover>

    </el-header>

    <el-header v-if="this.status == 2" class="header_2">
      <div class="r_con">
        <el-button v-popover:popover type="text" class="r_con_mess">消息</el-button>
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
          content="123456789"
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
        kw:'',
        experts:'',
        origin:'',
        startTime: 0,
        endTime: 0,
      },

      isLogin:false,
      userName:'',
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
        if (this.search_words.kw !== '') {
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
        if (this.search_words.kw === ''
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
    }
  }
}
</script>

<style scoped>
  .header_1 {
    background-color: #2c3e50;
    margin: -10px -8px 0 -10px;
    padding: 0;
  }

  .h_search {
    width: 400px;
    margin: 10px;
  }
  @media screen and (min-width: 1400px){
    .h_search {
      width: 600px;
    }
  }
  .r_con {
    position: absolute;
    top: 8px;
    right:4%;
  }
  .r_con_mess {
    margin-right: 10px;
  }
  .r_con_user {
    margin-right: 15px;
  }
  .r_con_reLogin {
    left: 10%;
  }
  .r_con_login {
    margin-right: 10px;
  }
  .r_con_Register {
  }

  .header_2 {
    margin: -10px -8px 0 -10px;
    padding: 0;
  }
</style>
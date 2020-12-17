<template>
  <div>
    <el-header v-if="this.status == 1" class="header_1">
      <el-input class="h_search" placeholder="请输入你要查找的内容"  v-model="keyword" @keyup.enter.native="goSearch()">
        <el-button slot="append" icon="el-icon-search" @click="goSearch()"></el-button>
      </el-input>

      <div class="r_con">
        <el-button type="text" v-if="isLogin" class="r_con_user" :underline="false" @click="goUser()">{{this.userName}}</el-button>
        <el-button v-popover:popover type="text" class="r_con_user">消息</el-button>
        <el-button type="text" v-if="isLogin" class="r_con_reLogin" :underline="false" @click="reLogin()">退出登录</el-button>
        <el-button type="text" v-if="!isLogin" class="r_con_login" :underline="false" @click="goLogin()">登录</el-button>
        <el-button type="text" v-if="!isLogin" class="r_con_Register" :underline="false" @click="goRegister()">注册</el-button>
      </div>
      <el-popover
          ref="popover"
          title="消息"
          placement="bottom"
          width="200"
          trigger="click"
          content="123456789"
      >
      </el-popover>

    </el-header>

    <el-header v-if="this.status == 2" class="header_2">
      <div class="r_con">
        <el-link v-if="isLogin" class="r_con_user" :underline="false" @click="goUser()">{{this.userName}}</el-link>
        <el-link v-if="isLogin" class="r_con_reLogin" :underline="false" @click="reLogin()">退出登录</el-link>
        <el-link v-if="!isLogin" class="r_con_login" :underline="false" @click="goLogin()">登录</el-link>
        <el-link v-if="!isLogin" class="r_con_Register" :underline="false" @click="goRegister()">注册</el-link>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "header",
  data(){
    return {
      keyword:'',
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
    goSearch(){
      if (!this.keyword) {
        alert("搜索内容为空")
      } else {
        this.$router.push({
          name:"AcademicSearch",
          params:{
            keyword:this.keyword
          }
        })
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
    margin: -10px -10px 0 -10px;
    padding: 0;
  }
  .h_search {
    width: 40%;
    margin: 10px;
  }

  .r_con {
    position: absolute;
    top: 8px;
    right: 4%;
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
    margin: -10px -10px 0 -10px;
    padding: 0;
  }
</style>
<template>
    <el-aside style="width: 200px">
        <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="/perInfo" @click="gotoPerInfo">
            <i class="el-icon-user"></i>
            <template slot="title">个人信息</template>
        </el-menu-item>
        <el-menu-item index="/myStar" @click="gotoMyStar">
            <i class="el-icon-star-off"></i>
            <template slot="title">我的收藏</template>
        </el-menu-item>
        <el-menu-item index="/myFocus" @click="gotoMyFocus">
            <i class="el-icon-collection-tag"></i>
            <template slot="title">我的关注</template>
        </el-menu-item>
        <el-menu-item index="/myHistory" @click="gotoMyHistory">
            <i class="el-icon-view"></i>
            <template slot="title">浏览历史</template>
        </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
export default {
  name: "userAside",
  data(){
    return {

    }
  },
  methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      gotoPerInfo() {
          this.$router.push({path: '/perInfo'});
      },
      gotoMyStar() {
          this.$router.push({path: '/myStar'});
      },
      gotoMyFocus() {
          this.$router.push({path: '/myFocus'});
      },
      gotoMyHistory() {
          this.$router.push({path: '/myHistory'});
      }
  }

}
</script>
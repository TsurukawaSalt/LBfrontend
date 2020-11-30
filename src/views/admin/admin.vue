<template>
  <div>
    <Header></Header>
    <el-container>
      <el-aside style="width: 15%">
        <el-menu default-active="1-1">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>认领门户</template>
            <el-menu-item index="1-1" @click="showNum=toDealAppExperts">
              <template slot="title">待处理申请</template>
            </el-menu-item>
            <el-menu-item index="1-2" @click="showApp=allAppExperts">
              <template slot="title">全部申请</template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>认领文献</template>
            <el-menu-item index="2-1" @click="showNum=toDealAppAcademic">
              <template slot="title">待处理申请</template>
            </el-menu-item>
            <el-menu-item index="2-2" @click="showApp=allAppAcademic">
              <template slot="title">全部申请</template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-table
                :data="showApp.rows">
          <el-table-column
                  prop="userName"
                  label="用户名">
          </el-table-column>
          <el-table-column
                  prop="objectName"
                  label="申请名">
          </el-table-column>
          <el-table-column
                  prop="flag"
                  label="类型">
          </el-table-column>
          <el-table-column
                  prop="time"
                  label="时间">
          </el-table-column>
          <el-table-column
                  prop="result"
                  label="状态">
          </el-table-column>
          <el-table-column
                  prop="msg"
                  label="审批意见"
                  width="300">
          </el-table-column>
          <el-table-column width="80">
            <el-button type="primary" plain>通过</el-button>
          </el-table-column>
          <el-table-column width="80">
            <el-button type="danger" plain>拒绝</el-button>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Header from '@/components/header.vue';
  export default {
    name: "admin",
    components: {
      Header
    },
    data(){
      return {
        showNum:1,
        allAppExperts:[],
        toDealAppExperts:[],
        allAppAcademic:[],
        toDealAppAcademic:[],
        showApp:[]
      }
    },
    methods:{
      getAllApp(){
        this.getOneApp(true,1,10,1);
        this.getOneApp(false,1,10,1);
        this.getOneApp(true,0,10,1);
        this.getOneApp(false,0,10,1);
      },
      getOneApp(isAll,flag,size,page){
        let vue = this;
        this.$api.application.getAll({
          size,
          page,
          isAll,
          flag,
          token:'hv678h3fgrb8huirt'
        }).then(res =>{
          if(res.code === 200){
            console.log(res.data)
            if(isAll && flag === 1)
              vue.allAppExperts = res.data;
            if(isAll && flag === 0) {
              vue.allAppAcademic = res.data;
              console.log(2)
            }
            if((isAll === false) && flag === 1) {
              vue.toDealAppExperts = res.data;
              console.log(3)
            }
            if((isAll === false) && flag === 0)
              vue.toDealAppAcademic = res.data;
          }else{
            console.log(res.code,res.msg);
          }
        })
      }
    },
    mounted() {
      this.getAllApp();
    }
  }
</script>

<style scoped>

</style>
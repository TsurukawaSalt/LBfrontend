<template>
  <div>
    <Header></Header>
    <el-container>
      <el-aside style="width: 14%">
        <el-menu default-active="2-1">
<!--          <el-submenu index="1">-->
<!--            <template slot="title"><i class="el-icon-message"></i>认领门户</template>-->
<!--            <el-menu-item index="1-1" @click="changeState('1-1')">-->
<!--              <template slot="title">待处理申请</template>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="1-2" @click="changeState('1-2')">-->
<!--              <template slot="title">全部申请</template>-->
<!--            </el-menu-item>-->
<!--          </el-submenu>-->
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>认领文献</template>
            <el-menu-item index="2-1" @click="changeState('2-1')">
              <template slot="title">待处理申请</template>
            </el-menu-item>
            <el-menu-item index="2-2" @click="changeState('2-2')">
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
                  :label="openExperts?'学者名':'文献标题'">
          </el-table-column>
          <el-table-column
                  prop="time"
                  label="时间">
          </el-table-column>
          <el-table-column
                  prop="result"
                  label="状态">
            <template slot-scope="scope">
              {{scope.row.result===0?'未审核':'已审核'}}
            </template>
          </el-table-column>
          <el-table-column
                  prop="msg"
                  label="审批意见"
                  width="300">
          </el-table-column>
          <el-table-column width="80">
            <template slot-scope="scope">
              <el-button type="primary" plain @click="agreeSubmit(scope.row)">通过</el-button>
            </template>
          </el-table-column>
          <el-table-column width="80">
            <template slot-scope="scope">
              <el-button type="danger" plain @click="reject(scope.row)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
                  layout="prev, pager, next"
                  :current-page="showApp.page"
                  @current-change="changePage(showApp === allAppAcademic)"
                  :total="showApp.totalElements">
          </el-pagination>
        </div>
      </el-main>
    </el-container>

    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
      <el-input
              placeholder="请输入拒绝原因"
              v-model="rejectReason"
              clearable>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rejectSubmit">确 定</el-button>
      </span>
    </el-dialog>

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
        allAppExperts:[],
        toDealAppExperts:[],
        allAppAcademic:[],
        toDealAppAcademic:[],
        showApp:[],

        openExperts:true,
        dialogVisible:false,
        rejectItem:null,
        rejectReason:null,

        current_page:3,
        total_page:10,
        total_elements:1000,
      }
    },
    methods:{
      reject(row){
        this.dialogVisible = true;
        this.rejectItem = row;
      },
      rejectSubmit(){
        this.dialogVisible = false
        let vue = this;
        console.log(this.rejectItem+this.rejectReason)
        this.$api.application.reject({
          formID:vue.rejectItem.formID,
          token:'',
          reason:vue.rejectReason
        })
        this.$message({
          message: '已拒绝该申请',
          type: 'warning'
        });
      },
      agreeSubmit(row){
        row;
        this.$api.application.agree({
          formID:row.formID,
          token:''
        })
        this.$message({
          message: '已同意该申请',
          type: 'success'
        });
      },
      changePage(isAll){
        console.log(this.showApp.page)
        this.getOneApp(isAll,0,this.showApp.page);
      },
      changeState(id){
        if(id === '1-1'){
          this.showApp = this.toDealAppExperts
          this.openExperts = true
        }
        if(id === '1-2'){
          this.showApp = this.allAppExperts;
          this.openExperts = true
        }
        if(id === '2-1'){
          this.showApp = this.toDealAppAcademic
          this.openExperts = false
        }
        if(id === '2-2'){
          this.showApp = this.allAppAcademic
          this.openExperts = false
        }
      },
      getAllApp(){
        //this.getOneApp(true,1,10,1);
        //this.getOneApp(false,1,10,1);
        this.getOneApp(true,0,1);
        this.getOneApp(false,0,1);
      },
      getOneApp(isAll,flag,page){
        let vue = this;
        this.$api.application.getAll({
          size : 10,
          page:page,
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
            }
            if((isAll === false) && flag === 1) {
              vue.toDealAppExperts = res.data;
            }
            if((isAll === false) && flag === 0) {
              vue.toDealAppAcademic = res.data;
              vue.showApp = res.data;
            }
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
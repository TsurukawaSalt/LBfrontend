<template>
    <div>
        <Header>
        </Header>
        <div class="avatar-uploader">
            <img v-if="perInfo.url" :src="perInfo.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
        <div class="info">
            <el-row class="row">
                <el-col :span="5" class="font1">用户ID</el-col>
                <el-col :span="3" class="font2">:</el-col>
                <el-col :span="48" class="font3">{{perInfo.userID}}</el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="5" class="font1">昵称</el-col>
                <el-col :span="3" class="font2">:</el-col>
                <el-col :span="48" class="font3">{{perInfo.nickName}}</el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="5" class="font1">姓名</el-col>
                <el-col :span="3" class="font2">:</el-col>
                <el-col :span="48" class="font3">{{perInfo.realName}}</el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="5" class="font1">邮箱</el-col>
                <el-col :span="3" class="font2">:</el-col>
                <el-col :span="48" class="font3">{{perInfo.email}}</el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="5" class="font1">电话</el-col>
                <el-col :span="3" class="font2">:</el-col>
                <el-col :span="48" class="font3">{{perInfo.phoneNum}}</el-col>
            </el-row> 
            <el-row style="line-height:70px">
                <el-button type="primary" round class="left-button" @click="gotochangeInfo">修改信息<i class="el-icon-edit"></i></el-button>
            </el-row>          
        </div>
    </div>
</template>
<script>
    import Header from "@/components/header.vue";
    export default {
        name: "PerInfo",
        components: {
            Header,
        },
        mounted() {
            var _this = this
            this.$api.user.getPerInfo({
                 userID:sessionStorage.getItem("userID"),
            }).then(res=>{
                if(res.code === 200){
                    _this.perInfo.userID= sessionStorage.getItem("userID");
                    _this.perInfo.nickName= res.data.nickName;
                    _this.perInfo.realName= res.data.realName;
                    _this.perInfo.email= res.data.email;
                    _this.perInfo.phoneNum= res.data.phoneNum;
                    _this.perInfo.url= res.data.url;
                }
                else{
                    _this.$message.error(res.msg);
                }
            })
        },
        data() {
            return {

                perInfo: {
                    userID : '',
                    nickName : '',
                    realName : '',
                    email : '',
                    phoneNum : '',
                    url : ''
                }
            };
        },
        methods: {
            gotochangeInfo() {
                this.$router.push({path: '/changeInfo'});
            },            
        }
    }
</script>
<style scoped>
    .all {
        background-color: #EBEEF5;
        width: 100%;
        height: 100%;
        position:fixed;
        background-size: 100%;
    }
    .avatar-uploader {
        margin-top: 3%;
        margin-left: 44%;
        width: 178px;
        border: 1px dashed black;
        border-radius: 100%;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .info {
        margin-top: 2%;
        margin-left: 30%;
        width: 600px;
        height: 430px;
    }
    .row {
        line-height: 70px;
        border-bottom: 2px black dotted;
    }
    .font1 {
        font-size: 20px;
        text-align: center;
        font-family: "Microsoft YaHei";
    }
    .font2 {
        font-size: 20px;
        text-align: center;
        font-family: "Microsoft YaHei";
    }
    .font3 {
        font-size: 20px;
        text-align: center;
        font-family: "Microsoft YaHei";
    }
</style>
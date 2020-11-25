<template>
    <div>
        <Header>
        </Header>
        <div class="avatar-uploader">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
        <div class="info">
            <el-row class="row">
                <el-col :span="5" class="font">用户ID</el-col>
                <el-col :span="3" class="font">:</el-col>
                <el-col :span="48" class="font">{{perInfo.userID}}</el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="5" class="font">用户名</el-col>
                <el-col :span="3" class="font">:</el-col>
                <el-col :span="48" class="font">{{perInfo.userName}}</el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="5" class="font">姓名</el-col>
                <el-col :span="3" class="font">:</el-col>
                <el-col :span="48" class="font">{{perInfo.realName}}</el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="5" class="font">邮箱</el-col>
                <el-col :span="3" class="font">:</el-col>
                <el-col :span="48" class="font">{{perInfo.email}}</el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="5" class="font">电话</el-col>
                <el-col :span="3" class="font">:</el-col>
                <el-col :span="48" class="font">{{perInfo.phoneNum}}</el-col>
            </el-row> 
            <el-row style="line-height:70px">
                <el-button type="primary" round class="left-button" @click="gotochangeInfo">修改信息</el-button>
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
            this.$http.get(this.requestUrl+"/getPerInfo",{
                params:{
                    userID:sessionStorage.getItem("userID"),
                }
            }).then(res=>{
                if(res.data.success){
                    this.perInfo.userID= sessionStorage.getItem("userID");
                    this.perInfo.userName= res.data.userName;
                    this.perInfo.realName= res.data.realName;
                    this.perInfo.email= res.data.email;
                    this.perInfo.phoneNum= res.data.phoneNum;
                }
                else{
                    // alert(res.data.msg);
                    this.$message.error(res.data.msg);
                }
            })
        },
        data() {
            return {
                imageUrl: '',

                perInfo: {
                    userID : '',
                    userName : '',
                    realName : '',
                    email : '',
                    phoneNum : ''
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
    .backgroud {
        background: url("../../assets/perInfoBackgroud.jpg");
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
    .font {
        font-size: 25px;
        text-align: center;
        font-family: "Microsoft YaHei";
    }
</style>
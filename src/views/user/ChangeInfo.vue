<template>
    <div>
        <Header>
        </Header>
        <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
            <img v-if="perInfo.url" :src="perInfo.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form  class="info" label-position="left"
            label-width="90px" v-loading="loading">
            <el-form-item label="用户名：" class="table">
                <el-input type="text" v-model="perInfo.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" class="table">
                <el-input type="text" v-model="perInfo.realName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" class="table">
                <el-input type="email" v-model="perInfo.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话：" class="table">
                <el-input type="text" v-model="perInfo.phoneNum" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item style="width: 75%">
                <el-button type="primary" style="width: 40%" @click="preserveInfo">保存</el-button>
            </el-form-item> 
        </el-form>
        <el-form  class="pw" label-position="left"
            label-width="90px" v-loading="loading">
            <el-form-item label="新密码：" class="table">
                <el-input type="password" v-model="perInfo.passwd1" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" class="table">
                <el-input type="password" v-model="perInfo.passwd2" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item style="width: 75%">
                <el-button type="primary" style="width: 40%" @click="changePasswd">保存</el-button>
            </el-form-item> 
        </el-form>
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
                    this.perInfo.userName= res.data.userName;
                    this.perInfo.realName= res.data.realName;
                    this.perInfo.email= res.data.email;
                    this.perInfo.phoneNum= res.data.phoneNum;
                    this.perInfo.url= res.data.url;
                }
                else{
                    // alert(res.data.msg);
                    this.$message.error(res.data.msg);
                }
            })
        },
        data() {
            return {
                perInfo: {
                    userID : '',
                    userName : '',
                    realName : '',
                    email : '',
                    phoneNum : '',
                    url : '',
                    passwd1 : '',
                    passwd2 : ''
                }
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.perInfo.url = URL.createObjectURL(file.raw);
                this.$http.post(this.requestUrl+"/changeImg",{
                params:{
                    userID:sessionStorage.getItem("userID"),
                    url:this.perInfo.url
                }
            }).then(res=>{
                if(res.data.success){
                    this.$message.success(res.data.msg);
                }
                else{
                    this.$message.error(res.data.msg);
                }
            })
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            preserveInfo() {
                const emailPattern =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                const phoneNumPattern = /^1[3|4|5|7|8][0-9]{9}$/;
                if(!this.perInfo.userName||!this.perInfo.realName||!this.perInfo.email||!this.perInfo.phoneNum) {
                    this.$message({
                        message: '信息不能为空',
                        type: 'warning'
                    });
                }
                else if(!emailPattern.test(this.perInfo.email)) {
                    this.$message({
                        message: '请输入正确的邮箱',
                        type: 'warning'
                    });
                }
                else if(!phoneNumPattern.test(this.perInfo.phoneNum)) {
                    this.$message({
                        message: '请输入正确的电话号码',
                        type: 'warning'
                    });
                }
                else {
                    this.$http.post(this.requestUrl+"/changeInfo",{
                        params:{
                            userID:sessionStorage.getItem("userID"),
                            userName:this.perInfo.userName,
                            realName:this.perInfo.realName,
                            email:this.perInfo.email,
                            phoneNum:this.perInfo.phoneNum
                        }
                    }).then(res=>{
                        if(res.data.success){
                            this.$message.success(res.data.msg);
                        }
                        else{
                            this.$message.error(res.data.msg);
                        }
                    })
                }
            },
            preservePasswd() {
                if(!this.user.passwd1) {
                    this.$message({
                        message: '密码不能为空',
                        type: 'warning'
                    });
                }
                else if (this.perInfo.passwd1!==this.perInfo.passwd2) {
                    this.$message({
                        message: '两次密码不一致，请重新输入',
                        type: 'warning'
                    });
                }
                else {
                    var encryptionPasswd = this.$md5(this.user.passwd1);
                    this.$http.post(this.requestUrl+"/changePasswd",{
                        params:{
                            userID:sessionStorage.getItem("userID"),
                            passwd:encryptionPasswd
                        }
                    }).then(res=>{
                        if(res.data.success){
                            this.$message.success(res.data.msg);
                        }
                        else{
                            this.$message.error(res.data.msg);
                        }
                    })
                }
            }     
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
        margin-top: 15%;
        margin-left: 18%;
        width: 178px;
        border: 1px dashed black;
        border-radius: 100%;
        cursor: pointer;
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
        margin-top: -22%;
        margin-left: 40%;
        width: 600px;
        height: 430px;
    }
    .pw {
        margin-top: -5%;
        margin-left: 40%;
        width: 600px;
        height: 430px;        
    }
    .table {
        height: 50px;
        width: 500px;
    }
    .font {
        font-size: 28px;
        text-align: center;
        font-family: "Microsoft YaHei";
    }
</style>
<template>
  <el-card class="card-body">
    <a href="#" class="nav-title">
      <i class="el-icon-arrow-up" style="float: right"></i>
      时间
    </a>
    <div class="nav-list">

    </div>
  </el-card>
</template>

<script>
export default {
  name: "ScreenItem"
}
</script>

<style scoped>
  .el-card{
    font-size: 13px;
    border-top: none;
    border-left: none;
    border-right: none;
    box-shadow: none;
    margin-right: 50px;
  }
  .el-card /deep/ .el-card__body{
    padding: 10px 10px 15px 0;
  }
  .nav-title{
    color: darkgrey;
  }
  a:-webkit-any-link{
    /*color: #0066cc;*/
    text-decoration-line: none;
  }
</style>

<template>
  <div>
    <el-input class="search" placeholder="请输入你要查找的内容" prefix-icon="el-icon-search" v-model="input">
        <el-button slot="append">搜索</el-button>
    </el-input>
    <form>
        <input type="text" placeholder="搜索从这里开始...">
        <button type="submit"></button>
    </form>
  </div>
</template>

<script>
export default {
    name:"homePage",
    data() {
        return {

        }
    }
}
</script>

<style scoped>
    .search {
        position: absolute;
        top: 50%;
        left: 25%;
        width: 50%;
    }
    .search>>>.el-input__inner {
        border-radius: 30px;
        border-width: 2px;
        height: 60px;
    }
    .search .el-input .el-button__inner {
        border-radius: 30px;
        border-width: 2px;
        height: 60px;
    }
</style>
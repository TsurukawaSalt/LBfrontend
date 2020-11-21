<template>
  <el-card class="card-body">
    <div class="nav-title" @click="changeHide">
      <i ref="icon" class="el-icon-arrow-up" style="float: right" id="icon"></i>
      {{ this.category.title }}
    </div>
    <div class="nav-list" v-if="isVisible">
      <div class="nav-list-item" v-for="(item, index) in this.showList" :key="index">
        <span>{{ item.kind }}</span>
        <span id="item-nums">( {{ item.nums }} )</span>
      </div>
    </div>
    <div ref="show-more" class="list-show" v-if="isVisible && (listLength > 3)" @click="changeNums">{{ showMore === false ? "+" : "-" }}</div>
  </el-card>
</template>

<script>
export default {
  name: "ScreenItem",
  props: {
    category: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      listLength: 0,
      showList: [],
      showMore: false,
      isVisible: true
    }
  },
  methods: {
    changeHide() {
      if (this.isVisible === true){
        this.isVisible = false;
        // document.getElementById("icon").className = "el-icon-arrow-down";
        this.$refs.icon.className = "el-icon-arrow-down";
      } else {
        this.isVisible = true;
        // document.getElementById("icon").className = "el-icon-arrow-up";
        this.$refs.icon.className = "el-icon-arrow-up";
      }
    },
    changeNums() {
      if (this.showMore === false){
        this.showMore = true;
        this.showList = this.category.list.slice(0,Math.min(10, this.listLength));
      }else {
        this.showMore = false;
        this.showList = this.category.list.slice(0,Math.min(3, this.listLength));
      }
      console.log(this.category.list.length);
    }
  },
  mounted() {
    this.showMore = false;
    this.listLength = this.category.list.length;
    this.showList = this.category.list.slice(0,Math.min(3,this.listLength));
  }
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
    color: #9fa19f;
    margin-bottom: 10px;
  }
  .nav-title:hover{
    cursor: pointer;
  }
  .nav-list{
    line-height: 20px;
  }
  .list-show{
    line-height: 20px;
  }
  .nav-list-item:hover{
    background-color: #f1f1f1;
  }
  .list-show:hover{
    background-color: #f1f1f1;
  }
  #item-nums{
    float: right;
    color: #9fa19f;
  }
</style>

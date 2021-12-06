<template>
  <el-breadcrumb separator="/" class="bread-container">
    <el-breadcrumb-item v-for="item of breadcrumbList" :key="item.path">
      <router-link to="/home" v-if="item.meta.title==='lorin'">
        <span>{{ item.meta.title }}</span>
      </router-link>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Bread",
  data() {
    return {
      breadcrumbList: [],
    }
  },
  created() {
    //替换面包屑导航
    this.breadcrumbList = this.$route.matched;
  }
}
</script>

<style scoped>
.bread-container {
  margin-left: 20px;
  font-size: 15px;
  margin-top: -4px;
}
</style>

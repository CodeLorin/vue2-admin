<template>
  <div class="main-container">
    <div class="logo-container">
      <logo :collapse="isCollapse"></logo>
    </div>
    <div class="menu-container">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            :collapse="isCollapse"
            :default-active="this.$route.path"
            :collapse-transition="false"
            background-color="#313743"
            text-color="#fff"
            active-text-color="#409eff"
            router
        >
          <el-menu-item
              index="/home"
          >
            <el-icon class="iconfont icon-shouye" style="padding-right: 5px"/>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item
              v-for="(menu, index) in this.menuList"
              :key="index"
              :index="menu.path"
              v-if="!menu.children && !menu.hidden"
          >
            <el-icon :class="'iconfont '+menu.icon"/>
            <span>{{ menu.title }}</span>
          </el-menu-item>

          <el-submenu
              v-if="menu.children"
              v-for="(menu, index) in this.menuList"
              :key="index"
              :index="menu.name"
          >
            <template slot="title">
              <i :class="'iconfont '+menu.icon" style="padding-right: 5px"></i>
              <span>{{ menu.title }}</span>
            </template>
            <el-menu-item
                v-for="(item, index) in menu.children"
                :key="index"
                :index="item.path"
            >
              <el-icon :class="'iconfont '+item.icon"/>
              <span>{{ item.title }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import Logo from "@/layout/component/sidebar/Logo";
import {mapState} from "vuex";

export default {
  name: "SideBar",
  components: {
    Logo,
  },
  computed: {
    ...mapState(["isCollapse", "menuList"]),
  },

};
</script>

<style scoped>
.main-container {
  width: 101%;
  height: 100%;
}

.main-container .logo-container {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>

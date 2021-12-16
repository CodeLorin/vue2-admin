<template>
  <div>
    <div class="tabs-view-container">
      <div class="tabs-wrapper">
        <span
            :class="isActive(item)"
            v-for="item of tabList"
            :index="item.path"
            :key="item.path"
            @click="goTo(item)"
        >
          {{ item.name }}
          <i
              class="el-icon-close"
              v-if="item.name!=='系统首页'"
              @click.stop="removeTab(item)"/>
        </span>
      </div>
      <div class="tabs-close-item" style="float:right" @click="closeAllTab">
        全部关闭
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "NavList",
  data() {
    return {
      currentRoute: this.$route.path
    }
  },
  mounted() {
    //保存当前页标签
    this.$store.dispatch("saveTab", this.$route);
  },
  computed: {
    //标签是否处于当前页
    isActive() {
      return function (tab) {
        if (tab.path === this.$route.path) {
          return "tabs-view-item-active";
        }
        return "tabs-view-item";
      };
    },
    isFold() {
      return this.$store.state.collapse ? "el-icon-s-unfold" : "el-icon-s-fold";
    },
    ...mapState(['tabList'])
  },
  methods: {
    goTo(tab) { //跳转标签
      if (this.$route.path !== tab.path)
        this.$router.push({path: tab.path});
    },
    removeTab(tab) { //删除标签
      this.$store.commit("removeTab", tab);
      //如果删除的是当前页则返回上一标签页
      if (tab.path !== '/home' && tab.path === this.$route.path) {
        var tabList = this.$store.state.tabList;
        this.$router.push({path: tabList[tabList.length - 1].path});
      }
    },
    closeAllTab() {
      this.$store.commit("resetTab");
      if (this.$route.path !== '/home')
        this.$router.push({path: "/home"});
    },
  }
}
</script>

<style scoped>
.tabs-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 95%;
}

.tabs-view-container {
  display: flex;
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  height: 33px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}

.tabs-view-item {
  display: inline-block;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 5px;
}

.tabs-close-item {
  position: absolute;
  right: 10px;
  display: inline-block;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 5px;
}

.tabs-view-item-active {
  display: inline-block;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  padding: 0 8px;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 5px;
  background-color: #409eff;
  color: #fff;
  border-color: #aad4ff;
}

.tabs-view-item-active:before {
  content: "";
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 2px;
}


</style>

<template>
  <div class="nav-container">
    <div class="left-container">
      <div class="change" @click="setCollapse">
        <el-icon :class="isCollapse?'close el-icon-s-unfold':'close el-icon-s-fold'"/>
      </div>
      <bread></bread>
    </div>
    <div class="right-container">
      <el-tooltip content="全屏" placement="bottom">
        <svg @click="fullPage" t="1638624699217" class="icon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="2679" width="200" height="200">
          <path
              d="M747.1 116.6H280.9c-90.1 0-163.5 73.4-163.5 163.5v466.2c0 90.1 73.4 163.5 163.5 163.5h466.2c90.1 0 164.1-73.4 163.5-163.5V280.1c0-90.2-73.3-163.5-163.5-163.5z m-363 713.6H233.6c-20.5 0-37.9-16.8-38.5-38.5V641.3c0-21.1 16.8-37.9 37.9-37.9 10.6 0 19.9 4.4 26.7 11.2 6.8 6.8 11.2 16.8 11.2 26.7v58.4l136.2-136.2c14.9-14.9 39.2-14.9 54.1 0 14.9 14.9 14.9 39.2 0 54.1L325 753.8h58.4c21.1 0 37.9 16.8 37.9 37.9s-16.1 38.5-37.2 38.5z m257.5-642.8H792c20.5 0 37.9 16.8 38.5 38.5v150.4c0 21.1-16.8 37.9-37.9 37.9-10.6 0-19.9-4.4-26.7-11.2-6.8-6.8-11.2-16.8-11.2-26.7V318L618.5 454.2c-14.9 14.9-39.2 14.9-54.1 0-14.9-14.9-14.9-39.2 0-54.1l136.2-136.2h-58.4c-21.1 0-37.9-16.8-37.9-37.9s16.1-38.6 37.3-38.6z"
              p-id="2680" fill="#3a87ff"></path>
        </svg>
      </el-tooltip>
      <el-tooltip content="当前用户" placement="bottom" style="margin-right: 1rem">
        <el-tag>登录用户:&nbsp;<span style="font-weight: bold">{{ userInfo.username }}</span></el-tag>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand" trigger="click">
        <img class="avatar" :src="userInfo.avatar">
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="iconfont icon-gerenzhongxin" command="userCenter">个人中心</el-dropdown-item>
          <el-dropdown-item icon="iconfont icon-tuichu" command="logout">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
import Bread from "@/layout/component/navbar/Bread";
import {mapMutations, mapState} from "vuex";

export default {
  name: "NavBar",
  components: {
    Bread
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['isCollapse', 'userInfo']),
  },
  created() {
    this.$store.dispatch('setUserInfo')
  },
  methods: {
    ...mapMutations(['setCollapse', 'logout']),
    fullPage() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    toGithub() {
      window.open("https://gitee.com/duan_nan/nanjustar-template");
    },
    handleCommand(command) {
      if (command === 'userCenter') {
        this.$router.push('/usercenter')
      } else if (command === 'logout') {
        this.$confirm('确定要退出系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.logout();
          this.$router.replace("/login");
          this.$message.success("退出系统成功")
        })
      }
    },
  }
}
</script>

<style scoped>
.nav-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  line-height: 50px;
  align-items: center;
}

.change {
  cursor: pointer;
  font-size: 26px;
}

.left-container {
  display: flex;
  justify-content: left;
  align-items: center;
}

.right-container {
  display: flex;
  justify-content: right;
  align-items: center;
}

.right-container .icon {
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-right: 15px;
}


.right-container .dropdown {
  height: 40px;
  cursor: pointer;
}

.right-container .dropdown .avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}


</style>

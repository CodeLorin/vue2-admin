<template>
  <div>
    <el-card shadow="hover">
      <el-row :gutter="20">

        <el-col :span="4">
          <el-popconfirm
              title="确定要批量下线在线用户吗?"
              @cancel="$message.info('已取消下线')"
              @confirm="handleDelete(null)"
          >
            <el-button slot="reference" :disabled="delBtnStatus" type="danger" round icon="el-icon-delete" size="small">
              批量下线
            </el-button>
          </el-popconfirm>
        </el-col>
      </el-row>
      <el-table stripe
                border
                ref="roleTable"
                style="width: 100%"
                :data="tableData"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
      >
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column type="index" label="ID" width="80" sortable></el-table-column>

        <el-table-column prop="username" label="用户名" sortable>
        </el-table-column>
        <el-table-column
            prop="ip"
            label="ip" sortable>
        </el-table-column>
        <el-table-column
            prop="location"
            label="地址" sortable>
        </el-table-column>
        <el-table-column
            prop="browser"
            label="浏览器">
        </el-table-column>
        <el-table-column
            prop="os"
            label="操作系统">
        </el-table-column>
        <el-table-column
            prop="loginTime"
            label="登录时间" sortable width="200">
        </el-table-column>
        <el-table-column label="操作" width="65">
          <template v-slot="scope">
            <el-tooltip effect="dark" content="下线" placement="top" :enterable="false">
              <el-popconfirm
                  title="确定要下线在线用户吗?"
                  @cancel="$message.info('已取消下线')"
                  @confirm="handleDelete(scope.row.tokenId)"
              >
                <el-button slot="reference" type="danger" size="mini" round icon="el-icon-delete" class="btn-margin">
                </el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {logoutOnlineUser, onlineUserList} from "../../api/sys/onlineuser";

export default {
  name: "Log",
  data() {
    return {
      tableData: null,

      // 批量删除按钮
      delBtnStatus: true,
    }
  },
  created() {
    this.getLogList()
  },
  methods: {
    // 获取用户列表数据
    async getLogList() {
      const {data} = await onlineUserList()
      this.tableData = data
    },


    // 批量按钮禁用判断
    handleSelectionChange(val) {
      this.selection = val
      this.delBtnStatus = val.length === 0
    },
    // 批量删除
    async handleDelete(data) {
      let ids = []
      if (data) {
        ids.push(data)
      } else {
        this.selection.forEach(item => {
          ids.push(item.tokenId)
        })
      }
      console.log(ids)
      const {msg} = await logoutOnlineUser(ids)
      this.getLogList()
      this.$message.success(msg)
    },
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 1rem;
}

.el-pagination {
  margin-top: 1rem;
}
</style>

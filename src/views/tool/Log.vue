<template>
  <div>
    <el-card shadow="hover">
      <el-row :gutter="20">
        <!--搜索-->
        <el-col :span="6">
          <el-input placeholder="请输入日志信息进行搜索" v-model="queryForm.query" clearable
                    @keyup.enter.native="queryLog">
            <el-button slot="append" icon="el-icon-search" @click="queryLog"></el-button>
          </el-input>
        </el-col>
        <!--批量删除-->
        <el-col :span="4">
          <el-popconfirm
              title="确定要批量删除日志吗?"
              @cancel="$message.info('已取消删除')"
              @confirm="handleDelete(null)"
          >
            <el-button slot="reference" :disabled="delBtnStatus" type="danger" round icon="el-icon-delete" size="small">
              批量删除
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
        <el-table-column type="expand">
          <template v-slot="props">
            <el-card shadow="hover" style="margin: 1rem">
              <el-form style="margin: 1rem">
                <el-form-item label="请求参数: " class="item">
                  <el-icon class="el-icon-star-off" style="margin-right: 6px"></el-icon>
                  <span>{{ props.row.params }}</span>
                </el-form-item>
                <el-form-item label="返回值: " class="item">
                  <el-icon class="el-icon-cloudy" style="margin-right: 6px"></el-icon>
                  <span>{{ props.row.res }}</span>
                </el-form-item>
              </el-form>
            </el-card>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" sortable width="80">

        </el-table-column>
        <el-table-column prop="module" label="模块" sortable>

        </el-table-column>
        <el-table-column prop="operation" label="模块详情">

        </el-table-column>
        <el-table-column
            prop="classMethod"
            label="请求方法">
        </el-table-column>
        <el-table-column
            prop="username"
            label="用户名" sortable align="center">
        </el-table-column>
        <el-table-column
            prop="requestMethod"
            label="请求方式" sortable align="center">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.requestMethod==='GET'">{{ scope.row.requestMethod }}</el-tag>
            <el-tag type="warning" v-else-if="scope.row.requestMethod==='POST'">{{ scope.row.requestMethod }}</el-tag>
            <el-tag type="info" v-else-if="scope.row.requestMethod==='PUT'">{{ scope.row.requestMethod }}</el-tag>
            <el-tag type="danger" v-else-if="scope.row.requestMethod==='DELETE'">{{ scope.row.requestMethod }}</el-tag>
          </template>
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
            prop="excuteTime"
            label="耗时" sortable width="50" align="center">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="时间" sortable>
        </el-table-column>
        <el-table-column label="操作" width="65">
          <template v-slot="scope">
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-popconfirm
                  title="确定要删除日志吗?"
                  @cancel="$message.info('已取消删除')"
                  @confirm="handleDelete(scope.row.id)"
              >
                <el-button slot="reference" type="danger" size="mini" round icon="el-icon-delete" class="btn-margin">
                </el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryForm.pageNum"
          :page-sizes="[10, 20, 50, 100, 200]"
          :page-size="queryForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {logList, deleteLog} from "@/api/sys/log";

export default {
  name: "Log",
  data() {
    return {
      queryForm: {
        query: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 1,
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
      const {data} = await logList(this.queryForm)
      //TODO 用户对接对接后端数据
      this.tableData = data['records']
      this.total = data.total
      this.queryForm.pageSize = data.size
      this.queryForm.pageNum = data.current
    },

    // 查询回调函数
    queryLog() {
      this.getLogList()
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
          ids.push(item.id)
        })
      }
      const {msg} = await deleteLog(ids)
      this.$message.success(msg)
      this.getLogList()
    },
    // 分页回调
    handleCurrentChange(val) {
      this.queryForm.pageNum = val
      this.getLogList()
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val
      this.getLogList()
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

.item {
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>

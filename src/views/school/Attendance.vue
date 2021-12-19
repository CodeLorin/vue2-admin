<template>
  <div>
    <el-card shadow="hover">
      <el-row :gutter="20">
        <!--搜索-->
        <el-col :span="8">
          <el-input placeholder="请输入考勤信息进行搜索" v-model="queryForm.query" clearable
                    @keyup.enter.native="queryAttendance">
            <el-button slot="append" icon="el-icon-search" @click="queryAttendance"></el-button>
          </el-input>
        </el-col>
        <!--新增和批量删除-->
        <el-col :span="8">
          <el-button @click="dialogVisible=true" type="primary" icon="el-icon-plus" round class="btn-margin"
                     size="small">
            新增考勤
          </el-button>
          <el-popconfirm
              title="确定要批量删除考勤吗?"
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
                ref="roleUser"
                style="width: 100%"
                :data="tableData"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
      >
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            label="考勤名称" prop="name" align="center">
        </el-table-column>
        <el-table-column
            prop="limitTime"
            label="考勤限时">
        </el-table-column>

        <el-table-column
            prop="publishTime"
            label="考勤开始时间" align="center">
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template v-slot="scope">
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" size="mini" round icon="el-icon-edit" @click="showDialog(scope.row.id)"
                         class="btn-margin">
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-popconfirm
                  title="确定要删除考勤吗?"
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
    <el-dialog title="考勤信息" :visible.sync="dialogVisible" width="600px" @closed="resetForm"
               :before-close="resetForm">
      <el-form :model="attendanceForm" :rules="attendanceFormRules" ref="attendanceForm">
        <el-form-item label="考勤名称" prop="name" label-width="100px">
          <el-input v-model="attendanceForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="考勤开始时间" prop="publishTime" label-width="100px">
          <el-date-picker
              v-model="attendanceForm.publishTime"
              type="datetime"
              placeholder="考勤开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="考勤限时" prop="limitTime" label-width="100px">
          <el-input v-model="attendanceForm.limitTime" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm" round>取 消</el-button>
        <el-button type="primary" @click="submitForm" round>确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  attendanceInfo,
  attendanceList,
  addAttendance,
  updateAttendance,
  deleteAttendance
} from "../../api/sys/attendance";

export default {
  name: "Attendance",
  data() {
    return {
      queryForm: {
        query: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 1,
      tableData: null,
      //
      dialogVisible: false,
      attendanceForm: {},
      attendanceFormRules: {
        name: [
          {required: true, message: '请输入考勤名称', trigger: 'blur'}
        ],
        limitTime: [
          {required: true, message: '请输入限制考勤时间(单位为分钟)', trigger: 'blur'}
        ],
        publishTime: [
          {required: true, message: '请选择考勤开始时间', trigger: 'blur'}
        ]
      },

      // 选择器
      selection: null,
      // 批量删除按钮
      delBtnStatus: true,

    }
  },
  created() {
    this.getAttendanceList()
  },
  methods: {
    // 获取考勤列表数据
    async getAttendanceList() {
      const {data} = await attendanceList(this.queryForm)
      this.tableData = data['records']
      this.total = data.total
      this.queryForm.pageSize = data.size
      this.queryForm.pageNum = data.current
    },
    //重置添加修改表单
    resetForm() {
      this.$refs.attendanceForm.resetFields()
      this.attendanceForm = {}
      this.dialogVisible = false
    },
    // 新增和更新考勤
    submitForm() {
      this.$refs.attendanceForm.validate(async valid => {
        if (!valid) return
        if (this.attendanceForm.id) {
          const {msg} = await updateAttendance(this.attendanceForm)
          this.$message.success(msg)
        } else {
          const {msg} = await addAttendance(this.attendanceForm)
          this.$message.success(msg)
        }
        this.resetForm()
        this.getAttendanceList()
        this.dialogVisible = false
      })
    },

    // 查询回调函数
    queryAttendance() {
      this.getAttendanceList()
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
      const {msg} = await deleteAttendance(ids)
      this.$message.success(msg)
      this.getAttendanceList()
    },
    // 编辑考勤,发送请求获取考勤信息
    async showDialog(id) {
      const {data} = await attendanceInfo(id)
      this.attendanceForm = data
      this.dialogVisible = true
    },
    // 分页回调
    handleCurrentChange(val) {
      this.queryForm.pageNum = val
      this.getAttendanceList()
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val
      this.getAttendanceList()
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 1rem;
}

.btn-margin {
  margin-right: 5px;
}

.el-pagination {
  margin-top: 1rem;
}
</style>

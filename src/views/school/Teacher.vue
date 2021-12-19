<template>
  <div>
    <el-card shadow="hover">
      <el-row :gutter="20">
        <!--搜索-->
        <el-col :span="8">
          <el-input placeholder="请输入老师信息进行搜索" v-model="queryForm.query" clearable
                    @keyup.enter.native="queryTeacher">
            <el-button slot="append" icon="el-icon-search" @click="queryTeacher"></el-button>
          </el-input>
        </el-col>
        <!--新增和批量删除-->
        <el-col :span="8">
          <el-button @click="dialogVisible=true" type="primary" icon="el-icon-plus" round class="btn-margin"
                     size="small">
            新增老师
          </el-button>
          <el-popconfirm
              title="确定要批量删除老师吗?"
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
            label="工号" prop="workId" align="center">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="100">
        </el-table-column>
        <el-table-column
            label="性别"
            width="60" prop="gender" align="center">
        </el-table-column>
        <el-table-column
            prop="classes"
            label="班级" align="center">
        </el-table-column>
        <el-table-column
            prop="birth"
            label="出生日期" align="center">
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
                  title="确定要删除老师吗?"
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
    <el-dialog title="老师信息" :visible.sync="dialogVisible" width="600px" @closed="resetForm"
               :before-close="resetForm">

      <el-form :model="teacherForm" :rules="teacherFormRules" ref="teacherForm">
        <el-form-item label="工号" prop="workId" label-width="100px">
          <el-input v-model="teacherForm.workId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" label-width="100px">
          <el-input v-model="teacherForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" label-width="100px">
          <el-radio v-model="teacherForm.gender" label="男">男</el-radio>
          <el-radio v-model="teacherForm.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="班级" prop="classes" label-width="100px">
          <el-input v-model="teacherForm.classes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth" label-width="100px">
          <el-date-picker
              v-model="teacherForm.birth"
              type="date"
              placeholder="出生日期">
          </el-date-picker>
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
import {teacherInfo, teacherList, updateTeacher, deleteTeacher, addTeacher} from "../../api/sys/school/teacher";

export default {
  name: "Teacher",
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
      teacherForm: {},
      teacherFormRules: {
        workId: [
          {required: true, message: '请输入工号', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        gender: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],
        classes: [
          {required: true, message: '请输入班级', trigger: 'blur'}
        ],
        birth: [
          {required: true, message: '请选择出生年月日', trigger: 'blur'}
        ]
      },

      // 选择器
      selection: null,
      // 批量删除按钮
      delBtnStatus: true,

    }
  },
  created() {
    this.getTeacherList()
  },
  methods: {
    // 获取老师列表数据
    async getTeacherList() {
      const {data} = await teacherList(this.queryForm)
      this.tableData = data['records']
      this.total = data.total
      this.queryForm.pageSize = data.size
      this.queryForm.pageNum = data.current
    },
    //重置添加修改表单
    resetForm() {
      this.$refs.teacherForm.resetFields()
      this.teacherForm = {}
      this.dialogVisible = false
    },
    // 新增和更新老师
    submitForm() {
      this.$refs.teacherForm.validate(async valid => {
        if (!valid) return
        if (this.teacherForm.id) {
          const {msg} = await updateTeacher(this.teacherForm)
          this.$message.success(msg)
        } else {
          const {msg} = await addTeacher(this.teacherForm)
          this.$message.success(msg)
        }
        this.resetForm()
        this.getTeacherList()
        this.dialogVisible = false
      })
    },

    // 查询回调函数
    queryTeacher() {
      this.getTeacherList()
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
      const {msg} = await deleteTeacher(ids)
      this.$message.success(msg)
      this.getTeacherList()
    },
    // 编辑老师,发送请求获取老师信息
    async showDialog(id) {
      const {data} = await teacherInfo(id)
      this.teacherForm = data
      this.dialogVisible = true
    },
    // 分页回调
    handleCurrentChange(val) {
      this.queryForm.pageNum = val
      this.getTeacherList()
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val
      this.getTeacherList()
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

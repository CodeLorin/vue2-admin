<template>
  <div>
    <el-card shadow="hover">
      <el-row :gutter="20">
        <!--搜索-->
        <el-col :span="8">
          <el-input placeholder="请输入学生信息进行搜索" v-model="queryForm.query" clearable
                    @keyup.enter.native="queryStudent">
            <el-button slot="append" icon="el-icon-search" @click="queryStudent"></el-button>
          </el-input>
        </el-col>
        <!--新增和批量删除-->
        <el-col :span="8">
          <el-button @click="dialogVisible=true" type="primary" icon="el-icon-plus" round class="btn-margin"
                     size="small">
            新增学生
          </el-button>
          <el-popconfirm
              title="确定要批量删除学生吗?"
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
            label="学号" prop="num" align="center">
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
        <el-table-column
            label="老师" prop="teacherName" align="center">
        </el-table-column>
        <el-table-column
            label="家庭住址" prop="homeAddress" width="250" align="center">
        </el-table-column>
        <el-table-column
            label="父母名字" prop="parentName" align="center">
        </el-table-column>
        <el-table-column
            label="人脸数据" align="center">
          <template v-slot="scope">
            <el-avatar size="medium" :src="scope.row.face"></el-avatar>
          </template>
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
                  title="确定要删除学生吗?"
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
    <el-dialog title="学生信息" :visible.sync="dialogVisible" width="600px" @closed="resetForm"
               :before-close="resetForm">
      <el-alert
          title="默认密码为123456"
          type="info"
          style="margin-bottom: 1rem"
      >
      </el-alert>
      <el-form :model="studentForm" :rules="studentFormRules" ref="studentForm">
        <el-form-item label="学号" prop="num" label-width="100px">
          <el-input v-model="studentForm.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" label-width="100px">
          <el-input v-model="studentForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" label-width="100px">
          <el-radio v-model="studentForm.gender" label="男">男</el-radio>
          <el-radio v-model="studentForm.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="班级" prop="classes" label-width="100px">
          <el-input v-model="studentForm.classes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth" label-width="100px">
          <el-date-picker
              v-model="studentForm.birth"
              type="date"
              placeholder="出生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="老师名称" prop="teacherId" label-width="100px">
          <el-select v-model="studentForm.teacherId" placeholder="请选择">
            <el-option
                v-for="item in teachers"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="家庭住址" prop="homeAddress" label-width="100px">
          <el-input v-model="studentForm.homeAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父母名称" prop="parentName" label-width="100px">
          <el-input v-model="studentForm.parentName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="人脸数据" prop="face" label-width="100px">
          <el-upload
              drag
              action="http://106.55.149.131:1222/upload/face"
              :on-success="handleAvatarSuccess" :show-file-list="false"
              >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将人脸数据拖到此处，或<em>点击上传</em></div>
          </el-upload>
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
  studentList,
  studentInfo,
  deleteStudent,
  updateStudent,
  addStudent,
  getStudentTeacher
} from "../../api/sys/school/student";

export default {
  name: "Student",
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
      studentForm: {},
      studentFormRules: {
        num: [
          {required: true, message: '请输入学号', trigger: 'blur'}
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
        ],
        teacherId: [
          {required: true, message: '请选择老师', trigger: 'blur'}
        ],
        homeAddress: [
          {required: true, message: '请输入家庭住址', trigger: 'blur'}
        ],
        parentName: [
          {required: true, message: '请输入父母名称', trigger: 'blur'}
        ],
        face: [
          {required: true, message: '请上传人脸数据', trigger: 'blur'}
        ]
      },

      // 选择器
      selection: null,
      // 批量删除按钮
      delBtnStatus: true,
      teachers: []
    }
  },
  created() {
    this.getStudentList()
    this.getTeacher()
  },
  methods: {
    async getTeacher() {
      const {data: res} = await getStudentTeacher()
      this.teachers = res
    },
    // 获取学生列表数据
    async getStudentList() {
      const {data} = await studentList(this.queryForm)
      this.tableData = data['records']
      this.total = data.total
      this.queryForm.pageSize = data.size
      this.queryForm.pageNum = data.current
    },
    //重置添加修改表单
    resetForm() {
      this.$refs.studentForm.resetFields()
      this.studentForm = {}
      this.dialogVisible = false
    },
    // 新增和更新学生
    submitForm() {
      this.$refs.studentForm.validate(async valid => {
        if (!valid) return
        if (this.studentForm.id) {
          const {msg} = await updateStudent(this.studentForm)
          this.$message.success(msg)
        } else {
          const {msg} = await addStudent(this.studentForm)
          this.$message.success(msg)
        }
        this.resetForm()
        this.getStudentList()
        this.dialogVisible = false
      })
    },
    handleAvatarSuccess(res) {
      this.$message.success("上传人脸数据成功")
      this.studentForm.face = "http://106.55.149.131:1222" + res.data.url
    },
    // 查询回调函数
    queryStudent() {
      this.getStudentList()
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
      const {msg} = await deleteStudent(ids)
      this.$message.success(msg)
      this.getStudentList()
    },
    // 编辑学生,发送请求获取学生信息
    async showDialog(id) {
      const {data} = await studentInfo(id)
      this.studentForm = data
      this.dialogVisible = true
    },
    // 分页回调
    handleCurrentChange(val) {
      this.queryForm.pageNum = val
      this.getStudentList()
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val
      this.getStudentList()
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

.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

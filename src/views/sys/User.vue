<template>
  <div>
    <el-card shadow="hover">
      <el-row :gutter="20">
        <!--搜索-->
        <el-col :span="8">
          <el-input placeholder="请输入用户信息进行搜索" v-model="queryForm.query" clearable
                    @keyup.enter.native="queryUser">
            <el-button slot="append" icon="el-icon-search" @click="queryUser"></el-button>
          </el-input>
        </el-col>
        <!--新增和批量删除-->
        <el-col :span="8">
          <el-button @click="dialogVisible=true" type="primary" icon="el-icon-plus" round class="btn-margin"
                     size="small">
            新增用户
          </el-button>
          <el-popconfirm
              title="确定要批量删除用户吗?"
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
            label="头像"
            width="50">
          <template v-slot="scope">
            <el-avatar size="small"
                       :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
            prop="username"
            label="用户名"
            width="100">
        </el-table-column>
        <el-table-column
            label="角色名称"
            width="240">
          <template slot-scope="scope">
            <el-tag style="margin-right: 5px;" size="small" v-for="item in scope.row.roles">{{ item.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态"
            width="65">
          <template v-slot="scope">
            <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
                :active-value="1"
                :inactive-value="0" @change="handlerStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
            prop="created"
            label="创建时间"
            width="200">
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template v-slot="scope">
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" size="mini" round icon="el-icon-edit" @click="showDialog(scope.row.id)"
                         class="btn-margin">
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-popconfirm
                  title="确定要删除用户吗?"
                  @cancel="$message.info('已取消删除')"
                  @confirm="handleDelete(scope.row.id)"
              >
                <el-button slot="reference" type="danger" size="mini" round icon="el-icon-delete" class="btn-margin">
                </el-button>
              </el-popconfirm>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" size="mini" round icon="el-icon-setting" @click="handlerShowRole(scope.row.id)"
                         class="btn-margin"
              >
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="修改密码" placement="top" :enterable="false">
              <el-button type="info" style="margin-left: 0" size="mini" round icon="el-icon-lock"
                         @click="passwordDialogVisible=true"
              >
              </el-button>
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
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="600px" @closed="resetForm"
               :before-close="resetForm">
      <el-form :model="userForm" :rules="userFormRules" ref="userForm">
        <el-form-item label="用户名" prop="username" label-width="100px">
          <el-input v-model="userForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="100px">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户状态" prop="status" label-width="100px">
          <el-switch
              v-model="userForm.status"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              :active-value="1"
              :inactive-value="0"
              active-text="启用"
              inactive-text="禁用">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm" round>取 消</el-button>
        <el-button type="primary" @click="submitForm" round>确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
        title="分配用户"
        :visible.sync="roleDialogVisible"
        width="600px">
      <el-form :model="roleForm" ref="roleForm">

        <el-tree
            :data="roleTreeData"
            show-checkbox
            ref="roleTree"
            :default-expand-all=true
            node-key="id"
            :props="defaultProps">
        </el-tree>

      </el-form>

      <span slot="footer" class="dialog-footer">
			    <el-button @click="roleDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="handlerSubmitRole()">确 定</el-button>
			</span>

    </el-dialog>
    <!--修改密码-->
    <el-dialog title="修改密码" :visible.sync="passwordDialogVisible" width="600px" @closed="resetPwdForm"
               :before-close="resetPwdForm">
      <el-form :model="passwordForm" :rules="passwordFormRules" ref="pwdForm">
        <el-form-item label="新密码" prop="password" label-width="100px">
          <el-input v-model="passwordForm.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="再次输入" prop="password" label-width="100px">
          <el-input v-model="passwordForm.rePassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetPwdForm" round>取 消</el-button>
        <el-button type="primary" @click="submitPwdForm" round>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {userList} from "@/api/sys/user";
import {addUser} from "@/api/sys/user";
import {updateUser} from "@/api/sys/user";
import {deleteUser} from "@/api/sys/user";
import {userInfo} from "@/api/sys/user";
import {roleList} from "@/api/sys/role";
import {handlerRole} from "@/api/sys/user";

export default {
  name: "User",
  data() {
    return {
      queryForm: {
        query: '',
        pageNum: 0,
        pageSize: 0
      },
      total: 1,
      tableData: null,
      // 编辑用户和新增用户
      dialogVisible: false,
      userForm: {},
      userFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入用户邮箱', trigger: 'blur'},
          {type: 'email', message: '你输入的邮箱格式不正确', trigger: ['blur', 'change']}
        ],
        status: [
          {required: true, message: '请选择角色状态', trigger: 'blur'}
        ]
      },

      // 选择器
      selection: null,
      // 批量删除按钮
      delBtnStatus: true,
      roleDialogVisible: false,
      roleForm: {},
      roleTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 密码修改
      passwordDialogVisible: false,
      passwordForm: {},
      passwordFormRules: {
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '密码至少为6位', trigger: ['blur', 'change']}
        ]
      }
    }
  },
  created() {
    this.getUserList()
    this.getUserRole()
  },
  methods: {
    // 获取用户列表数据
    async getUserList() {
      const {data} = await userList(this.queryForm)
      //TODO 用户对接对接后端数据
      this.tableData = data['records']
      this.total = data.total
      this.queryForm.pageSize = data.size
      this.queryForm.pageNum = data.current
    },
    //重置添加修改表单
    resetForm() {
      this.$refs.userForm.resetFields()
      this.userForm = {}
      this.dialogVisible = false
    },
    // 新增和更新用户
    submitForm() {
      this.$refs.userForm.validate(async valid => {
        if (!valid) return
        if (this.userForm.id) {
          const {msg} = await updateUser(this.userForm)
          this.$message.success(msg)
        } else {
          const {msg} = await addUser(this.userForm)
          this.$message.success(msg)
        }
        this.getUserList()
        this.dialogVisible = false
      })
    },
    resetPwdForm() {
      this.$refs.pwdForm.resetFields()
      this.passwordForm = {}
      this.passwordDialogVisible = false
    },
    submitPwdForm() {
      this.$refs.pwdForm.validate(valid => {
        if (!valid) return
        else if (this.passwordForm.password !== this.passwordForm.rePassword) {
          return this.$message.warning('两次输入的密码不一致')
        }
        //TODO 修改用户密码
        this.passwordDialogVisible = false
      })

    },
    // 查询回调函数
    queryUser() {
      this.getUserList()
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
      const {msg} = await deleteUser(ids)
      this.$message.success(msg)
      this.getUserList()
    },
    // 编辑用户,发送请求获取用户信息
    async showDialog(id) {
      const {data} = await userInfo(id)
      this.userForm = data
      this.dialogVisible = true
    },
    // 用户状态回调函数
    async handlerStatusChange(row) {
      const {data} = await userInfo(row.id)
      this.userForm = data
      this.userForm.status === 1 ? this.userForm.status = 0 : this.userForm.status = 1
      const {msg} = await updateUser(this.userForm)
      this.$message.success(msg)
      this.getUserList()
    },
    // 分页回调
    handleCurrentChange(val) {
      this.queryForm.pageNum = val
      this.getUserList()
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val
      this.getUserList()
    },
    async getUserRole() {
      const {data} = await roleList()
      this.roleTreeData = data['records']
    },
    handlerShowRole(id) {
      userInfo(id).then(data => {
        const res = data.data
        let roleIds = []
        res.roles.forEach(item => {
          roleIds.push(item.id)
        })
        this.$refs.roleTree.setCheckedKeys(roleIds)
        this.roleForm = data.data
      })
      this.roleDialogVisible = true
    },
    async handlerSubmitRole() {
      let roleIds = this.$refs.roleTree.getCheckedKeys()
      const {msg} = await handlerRole(this.roleForm.id, roleIds)
      this.$message.success(msg)
      this.$refs.roleForm.resetFields()
      this.roleDialogVisible = false
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

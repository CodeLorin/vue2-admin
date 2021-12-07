<template>
  <div>
    <el-card shadow="hover">
      <el-row :gutter="20">
        <!--搜索-->
        <el-col :span="8">
          <el-input placeholder="请输入角色信息进行搜索" v-model="queryForm.query" clearable
                    @keyup.enter.native="queryRole">
            <el-button slot="append" icon="el-icon-search" @click="queryRole"></el-button>
          </el-input>
        </el-col>
        <!--新增和批量删除-->
        <el-col :span="8">
          <el-button @click="dialogVisible=true" type="primary" icon="el-icon-plus" round class="btn-margin"
                     size="small">
            新增角色
          </el-button>
          <el-popconfirm
              title="确定要批量删除角色吗?"
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
        <el-table-column prop="name" label="角色名称">

        </el-table-column>
        <el-table-column prop="code" label="唯一标识">

        </el-table-column>
        <el-table-column prop="desc" label="角色描述">

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
        <el-table-column label="操作" width="180">
          <template v-slot="scope">
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" size="mini" round icon="el-icon-edit" @click="showDialog(scope.row.id)"
                         class="btn-margin">
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-popconfirm
                  title="确定要删除角色吗?"
                  @cancel="$message.info('已取消删除')"
                  @confirm="handleDelete(scope.row.id)"
              >
                <el-button slot="reference" type="danger" size="mini" round icon="el-icon-delete" class="btn-margin">
                </el-button>
              </el-popconfirm>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="false">
              <el-button type="warning" size="mini" round icon="el-icon-setting" @click=""
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
    <el-dialog title="角色信息" :visible.sync="dialogVisible" width="600px" @closed="resetForm"
               :before-close="resetForm">
      <el-form :model="roleForm" :rules="roleFormRules" ref="roleForm">
        <el-form-item label="角色名称" prop="name" label-width="100px">
          <el-input v-model="roleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="唯一标识" prop="code" label-width="100px">
          <el-input v-model="roleForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc" label-width="100px">
          <el-input v-model="roleForm.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="status" label-width="100px">
          <el-switch
              v-model="roleForm.status"
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
  </div>
</template>

<script>
import {roleList} from "@/api/sys/role";
import {addRole} from "@/api/sys/role";
import {updateRole} from "@/api/sys/role";
import {deleteRole} from "@/api/sys/role";
import {roleInfo} from "@/api/sys/role";

export default {
  name: "Role",
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
      roleForm: {},
      roleFormRules: {
        name: [
          {required: true, message: '请输入角色状态', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入唯一编码', trigger: 'blur'}
        ],
        desc: [
          {required: true, message: '请输入角色描述', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择角色状态', trigger: 'blur'}
        ]
      },
      selection: null,
      delBtnStatus: true
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表数据
    async getRoleList() {
      const {data} = await roleList(this.queryForm)
      //TODO 角色对接对接后端数据
      this.tableData = data['records']
      this.total = data.total
      this.queryForm.pageSize = data.size
      this.queryForm.pageNum = data.current
    },
    //重置添加修改表单
    resetForm() {
      this.$refs.roleForm.resetFields()
      this.roleForm = {}
      this.dialogVisible = false
    },
    // 新增和更新角色
    submitForm() {
      this.$refs.roleForm.validate(async valid => {
        if (!valid) return
        if (this.roleForm.id) {
          const {msg} = await updateRole(this.roleForm)
          this.$message.success(msg)
        } else {
          const {msg} = await addRole(this.roleForm)
          this.$message.success(msg)
        }
        this.getRoleList()
        this.dialogVisible = false
      })

    },
    // 查询回调函数
    queryRole() {
      this.getRoleList()
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
      const {msg} = await deleteRole(ids)
      this.$message.success(msg)
      this.getRoleList()
    },
    // 编辑角色,发送请求获取角色信息
    async showDialog(id) {
      const {data} = await roleInfo(id)
      this.roleForm = data
      this.dialogVisible = true
    },
    // 角色状态回调函数
    async handlerStatusChange(row) {
      const {data} = await roleInfo(row.id)
      this.roleForm = data
      this.roleForm.status === 1 ? this.roleForm.status = 0 : this.roleForm.status = 1
      const {msg} = await updateRole(this.roleForm)
      this.$message.success(msg)
      this.getRoleList()
    },
    // 分页回调
    handleCurrentChange(val) {
      this.queryForm.pageNum = val
      this.getRoleList()
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val
      this.getRoleList()
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

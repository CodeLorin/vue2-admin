<template>
  <div>
    <el-card>
      <el-button type="primary" icon="el-icon-plus" round size="small" @click="dialogVisible = true"
                 class="add-router-btn">
        添加菜单
      </el-button>
      <el-table
          :data="menuData"
          stripe
          border
          row-key="id"
          default-expand-all
          style="width: 100%"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
            prop="name"
            label="名称"
            width="150">
        </el-table-column>
        <el-table-column
            prop="perms"
            label="权限编码"
            width="150">
        </el-table-column>
        <el-table-column
            prop="icon"
            label="图标">
        </el-table-column>
        <el-table-column
            prop="type"
            label="类型"
            width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
            <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
            <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="path"
            label="菜单URL">
        </el-table-column>
        <el-table-column
            prop="component"
            label="菜单组件">
        </el-table-column>
        <el-table-column
            prop="orderNum"
            label="排序号">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态"
            width="60">
          <template v-slot="scope">
            <el-tag v-if="!scope.row.status" size="mini" type="danger">禁用</el-tag>
            <el-tag v-else-if="scope.row.status" size="mini" type="success">正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template v-slot="scope">
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" size="mini" round icon="el-icon-edit" @click="showDialog(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-popconfirm
                  title="确定要删除菜单吗?"
                  @cancel="$message.info('已取消删除')"
                  @confirm="deleteMenu(scope.row.name)"
              >
                <el-button slot="reference" type="danger" size="mini" round icon="el-icon-delete">
                </el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="菜单信息" :visible.sync="dialogVisible" width="600px" @closed="resetForm()">
      <el-form :model="menuForm" :rules="menuFormRules" ref="menuForm">
        <el-form-item label="上级菜单" prop="parentId" label-width="100px">
          <el-cascader
              v-model="menuData.parentId"
              :options="options"
              :props="{ checkStrictly: true }"
              clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name" label-width="100px">
          <el-input v-model="menuForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限编码" prop="perms" label-width="100px">
          <el-input v-model="menuForm.perms" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon" label-width="100px">
          <el-input v-model="menuForm.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单URL" prop="path" label-width="100px">
          <el-input v-model="menuForm.path" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="菜单组件" prop="component" label-width="100px">
          <el-input v-model="menuForm.component" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type" label-width="100px">
          <el-radio-group v-model="menuForm.type">
            <el-radio :label=0>目录</el-radio>
            <el-radio :label=1>菜单</el-radio>
            <el-radio :label=2>按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status" label-width="100px">
          <el-switch
              v-model="menuForm.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              active-text="启用"
              inactive-text="禁用">
          </el-switch>
        </el-form-item>
        <el-form-item label="排序号" prop="orderNum" label-width="100px">
          <el-input-number v-model="menuForm.orderNum" :min="1" label="排序号">1</el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm()" round>取 消</el-button>
        <el-button type="primary" @click="submitForm()" round>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {menuList} from "@/api/sys/menu/index"
import {addMenu} from "@/api/sys/menu"
import {updateMenu} from "@/api/sys/menu"
import {delMenu} from "@/api/sys/menu/index"
import {getInfo} from "@/api/sys/menu/index"

export default {
  name: "Menus",
  data() {
    return {
      menuData: [],
      dialogVisible: false,
      menuForm: {},
      options: [],
      menuFormRules: {
        parentId: [
          {required: true, message: '请选择上级菜单', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        perms: [
          {required: true, message: '请输入权限编码', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ],
        orderNum: [
          {required: true, message: '请填入排序号', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.getMenuData()
  }
  ,
  methods: {
    // 获取菜单信息
    async getMenuData() {
      const {data} = await menuList()
      this.menuData = data
      this.handleOption()
    },
    handleOption() {
      this.menuData.forEach(item => {
        let temp = {
          value: item.id,
          label: item.name,
        }
        if (item.children) {
          temp.children = []
          item.children.forEach(e => {
            temp.children.push({
              value: e.id,
              label: e.name,
            })
          })
        }
        this.options.push(temp)
        temp = {}

      })
    },
    async showDialog(row) {
      const {data} = await getInfo(row.id)
      this.menuForm = data
      // this.menuForm = row
      // this.dialogVisible = true
    },
    resetForm() {
      this.$refs.menuForm.resetFields()
      this.menuForm = {}
      this.dialogVisible = false
    },
    submitForm() {
      this.$refs.menuForm.validate(async valid => {
        if (!valid) return
        if (this.menuForm.id) {
          const {msg} = await updateMenu(this.menuForm)
          this.$message.success(msg)
        } else {
          const {msg} = await addMenu(this.menuForm)
          this.$message.success(msg)
        }
        this.getMenuData()
        this.dialogVisible = false
      })

    },
    async deleteMenu(id) {
      const {msg} = await delMenu(id)
      this.$message.success(msg)
      this.getMenuData()
    }
  }
}
</script>

<style lang="scss" scoped>
.add-router-btn {
  margin-bottom: 1rem;
}
</style>

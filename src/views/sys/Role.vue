<template>
  <div>
    <el-card shadow="hover">
      <el-row :gutter="20">
        <!--搜索-->
        <el-col :span="6">
          <el-input placeholder="请输入角色信息进行搜索" v-model="queryForm.query" clearable
                    @keyup.enter.native="queryRole">
            <el-button slot="append" icon="el-icon-search" @click="queryRole"></el-button>
          </el-input>
        </el-col>
        <!--新增和批量删除-->
        <el-col :span="8">
          <el-button @click="dialogVisible=true" type="primary" icon="el-icon-plus" round class="btn-margin">
            新增角色
          </el-button>
          <el-popconfirm
              title="确定要批量删除角色吗?"
              @cancel="$message.info('已取消删除')"
              @confirm="deleteManyRole()"
          >
            <el-button slot="reference" type="danger" round icon="el-icon-delete">
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
              <el-button type="primary" size="mini" round icon="el-icon-edit" @click="showDialog(scope.row)"
                         class="btn-margin">
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-popconfirm
                  title="确定要删除角色吗?"
                  @cancel="$message.info('已取消删除')"
                  @confirm="deleteRole(scope.row.name)"
              >
                <el-button slot="reference" type="danger" size="mini" round icon="el-icon-delete" class="btn-margin">
                </el-button>
              </el-popconfirm>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="false">
              <el-button type="warning" size="mini" round icon="el-icon-setting" @click="showDialog(scope.row)"
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
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      queryForm: {
        query: '',
        pageNum: 0,
        pageSize: 0
      },
      dialogVisible: false,
      tableData: [{
        name: 'lorin',
        code: 'sys:role',
        desc: "超级管理员",
        status: 1
      }],
      total: 1

    }
  },
  methods: {
    queryRole() {
      //TODO
    },
    deleteManyRole() {
      //TODO
    },
    deleteRole() {

    },
    showDialog() {
    },
    handlerStatusChange() {

    },
    handleCurrentChange() {

    },
    handleSizeChange() {

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

<template>
  <div>
    <el-card shadow="hover">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入角色信息进行搜索" v-model="queryForm.query" clearable
                    @keyup.enter.native="queryRole">
            <el-button slot="append" icon="el-icon-search" @click="queryRole"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button @click="dialogVisible=true" type="primary" icon="el-icon-plus" round class="btn-margin">
            新增角色
          </el-button>
          <el-popconfirm
              title="确定要批量删除角色吗?"
              @cancel="$message.info('已取消删除')"
              @confirm="deleteRole()"
          >
            <el-button slot="reference" type="danger" round icon="el-icon-delete">
              批量删除
            </el-button>
          </el-popconfirm>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      queryForm: {},
      dialogVisible: false
    }
  },
  methods: {
    queryRole() {
      //TODO
    },
    deleteRole() {
      //TODO
    }
  }
}
</script>

<style scoped>
.btn-margin {
  margin-right: 5px;
}
</style>

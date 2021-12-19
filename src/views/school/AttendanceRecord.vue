<template>
  <div>
    <el-card shadow="hover">

      <el-table stripe
                border
                ref="roleUser"
                style="width: 100%"
                :data="tableData"
                tooltip-effect="dark"
      >
        <el-table-column
            label="ID" prop="id" align="center">
        </el-table-column>
        <el-table-column
            label="学生姓名" prop="studentName" align="center">
        </el-table-column>
        <el-table-column
            prop="attendanceName"
            label="考勤名称" align="center">
        </el-table-column>
        <el-table-column
            prop="attendanceTime"
            label="考勤时间">
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
import {
  getAttendanceRecord
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

    }
  },
  created() {
    this.getAttendanceList()
  },
  methods: {
    // 获取考勤列表数据
    async getAttendanceList() {
      const {data} = await getAttendanceRecord(this.queryForm)
      this.tableData = data['records']
      this.total = data.total
      this.queryForm.pageSize = data.size
      this.queryForm.pageNum = data.current
    },

    // 查询回调函数
    queryAttendance() {
      this.getAttendanceList()
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

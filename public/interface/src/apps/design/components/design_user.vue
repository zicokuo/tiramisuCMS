<template>
    <div class="design_user">
        <template name="toolbar">
            <p>
                <el-button type="infor" icon="el-icon-i--" size="mini" :disabled="tableSelected == 0"
                           @click="exportSubmits">导出成Excel
                </el-button>
                <el-button type="success" icon="el-icon-i--refresh" size="mini" @click="refreshTable">刷新</el-button>
            </p>
            <p> 共有{{tableTotals}}条项目,当前显示{{ listDatas.length || 0 }}条,已选择{{tableSelected.length || 0}}条</p>
        </template>
        <template name="table">
            <el-table :data="listDatas" style="width: 100%" :default-sort="{prop: '', order: 'descending'}"
                      @selection-change="handleSelectionChange" ref="designTable">
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="60"></el-table-column>
                <el-table-column prop="avatar_url" label="头像">
                    <template slot-scope="scope">
                        <img :src="scope.row.avatar_url||defaultAvatar" alt="用户头像" height="64">
                    </template>
                </el-table-column>
                <el-table-column prop="nick_name" label="微信昵称">
                    <template slot-scope="scope">
                        {{JSON.parse(scope.row.nick_name) || '昵称未更新' }}
                    </template>
                </el-table-column>
                <el-table-column lable="地区">
                    <template slot-scope="scope">
                        <el-tag>{{ scope.row.country||'' }} - {{ scope.row.province||'' }} - {{ scope.row.city||'' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column lable="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteIt(scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>
<script>
import avatar from "@/public-resource/images/user.png";
export default {
  name: "design_user",
  data() {
    return {
      defaultAvatar: avatar,
      serverUrl: this.$getUrl("serverUrl") + "diavision/user/",
      listDatas: [],
      tableSelected: 0, //  选择项数
      tableMultiSelected: [], //  选择项目
      tablePaged: 1, //  当前页数
      tablePages: 1, //  页数
      tableTotals: 0, //  项目数
      tablePageSize: 15 //  每页项目数
    };
  },
  methods: {
    //  获取表单数据
    getTableDataHandler(data = {}, func) {
      let vm = this;
      data.page_size ? "" : (data.page_size = vm.tablePageSize);
      data.paged ? "" : (data.paged = vm.tablePaged);
      //                console.log(data)
      vm.$http.post(vm.serverUrl + "get_user", data).then(res => {
        //                console.log(response)
        if (res.body.code === 1) {
          vm.listDatas = res.body.data.formData || "";
          res.body.data.paged
            ? (vm.tablePaged = parseInt(res.body.data.paged))
            : "";
          res.body.data.pages
            ? (vm.tablePages = parseInt(res.body.data.pages))
            : "";
          res.body.data.totals
            ? (vm.tableTotals = parseInt(res.body.data.totals))
            : "";
          res.body.data.size
            ? (vm.tablePageSize = parseInt(res.body.data.size))
            : "";
        } else {
          this.$message.error("提交数据获取失败");
        }
      });
    },
    delUserHandle(id) {
      //  删除
      let vm = this;
      vm
        .$confirm("是否删除?", "删除[" + id + "]号订单")
        .then(_ => {
          vm.$http
            .post(vm.serverUrl + "user/deleted", { id: id })
            .then(response => {
              if (response.result.code === 1) {
                vm.$message("[" + id + "]号订单已经删除");
                vm.listDatas = vm.listDatas.filter(item => item.id !== id);
              } else {
                vm.$message("[" + id + "]号订单删除失败...");
              }
            });
        })
        .catch(_ => {});
    },
    exportSubmits(e) {
      let vm = this;
      vm.$message({
        message: "很遗憾,导出Excel功能还在优化中",
        type: "warning"
      });
      return;
      if (vm.tableSelected.length > 0) {
        let ids = [];
        for (let key in vm.tableSelected) {
          ids.push(vm.tableSelected[key].id);
        }
        vm.$confirm("是否导出所选项?", "选择[" + ids + "]项目").then(_ => {
          vm.$http
            .post(vm.serverUrl + "export_list", {
              exports_ids: ids.toString()
            })
            .then(response => {
              console.log(response);
            });
        });
      }
    },
    refreshTable() {
      let vm = this;
      vm.getTableDataHandler({
        paged: vm.tablePaged,
        page_size: vm.tablePageSize
      });
    },
    //  删除
    deleteIt(id) {
      let vm = this;
      vm
        .$confirm("是否删除?", "删除[" + id + "]号订单")
        .then(_ => {
          vm.$http.post(vm.serverUrl + "deleted", { id: id }).then(response => {
            if (response.result.code === 1) {
              vm.$message("[" + id + "]号订单已经删除");
              vm.listDatas = vm.listDatas.filter(item => item.id !== id);
            } else {
              vm.$message("[" + id + "]号订单删除失败...");
            }
          });
        })
        .catch(_ => {});
    },
    handleSelectionChange(row) {
      if (row) {
        this.tableSelected = row;
      }
    }
  },
  beforeMount() {
    this.getTableDataHandler();
  }
};
</script>
<style scope>
.design_user {
}
</style>
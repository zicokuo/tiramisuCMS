<template>
    <div class="design_user">
        <template name="table">
            <el-table :data="listDatas" style="width: 100%" :default-sort="{prop: '', order: 'descending'}"
                      @selection-change="handleSelectionChange" ref="designTable">
                <el-table-column type="selection"  align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="60"></el-table-column>
                <el-table-column prop="avatar_url" label="头像">
                    <template slot-scope="scope">
                        <img :src="scope.row.avatar_url" alt="用户头像" height="64">
                    </template>
                </el-table-column>
                <el-table-column prop="nick_name" label="微信昵称"></el-table-column>
                <el-table-column lable="地区">
                    <template slot-scope="scope">
                        <el-tag>{{ scope.row.country }}</el-tag>
                        <el-tag>{{ scope.row.province }}</el-tag>
                        <el-tag>{{ scope.row.city }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column lable="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini">禁止该用户</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'design_user',
        data () {
            return {
                serverUrl: this.$getUrl('serverUrl') + 'diavision/index/',
                listDatas: [],
                tableSelected: 0,   //  选择项数
                tableMultiSelected: [],  //  选择项目
                tablePaged: 1,  //  当前页数
                tablePages: 1,   //  页数
                tableTotals: 0, //  项目数
                tablePageSize: 15   //  每页项目数
            }
        },
        methods: {
            //  获取表单数据
            getTableDataHandler (data = {}, func) {
                let vm = this
                data.page_size ? '' : data.page_size = vm.tablePageSize
                data.paged ? '' : data.paged = vm.tablePaged
//                console.log(data)
                vm.$http.post(vm.serverUrl + 'get_user', data).then(res => {
//                console.log(response)
                    if (res.body.code === 1) {
                        vm.listDatas = res.body.data.formData || '';
                        res.body.data.paged ? vm.tablePaged = parseInt(res.body.data.paged) : ''
                        res.body.data.pages ? vm.tablePages = parseInt(res.body.data.pages) : ''
                        res.body.data.totals ? vm.tableTotals = parseInt(res.body.data.totals) : ''
                        res.body.data.size ? vm.tablePageSize = parseInt(res.body.data.size) : ''
                    } else {
                        this.$message.error('提交数据获取失败')
                    }
                })
            },
            handleSelectionChange(val){
                console.log(val);
            }
        },
        beforeMount(){
            this.getTableDataHandler();
        }
    }
</script>
<style scope>
    .design_user {
    }
</style>
<template>
    <div class="design_index">
        <p>这里是标志定制Logo小程序后台</p>
        <template>
            <el-table :data="listDatas" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <!--{{ props.row}}-->
                            <template v-for="key,infos in props.row.from_data.userInfo">
                                <el-form-item :label="key">
                                    <span>{{ infos }}</span>
                                </el-form-item>
                            </template>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="序号" width="60"></el-table-column>
                <el-table-column prop="user_id" label="用户" width="80"></el-table-column>
                <el-table-column prop="create_time" label="提交时间"></el-table-column>
                <el-table-column prop="from_data" label="内容">
                    <template slot-scope="scope">
                        {{ scope.row.userInfo }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <taskStatus :status="scope.row.status"></taskStatus>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>
<script>
    import Configs from '../../../config'

    let designAppUrl = Configs.SERVER_DEV_URL + 'diavision/index/'

    let comp_taskStatus = {
        template: '<el-tag :type="getTypeByStatus(status)">{{getTextByStatus(status)}}</el-tag>',
        props: ['status'],
        data: function () {
            return {
                defaultText: '',
            }
        },
        methods: {
            getTypeByStatus: function (e) {
                return parseInt(e) === 0 ? 'success' : 'danger'
            },
            getTextByStatus: function (e) {
                return parseInt(e) === 0 ? '未处理' : '已完成'
            }
        },

    }
    export default {
        name: 'design_index',
        data () {
            return {
                submits: [],
                listDatas: [],
                userDatas: [],
            }
        },
        beforeMount () {
            let vm = this
            this.$http.get(designAppUrl + 'get_list').then(response => {
                console.log(response)
                if (response.result.code === 1) {
                    vm.listDatas = response.result.data
                } else {
                    vm.$message.error('提交数据获取失败')
                }
            })
//            this.$http.get(designAppUrl + 'get_users').then(response => {
//                console.log(response)
//                if (response.result.code === 1) {
//                    vm.userDatas = response.result.data
//                } else {
//                    vm.$message.error('用户数据获取失败..')
//                }
//            })
        },
        watch: {
            listDatas () {
                let listDatas = this.listDatas
//                for (let i in listDatas) {
//                    if (listDatas.hasOwnProperty(i)) {
//                        console.log(listDatas[i])
//                    }
//                }
            }
        },
        methods: {},
        components: {
            taskStatus: comp_taskStatus
        }
    }


</script>
<style scope>
    .design_index {
    }
</style>
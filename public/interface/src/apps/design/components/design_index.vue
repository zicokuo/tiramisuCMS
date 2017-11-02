<template>
    <div class="design_index">
        <p>这里是标志定制Logo小程序后台</p>
        <template name="toolbar">
            <el-row :gutter="8">
                <el-col align="right">
                    操作
                    <el-button type="primary" icon="el-icon-i--right" size="mini">批量完成</el-button>
                    <el-button type="primary" icon="el-icon-i--empty" size="mini">批量删除</el-button>
                </el-col>

            </el-row>

        </template>
        <template name="table">
            <el-table :data="listDatas" style="width: 100%" :default-sort="{prop: 'create_time', order: 'descending'}">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="table-expand">
                            <span></span>
                            <el-row :gutter="24" align="middle">
                                <template v-for="item,index in JSON.parse(props.row.from_data)">
                                    <template v-if="index == 'vi_item'">
                                        <el-col :span="24">
                                            <h3>{{tableFields.hasOwnProperty(index) ? tableFields[index] : index}}</h3>
                                            <template v-for="viitem in item">
                                                <el-tag style="margin: 1em;" :type="viitem.checked?'':'danger'">
                                                    <i class="el-icon-circle-check" v-if="viitem.checked"></i>
                                                    {{viitem.name}}
                                                </el-tag>
                                            </template>
                                        </el-col>
                                    </template>
                                    <template v-else-if="index == 'userInfo'">
                                        <el-col :span="24">
                                            <h3>{{tableFields.hasOwnProperty(index) ? tableFields[index] : index}}</h3>
                                            <el-row :gutter="24">
                                                <el-col :span="4" align="middle">
                                                    <img :src="item.avatarUrl" alt="微信头像" width="64" height="64">
                                                </el-col>
                                                <el-col :span="20">
                                                    <p>{{item.nickName}}</p>
                                                    <p>{{item.country}} - {{item.province}} - {{item.city}}</p>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </template>
                                    <template v-else>
                                        <el-col :span="12">
                                            <h3>{{tableFields.hasOwnProperty(index) ? tableFields[index] : index}}</h3>
                                            <p>{{item}}</p>
                                        </el-col>
                                    </template>
                                </template>
                            </el-row>

                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column type="selection"></el-table-column>

                <el-table-column prop="id" label="序号" width="60"></el-table-column>
                <el-table-column prop="user_id" label="用户" width="80">
                    <template slot-scope="scope">
                        {{JSON.parse(scope.row.from_data).userInfo.nickName}}
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="提交时间" sortable>
                    <template slot-scope="scope">
                        {{ formatDate(scope.row.create_time) }}
                    </template>
                </el-table-column>
                <el-table-column prop="from_data" label="价钱">
                    <template slot-scope="scope">
                        ¥{{ JSON.parse(scope.row.from_data).total_price }}.00
                    </template>
                </el-table-column>
                <el-table-column prop="from_data" label="联系电话">
                    <template slot-scope="scope">
                        <i class="el-icon-i--mobilephone_fill"></i>
                        {{ JSON.parse(scope.row.from_data).user_phone }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <taskStatus :status="scope.row.status"></taskStatus>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" icon="el-icon-i--right" size="mini"
                                   @click="finishIt(scope.row.id)" :disabled="parseInt(scope.row.status)===1">
                        </el-button>
                        <el-button type="primary" icon="el-icon-i--editor" size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteIt(scope.row.id)">

                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <div class="block" style="text-align: center">
                <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
            </div>
        </template>
    </div>
</template>
<script>
    import Configs from '../../../config'
    import {formatDate} from '../../../public-resource/plugins/datetime'

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
                return parseInt(e) === 0 ? 'info' : 'success'
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
                tableFields: {
                    'logo_style': 'Logo风格',
                    'design_suggest': '设计建议',
                    'total_price': '预计费用',
                    'user_name': '客户姓名',
                    'user_phone': '客户电话',
                    'user_company': '客户公司',
                    'userInfo': '用户微信信息',
                    'vi_item': 'VI设计项',
                    'logo_name': 'Logo名称',
                    'design_set': '设计套餐',
                },
            }
        },
        beforeMount () {
            let vm = this
            this.$http.get(designAppUrl + 'get_list').then(response => {
                console.log(response)
                if (response.result.code === 1) {
                    vm.listDatas = response.result.response
                } else {
                    vm.$message.error('提交数据获取失败')
                }
            })
        },
        deactivated () {
            console.log('我被冻住了')
        },
        watch: {},
        methods: {
            //  删除
            deleteIt (id) {
                let vm = this
                vm.$confirm('是否删除?', '删除[' + id + ']号订单').then(_ => {
                    vm.$http.post(designAppUrl + 'deleted', {'id': id}).then(response => {
                        if (response.result.code === 1) {
                            vm.$message('[' + id + ']号订单已经删除')
                            vm.listDatas = vm.listDatas.filter(item => item.id !== id)
                        } else {
                            vm.$message('[' + id + ']号订单删除失败...')
                        }
                    })
                }).catch(_ => {
                })
            },
            //  完成提交
            finishIt (id) {
                let vm = this
                vm.$http.post(designAppUrl + 'finished', {'id': id}).then(response => {
                    if (response.result.code === 1) {
                        vm.$message('[' + id + ']号订单处理完成')
                        for (let index in vm.listDatas) {
                            if (vm.listDatas[index].id === id) {
                                vm.listDatas[index].status = 1
                            }
                        }
                    } else {
                        vm.$message.error('[' + id + ']号订单处理失败..')
                    }
                })
            },
            formatDate (stamp) {
                return formatDate(new Date(stamp * 1000), 'yyyy-MM-dd h:m:s')
            },
        },
        components: {
            taskStatus: comp_taskStatus
        }
    }

</script>
<style lang="scss" scope>
    .design_index {
        max-width: 1200px;

    &
    .table-expand {

    &
    h3,

    &
    p {
        text-indent: 1em;
    }

    &
    h3 {
        font-weight: 900;
        color: #ffffff;
        background: #aaa;
        line-height: 2em;
        text-indent: 1em;
        text-decoration: underline;
    }

    }
    &
    .el-form-item__label {
        font-weight: 900;
        color: #666666;
        background: #cccccc;
        line-height: 1.5em;
    }

    }
</style>

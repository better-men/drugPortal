<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">

                <!-- <el-form-item style="float: left">
                    <router-link :to="{
                                path:'/userInsert'
                            }">
                        <el-button type="primary" size="small">新增</el-button>
                    </router-link>
                </el-form-item> -->

                <el-form-item style="float: right">
                    <el-button type="primary" v-on:click="selectUserByAccount">查询</el-button>
                </el-form-item>
                <el-form-item style="float: right">
                    <div class="search-input">
                        <el-input v-model="filters.userAccount" placeholder="输入用户名"></el-input>
                    </div>
                </el-form-item>
            </el-form>

        </el-col>
        <!--列表-->
        <el-table :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column prop="userAccount" label="用户名">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="createTime" width="180" label="创建时间">
            </el-table-column>
            <el-table-column prop="creator" label="创建人">
            </el-table-column>
            <!-- <el-table-column
                    prop="disable"
                    label="是否禁用"
                    width="100"
                    :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]"
                    :filter-method="filterDisable"
                    filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.tag === '否' ? 'primary' : 'success'"
                            disable-transitions>{{scope.row.disable}}</el-tag>
                </template>
            </el-table-column> -->
            <!-- <el-table-column label="操作">
                <template slot-scope="scope" style="display: flex">
                    <router-link
                            :to="{
                                path:'/userEdit',
                                query: {
                                    user: scope.row,
                                }
                            }">
                        <el-button type="primary" size="small">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="small"  v-on:click="deleteUser(scope.row.userId)">删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="userList.length">
        </el-pagination>
    </section>
</template>

<script>
    import {
        listUser,
        deleteUser,
        likeUserByAccount,
    } from '../../api/api'
    export default {
        data() {
            return {
                filters: {
                    userAccount: ''
                },
                userList: [],
                realUserList: [],
                currentPage: 1,
                pagesize: 10,
                total: 0,
                page: 1,
                listLoading: false,
            };
        },
        methods: {
            getUser: function() {
                listUser({}).then(data => {
                    this.userList = data.data.resultValue;
                    for (var i = 0; i < this.userList.length; i++) {
                        if (this.userList[i].disable) {
                            this.userList[i].disable = "是"
                        } else {
                            this.userList[i].disable = "否"
                        }
                    }
                    this.realUserList = this.userList;
                });
            },
            selectUserByAccount: function() {
                var userAccount = this.filters.userAccount;
                likeUserByAccount({
                    "userAccount": userAccount
                }).then(data => {
                    this.userList = data.data.resultValue;
                    for (var i = 0; i < this.userList.length; i++) {
                        if (this.userList[i].disable) {
                            this.userList[i].disable = "是"
                        } else {
                            this.userList[i].disable = "否"
                        }
                    }
                })
            },
            handleSizeChange: function(size) {
                this.pagesize = size;
            },
            handleCurrentChange: function(currentPage) {
                this.currentPage = currentPage;
            },
            filterTop(value, row) {
                return row.setTop === value;
            },
            filterDisable(value, row) {
                return row.disable === value;
            },
            deleteUser(userAccount) {
                this.$confirm('确认删除该用户吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteUser({
                        "userAccount": userAccount
                    }).then(data => {
                        if (data.data.resultDesc === "SUCCESS") {
                            this.$message.warning(`删除成功`);
                            this.getProduct();
                        }
                    })
                }).catch(() => {})
            }
        },
        mounted() {
            this.getUser();
        }
    }
</script>

<style scoped>

</style>

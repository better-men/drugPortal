<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
            <el-form-item style="float: left">
                <router-link :to="{
                        path:'/inBoundInsert'
                    }">
                    <el-button type="primary" size="small">新增</el-button>
                </router-link>
            </el-form-item>
            <el-form-item style="float: right">
                <el-button type="danger" v-on:click="clearFilter">清空查询</el-button>
            </el-form-item>
            <el-form-item style="float: right">
                <el-button type="primary" v-on:click="filter">查询</el-button>
            </el-form-item>
            <el-form-item style="float: right">
                <div class="search-input">
                    <el-input v-model="filters.name" placeholder="输入货品名称"></el-input>
                </div>
            </el-form-item>
        </el-form>

    </el-col>
    <!--列表-->
    <el-table :data="productList.slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column prop="repertoryName" label="药品名称">
        </el-table-column>
        <el-table-column prop="repertoryClass" label="药品分类">
        </el-table-column>
        <el-table-column prop="repertoryDesc" label="药品适用症状">
        </el-table-column>
        <el-table-column prop="price" label="单价">
        </el-table-column>
        <el-table-column prop="boundNum" label="数量">
        </el-table-column>
        <el-table-column prop="address" label="产地">
        </el-table-column>
        <el-table-column prop="boundDesc" label="入库描述">
        </el-table-column>
        <el-table-column prop="createdTime" width="180" label="创建时间">
        </el-table-column>
        <el-table-column prop="createdBy" label="创建人">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope" style="display: flex">
                <!-- <el-button type="danger" size="small" v-on:click="deleteProductType(scope.row.pId)">删除</el-button> -->
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="productList.length">
    </el-pagination>
</section>
</template>

<script>
import {
    allInBound
} from '../../api/api'
export default {
    data() {
        return {
            filters: {
                name: '',
                category: ''
            },
            productList: [],
            productTypes: [],
            realProductList: [],
            currentPage: 1,
            pagesize: 10,
            total: 0,
            page: 1,
            listLoading: false,
        };
    },
    methods: {
        getProduct() {
            allInBound({}).then(data => {
                this.productList = data.data.resultValue;
                this.realProductList = this.productList;
            });
        },
        filter() {
            this.productList = this.realProductList.filter(el => el.repertoryName.indexOf(this.filters.name) > -1)
        },
        clearFilter() {
            this.filters.name = "";
            this.filters.category = "";
            this.productList = this.realProductList;
        },
        handleSizeChange(size) {
            this.pagesize = size;
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
        filterTop(value, row) {
            return row.setTop === value;
        },
        filterDisable(value, row) {
            return row.disable === value;
        },
        deleteProductType(pId) {
            this.$confirm('确认删除该产品吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteProduct({
                    "pId": pId
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
        this.getProduct();
    }
}
</script>

<style scoped lang="scss">
.search-input {
    display: flex;
    flex-direction: row;
}
</style>

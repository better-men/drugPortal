<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
            <el-form-item style="float: left">
                <router-link :to="{
                    path:'/productInsert'
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
                    <el-input v-model="filters.repertoryName" placeholder="输入库存名称"></el-input>
                </div>
            </el-form-item>
            <!-- <el-form-item style="float: right">
                <el-input v-model="filters.repertoryClass" placeholder="输入库存分类"></el-input>
            </el-form-item> -->
        </el-form>

    </el-col>
    <!--列表-->
    <el-table :data="productList.slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column prop="repertoryName" label="库存名称">
        </el-table-column>
        <el-table-column prop="repertoryClass" label="库存分类">
        </el-table-column>
        <el-table-column prop="repertoryDesc" label="库存描述">
        </el-table-column>
        <el-table-column prop="repertoryNum" label="余量">
            <template slot-scope="scope">
                <span :style="getColor(scope.row.repertoryNum)">{{scope.row.repertoryNum}}</span>
            </template>
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
    allBound
} from '../../api/api'
export default {
    data() {
        return {
            filters: {
                repertoryName: '',
                repertoryClass: ''
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
            allBound({}).then(data => {
                this.productList = data.data.resultValue;
                this.realProductList = this.productList;
            });
        },
        filter() {
            this.productList = this.realProductList.filter(el => el.repertoryName.indexOf(this.filters.repertoryName) > -1)
        },
        clearFilter() {
            this.filters.repertoryName = "";
            this.filters.repertoryClass = "";
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
        },
        getColor(amount) {
            if (Number(amount) < 50) {
                return `color: red`
            }
            return ''
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

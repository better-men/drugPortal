<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
            <el-form-item style="float: left">
                <router-link :to="{
                        path:'/productCategoryInsert'
                    }">
                    <el-button type="primary" size="small">新增</el-button>
                </router-link>
            </el-form-item>
            <!-- <el-form-item style="float: right">
                <el-button type="danger" v-on:click="clearFilter">清空查询</el-button>
            </el-form-item> -->
            <el-form-item style="float: right">
                <el-button type="primary" v-on:click="filter">查询</el-button>
            </el-form-item>
            <el-form-item style="float: right">
                <div class="search-input">
                    <el-input v-model="filters.name" placeholder="输入分类名称"></el-input>
                </div>
            </el-form-item>
            <!-- <el-form-item style="float: right">
                <el-select v-model="filters.category" placeholder="选择货品分类">
                    <el-option label="驱虫药" value="1"></el-option>
                    <el-option label="五联疫苗" value="2"></el-option>
                    <el-option label="三联疫苗" value="3"></el-option>
                </el-select>
            </el-form-item> -->
        </el-form>

    </el-col>
    <!--列表-->
    <el-table :data="productList.slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column prop="className" label="分类名称" width="200px">
        </el-table-column>
        <el-table-column prop="classDesc" label="分类描述">
        </el-table-column>
        <el-table-column label="操作" width="120px">
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
    allClass
} from '../../api/api'
export default {
    data() {
        return {
            filters: {
                className: '',
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
            allClass().then(data => {
                this.productList = data.data.resultValue
                this.realProductList = data.data.resultValue
            })
        },
        filter() {
            this.productList = this.realProductList.filter(el => el.className.indexOf(this.filters.name) > -1)
        },
        clearFilter() {
            this.filters.name = "";
            this.productList = this.realProductList;
        },
        handleSizeChange(size) {
            this.pagesize = size;
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
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

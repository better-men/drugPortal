<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
            <!-- <el-form-item style="float: left">
                <router-link :to="{
                        path:'/purchaseOrderInsert'
                    }">
                    <el-button type="primary" size="small">新增</el-button>
                </router-link>
            </el-form-item> -->
            <!-- <el-form-item style="float: right">
                <el-button type="danger" v-on:click="clearFilter">清空查询</el-button>
            </el-form-item>
            <el-form-item style="float: right">
                <el-button type="primary" v-on:click="getProductByNameAndPtId">查询</el-button>
            </el-form-item>
            <el-form-item style="float: right">
                <div class="search-input">
                    <el-input v-model="filters.name" placeholder="输入库存名称"></el-input>
                </div>
            </el-form-item> -->
        </el-form>

    </el-col>
    <!--列表-->
    <el-table :data="productList.slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row v-loading="listLoading" style="width: 100%;">

        <el-table-column prop="orderId" label="采购单号">
        </el-table-column>
        <el-table-column prop="planId" label="采购计划单号">
        </el-table-column>
        <el-table-column prop="purchaseDate" label="采购日期">
            <template slot-scope="scope">
              <span>{{scope.row.purchaseDate.substr(0, 10)}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="purchaseNum" label="采购数量">
        </el-table-column>
        <el-table-column prop="supplier" label="供应商">
        </el-table-column>
        <el-table-column prop="createdTime" width="180" label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.createdTime.substr(0, 11)}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="createdBy" label="创建人">
        </el-table-column>
        <el-table-column label="操作" width="80">
            <template slot-scope="scope" style="display: flex">
                <!-- <el-button type="primary" size="small" v-on:click="editroductType(scope.row)">编辑</el-button> -->
                <el-button type="danger" size="small" v-on:click="deleteProductType(scope.row.orderId)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="productList.length">
    </el-pagination>
</section>
</template>

<script>
import {
    allPurchaseOrder,
    allBound,
    deletePurchaseOrder
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
            allBound: []
        };
    },
    methods: {
        getProduct: function() {
            allPurchaseOrder().then(data => {
                this.productList = data.data.resultValue;
                this.realProductList = this.productList;
            });
            allBound().then(data => {
                this.allBound = data.data.resultValue
                localStorage.setItem('allBound', JSON.stringify(this.allBound))
            })
        },
        clearFilter: function() {
            this.filters.name = "";
            this.filters.category = "";
            this.productList = this.realProductList;
        },
        getProductByNameAndPtId: function() {
            var sname = this.filters.name;
            var ptId = this.filters.category;
            getProductByNameAndPtId({
                "pName": sname,
                "ptId": ptId
            }).then(data => {
                this.productList = data.data.resultValue;
                for (var i = 0; i < this.productList.length; i++) {
                    if (!this.productList[i].setTop) {
                        this.productList[i].setTop = "否"
                    } else {
                        this.productList[i].setTop = "是"
                    }
                    if (this.productList[i].disable) {
                        this.productList[i].disable = "是"
                    } else {
                        this.productList[i].disable = "否"
                    }
                }
            })
        },
        getName(repertoryId) {
            let item = this.allBound.find(el => el.repertoryId === repertoryId)
            return item.repertoryName || ''
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
        deleteProductType(pId) {
            this.$confirm('确认删除该产品吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deletePurchaseOrder({
                    "orderId": pId
                }).then(data => {
                    if (data.data.resultDesc === "SUCCESS") {
                        this.$message.warning(`删除成功`);
                        this.getProduct();
                    }
                })
            }).catch(() => {})
        },
        editroductType(row) {
            this.$router.push({
                path: '/purchaseOrderInsert',
                query: {
                    item: row,
                    status: 'update'
                }
            })
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

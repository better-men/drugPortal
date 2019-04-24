<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
            <el-form-item style="float: right">
                <el-button type="danger" v-on:click="clearFilter">清空查询</el-button>
            </el-form-item>
            <el-form-item style="float: right">
                <el-button type="primary" v-on:click="getProductByNameAndPtId">查询</el-button>
            </el-form-item>
            <el-form-item style="float: right">
                <div class="search-input">
                    <el-input v-model="filters.name" placeholder="输入货品名称"></el-input>
                </div>
            </el-form-item>
            <el-form-item style="float: right">
                <el-select v-model="filters.category" placeholder="选择货品分类">
                    <el-option label="驱虫药" value="1"></el-option>
                    <el-option label="五联疫苗" value="2"></el-option>
                    <el-option label="三联疫苗" value="3"></el-option>
                    <!-- <el-option
                            v-for="item in productTypes"
                            :key="item.ptName"
                            :label="item.ptName"
                            :value="item.ptId">
                    </el-option> -->
                </el-select>
            </el-form-item>
        </el-form>

    </el-col>
    <!--列表-->
    <el-table :data="productList.slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column prop="name" label="货品名称">
        </el-table-column>
        <el-table-column prop="category" label="分类">
        </el-table-column>
        <el-table-column prop="code" label="编号">
        </el-table-column>
        <el-table-column prop="price" label="单价">
        </el-table-column>
        <el-table-column prop="amount" label="数量">
        </el-table-column>
        <el-table-column prop="place" label="产地">
        </el-table-column>
        <el-table-column prop="createTime" width="180" label="创建时间">
        </el-table-column>
        <el-table-column prop="creator" label="创建人">
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
    listProduct,
    selectProductByName,
    deleteProduct,
    listProductTypes,
    getProductByNameAndPtId
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
        getProduct: function() {
            this.productList = [{
                name: '狂犬病疫苗',
                code: 'kqb2099',
                amount: 100,
                category: '五联疫苗',
                price: '234',
                place: '中国',
                createTime: '2019-03-02',
                creator: 'admin'
            }, {
                name: '传染病疫苗疫苗',
                code: 'crb3092',
                amount: 120,
                category: '五联疫苗',
                price: '234',
                place: '瑞士',
                createTime: '2019-03-02',
                creator: 'admin'
            }]
            // listProduct({}).then(data => {
            //     this.productList = data.data.resultValue;
            //     for (var i = 0; i < this.productList.length; i++) {
            //         if (!this.productList[i].setTop) {
            //             this.productList[i].setTop = "否"
            //         } else {
            //             this.productList[i].setTop = "是"
            //         }
            //         if (this.productList[i].disable) {
            //             this.productList[i].disable = "是"
            //         } else {
            //             this.productList[i].disable = "否"
            //         }
            //     }
            //     this.realProductList = this.productList;
            //     // listProductTypes({}).then(data => {
            //     //     this.productTypes = data.data.resultValue;
            //     // });
            // });
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

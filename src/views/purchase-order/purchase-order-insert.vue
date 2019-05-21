<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
            <el-form-item style="float: right">
                <el-button type="primary" v-on:click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
    </el-col>
    <el-form ref="form" :rules="rules" :model="purchaseInfo" label-position="right" @submit.prevent="onSubmit">
        <el-form-item label="采购数量" label-width="200px" style="width: 460px" prop="purchaseNum">
            <el-input-number v-model="purchaseInfo.purchaseNum" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="采购日期" label-width="200px" style="width: 460px" prop="purchaseDate">
            <el-date-picker v-model="purchaseInfo.purchaseDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="供应商" label-width="200px" style="width: 460px" prop="supplier">
            <el-input v-model="purchaseInfo.supplier"></el-input>
        </el-form-item>
        <el-form-item label-width="200px" style="width: 460px">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="goBack">取消</el-button>
        </el-form-item>
    </el-form>
</section>
</template>

<script>
import {
    insertPurchaseOrder,
    updatePurchasePlan,
    allPurchasePlan
}
from '../../api/api'
export default {
    name: '',
    data() {
        return {
            options: [],
            fileList: [],
            productCount: 0,
            purchaseInfo: {
                purchaseNum: "",
                purchaseDate: "",
                planId: '',
                supplier: ''
            },
            status: '',
            productTypes: [],
            rules: {
                purchaseNum: [{
                    required: true
                }],
                purchaseDate: [{
                    required: true
                }],
                supplier: [{
                    required: true
                }]
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            allPurchasePlan({}).then(data => {
                this.options = data.data.resultValue
            })
            let item = this.$route.query.item
            this.status = this.$route.query.status
            if (item) {
                this.purchaseInfo.planId = item.planId
                this.purchaseInfo.purchaseNum = item.planNum || item.purchaseNum
                this.purchaseInfo.purchaseDate = item.planDate || item.purchaseDate
                this.purchaseInfo.supplier = item.supplier || ''
            } else {
                this.goBack()
            }
        })
    },
    methods: {
        submitForm() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (this.status === 'create') {
                        insertPurchaseOrder(this.purchaseInfo).then(data => {
                            if (data.data.resultDesc === "SUCCESS") {
                                updatePurchasePlan(Object.assign({}, this.$route.query.item, {
                                    purchaseStatus: 1,
                                    isDeleted: 0
                                })).then(data => {
                                    if (data.data.resultDesc === "SUCCESS") {
                                        this.$router.back(-1);
                                    }
                                })
                                this.$router.back(-1);
                            }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        goBack() {
            this.$router.back(-1);
        }
    }
}
</script>

<style scoped>

</style>

<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
            <el-form-item style="float: right">
                <el-button type="primary" v-on:click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
    </el-col>
    <el-form ref="form" :rules="rules" :model="planInfo" label-position="right" @submit.prevent="onSubmit">
        <el-form-item label="选择药品" label-width="200px" style="width: 460px" prop="repertoryId">
            <el-select v-model="planInfo.repertoryId" placeholder="请选择">
                <el-option v-for="item in options" :key="item.repertoryId" :label="item.repertoryName" :value="item.repertoryId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="建议采购数量" label-width="200px" style="width: 460px" prop="planNum">
            <el-input-number v-model="planInfo.planNum" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="建议采购日期" label-width="200px" style="width: 460px" prop="planDate">
            <el-date-picker v-model="planInfo.planDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker>
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
    insertPurchasePlan,
    updatePurchasePlan,
    allBound
}
from '../../api/api'
export default {
    name: '',
    data() {
        return {
            options: [],
            fileList: [],
            productCount: 0,
            planInfo: {
                planNum: "",
                planDate: "",
                repertoryId: ''
            },
            status: '',
            productTypes: [],
            rules: {
                planDate: [{
                    required: true
                }],
                planNum: [{
                    required: true
                }],
                repertoryId: [{
                    required: true
                }]
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            allBound({}).then(data => {
                this.options = data.data.resultValue
            })
            let item = this.$route.query.item
            if (item) {
                this.status = 'update'
                console.log(item)
                this.planInfo = Object.assign({}, item, {isDeleted: item.isDeleted || 0})
            } else {
                this.status = 'create'
            }
        })
    },
    methods: {
        submitForm() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (this.status === 'create') {
                        insertPurchasePlan(this.planInfo).then(data => {
                            if (data.data.resultDesc === "SUCCESS") {
                                this.$router.back(-1);
                            }
                        })
                    } else {
                        updatePurchasePlan(this.planInfo).then(data => {
                            if (data.data.resultDesc === "SUCCESS") {
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

<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
            <el-form-item style="float: right">
                <el-button type="primary" v-on:click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
    </el-col>
    <el-form ref="form" :rules="rules" :model="outBound" label-position="right" @submit.prevent="onSubmit">
        <el-form-item label="选择库存" label-width="200px" style="width: 460px">
            <el-select v-model="outBound.repertoryId" placeholder="请选择">
                <el-option v-for="item in options" :key="item.repertoryId" :label="item.repertoryName" :value="item.repertoryId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="单价" label-width="200px" style="width: 460px">
            <el-input v-model="outBound.price"></el-input>
        </el-form-item>
        <el-form-item label="数量" label-width="200px" style="width: 460px">
            <el-input v-model="outBound.boundNum"></el-input>
        </el-form-item>
        <el-form-item label="产地" label-width="200px" style="width: 460px">
            <el-input v-model="outBound.address"></el-input>
        </el-form-item>
        <el-form-item label="入库描述" label-width="200px" style="width: 460px">
            <el-input type="textarea" v-model="outBound.boundDesc"></el-input>
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
    outBound,
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
            outBound: {
                address: "",
                boundDesc: "",
                price: '',
                boundNum: '',
                repertoryId: ''
            },
            productTypes: [],
            rules: {
                address: [{
                    required: true
                }],
                boundDesc: [{
                    required: true
                }],
                price: [{
                    required: true
                }],
                boundNum: [{
                    required: true
                }, {
                    pattern: /^\d{1,10}$/,
                    message: '请输入非负整数，不超过10位'
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
        })
    },
    methods: {
        submitForm() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    outBound(this.outBound).then(data => {
                        if (data.data.resultDesc === "SUCCESS") {
                            this.$router.back(-1);
                        }
                    })
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

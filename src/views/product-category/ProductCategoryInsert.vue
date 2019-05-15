<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
            <el-form-item style="float: right">
                <el-button type="primary" v-on:click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
    </el-col>
    <el-form ref="form" :rules="rules" :model="productCategory" label-position="right" @submit.prevent="onSubmit">
        <el-form-item label="产品名称" label-width="200px" style="width: 460px">
            <el-input v-model="productCategory.className"></el-input>
        </el-form-item>
        <el-form-item label="产品简介" label-width="200px" style="width: 460px">
            <el-input type="textarea" v-model="productCategory.classDesc"></el-input>
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
    insertClass
}
from '../../api/api'
export default {
    name: '',
    data() {
        return {
            fileList: [],
            productCount: 0,
            productCategory: {
                className: "",
                classDesc: ""
            },
            productTypes: [],
            rules: {
                className: [{
                    required: true
                }],
                classDesc: [{
                    required: true
                }]
            }
        }
    },
    mounted() {
        this.$nextTick(() => {})
    },
    methods: {
        submitForm() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    insertClass(this.productCategory).then(data => {
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

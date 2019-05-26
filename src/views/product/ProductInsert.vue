<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
            <el-form-item style="float: right">
                <el-button type="primary" v-on:click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
    </el-col>
    <el-form ref="form" :rules="rules" :model="product" label-position="right" @submit.prevent="onSubmit" prop="repertoryClassId">
        <el-form-item label="选择药品分类" label-width="200px" style="width: 460px">
            <el-select v-model="product.repertoryClassId" placeholder="请选择">
                <el-option v-for="item in options" :key="item.classId" :label="item.className" :value="item.classId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="药品名称" label-width="200px" style="width: 460px" prop="repertoryName">
            <el-input v-model="product.repertoryName"></el-input>
        </el-form-item>
        <el-form-item label="药品适用症状" label-width="200px" style="width: 460px">
            <el-input type="textarea" v-model="product.repertoryDesc"></el-input>
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
    insertRepertory,
    allClass
}
from '../../api/api'
export default {
    name: '',
    data() {
        return {
            options: [],
            fileList: [],
            productCount: 0,
            product: {
                repertoryDesc: '',
                repertoryName: '',
                repertoryClass: '',
                repertoryClassId: ''
            },
            productTypes: [],
            rules: {
                repertoryName: [{
                    required: true
                }],
                repertoryClassId: [{
                    required: true
                }]
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            allClass({}).then(data => {
                this.options = data.data.resultValue
            })
        })
    },
    methods: {
        submitForm() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.product.repertoryClass = this.options.find(el => el.classId === this.product.repertoryClassId).className
                    insertRepertory(this.product).then(data => {
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

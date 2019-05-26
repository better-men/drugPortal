<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
            <el-form-item style="float: right">
                <el-button type="primary" v-on:click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
    </el-col>
    <el-form ref="form" :rules="rules" :model="inBound" label-position="right" @submit.prevent="onSubmit">
        <el-form-item label="选择药品" label-width="200px" style="width: 460px">
            <el-select v-model="inBound.repertoryId" placeholder="请选择">
                <el-option v-for="item in options" :key="item.repertoryId" :label="item.repertoryName" :value="item.repertoryId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="单价" label-width="200px" style="width: 460px">
            <el-input v-model="inBound.price"></el-input>
        </el-form-item>
        <el-form-item label="数量" label-width="200px" style="width: 460px">
            <el-input v-model="inBound.boundNum"></el-input>
        </el-form-item>
        <el-form-item label="产地" label-width="200px" style="width: 460px">
            <el-input v-model="inBound.address"></el-input>
        </el-form-item>
        <el-form-item label="入库描述" label-width="200px" style="width: 460px">
            <el-input type="textarea" v-model="inBound.boundDesc"></el-input>
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
    inBound,
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
            inBound: {
                address: "",
                boundDesc: "",
                price: '',
                boundNum: '',
                repertoryId: ''
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
                    inBound(this.inBound).then(data => {
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

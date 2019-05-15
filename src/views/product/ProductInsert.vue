<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
            <el-form-item style="float: right">
                <el-button type="primary" v-on:click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
    </el-col>
    <el-form ref="form" :rules="rules" :model="product" label-position="right" @submit.prevent="onSubmit">
        <el-form-item label="产品名称" label-width="200px" style="width: 460px">
            <el-input v-model="product.pName"></el-input>
        </el-form-item>
        <el-form-item label="产品类别" label-width="200px" style="width: 460px">
            <el-select v-model="product.ptId" placeholder="选择产品分类">
                <el-option
                        v-for="item in productTypes"
                        :key="item.ptName"
                        :label="item.ptName"
                        :value="item.ptId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="品牌" label-width="200px" style="width: 460px">
            <el-input v-model="product.designer"></el-input>
        </el-form-item>
        <el-form-item label="设计时间" label-width="200px" style="width: 460px">
            <el-date-picker v-model="product.designerTime" type="year" value-format="yyyy" placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="产品简介" label-width="200px" style="width: 460px">
            <el-input type="textarea" v-model="product.pSynopsis"></el-input>
        </el-form-item>
        <el-form-item label="产品高度(米)" label-width="200px" style="width: 460px">
            <el-input v-model="product.pHeight"></el-input>
        </el-form-item>
        <el-form-item label="产品宽度(米)" label-width="200px" style="width: 460px">
            <el-input v-model="product.pWidth"></el-input>
        </el-form-item>
        <el-form-item label="产品重量(kg)" label-width="200px" style="width: 460px">
            <el-input v-model="product.pWeight"></el-input>
        </el-form-item>
        <el-form-item label="产品描述" label-width="200px" style="width: 460px">
            <el-input type="textarea" v-model="product.pDescribe"></el-input>
        </el-form-item>
        <el-form-item label="产品选项" label-width="200px" style="width: 460px">
            <el-input v-model="product.pOption"></el-input>
        </el-form-item>
        <el-upload class="upload-demo" style="width: 360px;padding-left: 110px;padding-bottom: 20px;" action="http://39.108.82.48/blakk/upload/" name="file" accept=".jpg" multiple="true" :on-preview="handlePreview" :on-remove="handleRemove" :on-exceed="handleExceed"
            :on-success="successFile" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg格式图片，文件名中不能包含中文！！！</div>
        </el-upload>
        <el-form-item label-width="200px" label="是否置顶">
            <el-switch v-model="product.setTop"></el-switch>
        </el-form-item>
        <el-form-item label-width="200px" label="是否禁用">
            <el-switch v-model="product.disable"></el-switch>
        </el-form-item>
        <el-form-item label-width="200px" label="排序" prop="pOrder" style="width: 460px">
            <el-input v-model="product.pOrder"></el-input>
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
    insertProduct,
    listProductTypes,
    productCount
}
from '../../api/api'
export default {
    name: '',
    data() {
        var checkOrder = (rule, value, callback) => {
            setTimeout(() => {
                console.log(value);
                if (parseFloat(value).toString() === "NaN") {
                    callback(new Error('请输入数字值'));
                }else {
                    callback();
                }
            }, 1000);
        };
        return {
            fileList: [],
            productCount: 0,
            product: {
                ptName: "",
                ptEname: "",
                designer: "",
                coverImg: {
                    "imgFile":[]
                },
                coverInfo: "",
                setTop: false,
                disable: false,
                typeGrade: 0,
                fatherId: "",
                template: "",
                delete: false,
                pSynopsis: "",
                pHeight:null,
                pWidth:null,
                pWeight:null,
                pDescribe:"",
                pOption:""
            },
            productTypes: [],
            rules: {
                pOrder: [
                    { validator: checkOrder, trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            listProductTypes({}).then(data => {
                this.productTypes = data.data.resultValue;
            });
            productCount({}).then(data => {
                this.productCount = data.data.resultValue;
            })
        })
    },
    methods: {
        submitForm() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (this.fileList.length > 0) {
                        for (var i=0;i<this.fileList.length;i++){
                            this.product.coverImg.imgFile.push({"file":this.fileList[i].name.split('.')[0]})
                        }
                    }
                    this.product.coverImg = JSON.stringify(this.product.coverImg);
                    insertProduct(this.product).then(data => {
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
        handleExceed(files, fileList) {
            this.$message.warning(`最多上传一个文件`);
        },
        handleRemove(file, fileList) {
            this.fileList.splice(0, 1);
            console.log(this.fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        successFile(response, file, fileList) {
            this.fileList.push(file);
            console.log(this.fileList);
        },
        goBack() {
            this.$router.back(-1);
        }
    }
}
</script>

<style scoped>

</style>

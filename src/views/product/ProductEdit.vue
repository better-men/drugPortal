<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
            <div style="padding-top: 5px;float: left;">
                <label style="font-size: 18px;font-weight: 800;">
                        {{productObj.pName}}
                    </label>
            </div>
            <el-form-item style="float: right">
                <el-button type="primary" v-on:click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
    </el-col>
    <el-form ref="form" :rules="rules" :model="productObj" label-position="right" @submit.prevent="onSubmit">
        <el-form-item label="产品名称" label-width="200px" style="width: 460px">
            <el-input v-model="productObj.pName"></el-input>
        </el-form-item>
        <el-form-item label="产品类别" label-width="200px" style="width: 460px">
            <el-select v-model="productObj.ptId" placeholder="选择产品分类">
                <el-option v-for="item in productTypes" :key="item.ptName" :label="item.ptName" :value="item.ptId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="品牌" label-width="200px" style="width: 460px">
            <el-input v-model="productObj.designer"></el-input>
        </el-form-item>
        <el-form-item label="设计时间" label-width="200px" style="width: 460px">
            <el-date-picker v-model="productObj.designerTime" type="year" value-format="yyyy" placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="产品简介" label-width="200px" style="width: 460px">
            <el-input type="textarea" v-model="productObj.pSynopsis"></el-input>
        </el-form-item>
        <el-form-item label="产品高度" label-width="200px" style="width: 460px">
            <el-input v-model="productObj.pHeight"></el-input>
        </el-form-item>
        <el-form-item label="产品宽度" label-width="200px" style="width: 460px">
            <el-input v-model="productObj.pWidth"></el-input>
        </el-form-item>
        <el-form-item label="产品重量" label-width="200px" style="width: 460px">
            <el-input v-model="productObj.pWeight"></el-input>
        </el-form-item>
        <el-form-item label="产品描述" label-width="200px" style="width: 460px">
            <el-input type="textarea" v-model="productObj.pDescribe"></el-input>
        </el-form-item>
        <el-form-item label="产品选项" label-width="200px" style="width: 460px">
            <el-input v-model="productObj.pOption"></el-input>
        </el-form-item>
        <el-upload class="upload-demo" style="width: 360px;
                   padding-left: 110px;
                   padding-bottom: 20px;"
                   multiple="true"
                   action="http://39.108.82.48:8080/blakk/upload/"
                   name="file"
                   :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :on-exceed="handleExceed"
                   :on-success="successFile"
                   :file-list="fileList"
                   list-type="picture">
                   <!-- accept=".jpg" -->
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg格式图片，文件名中不能包含中文！！！</div>
        </el-upload>
        <el-form-item label-width="200px" label="是否置顶">
            <el-switch v-model="productObj.setTop"></el-switch>
        </el-form-item>
        <el-form-item label-width="200px" label="是否禁用">
            <el-switch v-model="productObj.disable"></el-switch>
        </el-form-item>
        <el-form-item label-width="200px" label="排序" prop="pOrder" style="width: 460px">
            <el-input v-model="productObj.pOrder"></el-input>
        </el-form-item>
        <el-form-item label-width="200px" style="width: 460px">
            <el-button type="primary" @click="submitForm">提交修改</el-button>
            <el-button v-on:click="goBack">取消</el-button>
        </el-form-item>
    </el-form>
</section>
</template>

<script>
import {
    updateProduct,
    listProductTypes,
    productCount
} from '../../api/api'

export default {
    name: '',
    data() {
        var checkOrder = (rule, value, callback) => {
            setTimeout(() => {
                console.log(value);
                if (parseFloat(value).toString() === "NaN") {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value > this.productCount) {
                        callback(new Error('必须小于等于' + this.productCount));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        return {
            productCount: 0,
            fileList: [],
            productObj: {},
            newFile: [],
            productTypes: [],
            rules: {
                pOrder: [{
                    validator: checkOrder,
                    trigger: 'blur'
                }]
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
                console.log(this.productCount)
            });
            this.getParams();
        })
    },
    methods: {
        getParams() {
            this.productObj = this.$route.query.productObj;
            if (typeof(this.productObj) !== 'object') {
                this.$router.push('/productList')
                return ''
            }
            if (this.productObj.disable === "否") {
                this.productObj.disable = false;
            } else if (this.productObj.disable === "是") {
                this.productObj.disable = true;
            }

            if (this.productObj.setTop === "否") {
                this.productObj.setTop = false;
            } else if (this.productObj.setTop === "是") {
                this.productObj.setTop = true;
            }
            this.productObj.coverImg = JSON.parse(this.productObj.coverImg);
            if (typeof(this.productObj.coverImg) === 'string') {
                this.productObj.coverImg = JSON.parse(this.productObj.coverImg);
            }
            this.productObj.coverImg.imgFile.forEach((el, i) => {
                this.fileList.push({
                    name: el.file,
                    url: "http://39.108.82.48:8080/blakk/files/" + el.file + ".jpg"
                })
            });
        },
        submitForm() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    for (var i = 0; i < this.newFile.length; i++) {
                        this.productObj.coverImg.imgFile.push({
                            "file": this.newFile[i].name.split('.')[0]
                        })
                    }
                    this.productObj.coverImg = JSON.stringify(this.productObj.coverImg);
                    let product = this.productObj;
                    updateProduct(product).then(data => {
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
            for (var i = 0; i < this.productObj.coverImg.imgFile.length; i++) {
                if (this.productObj.coverImg.imgFile[i].file === file.name) {
                    this.productObj.coverImg.imgFile.splice(i, 1);
                    console.log(this.productObj.coverImg.imgFile);
                }
            }
        },
        handlePreview(file) {
            console.log(file);
        },
        successFile(response, file, fileList) {
            // this.fileList.push(file);
            this.newFile.push(file);
            this.fileList = fileList;
            // this.newFile = [...this.newFile, ...file];
        },
        goBack() {
            this.$router.back(-1);
        }
    }
}
</script>

<style scoped>

</style>

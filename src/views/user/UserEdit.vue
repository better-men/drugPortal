<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <div style="padding-top: 5px;float: left;">
                    <label style="font-size: 18px;font-weight: 800;">
                        {{user.userAccount}}
                    </label>
                </div>
                <el-form-item style="float: right">
                    <el-button type="primary" v-on:click="goBack">返回</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-form ref="form" :model="user" label-position="right"  @submit.prevent="onSubmit" >
            <el-form-item label="用户名" label-width="200px" style="width: 460px">
                <el-input v-model="user.userAccount"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="200px" style="width: 460px">
                <el-input v-model="user.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="200px" style="width: 460px">
                <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="200px" style="width: 460px">
                <el-input type="password" v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item label-width="200px" style="width: 460px">
                <el-button type="primary" @click="submitForm">提交修改</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    import {
        updateUser
    } from '../../api/api'
    export default {
        name: '',
        data() {
            return {
                user: {}
            }
        },
        methods: {
            getParams() {
                this.user = this.$route.query.user
            },
            submitForm() {
                let user = this.user;
                updateUser(user).then(data => {
                    if (data.data.resultDesc === "SUCCESS") {
                        this.$router.back(-1);
                    }
                })
            },
            goBack() {
                this.$router.back(-1);
            }
        },
        created() {
            this.getParams();
        },
    }
</script>

<style scoped>

</style>
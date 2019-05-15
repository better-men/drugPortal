<template>
<section>
    <el-tree :data="data" show-checkbox default-expand-all node-key="path" ref="tree" highlight-current :props="defaultProps">
    </el-tree>
    <div class="" style="width: 100%;text-align: center;margin-top:20px">
        <el-button type="primary" @click="submitForm">提交修改</el-button>
        <el-button @click="goBack">取消</el-button>
    </div>
</section>
</template>

<script>
import {
    updateAuthority
} from '../../api/api'
export default {
    name: '',
    data() {
        return {
            data: [],
            defaultProps: {
                children: 'children',
                label: 'name',
                isLeaf: 'leaf'
            }
        }
    },
    methods: {
        getParams() {
            this.user = this.$route.query.user
            console.log(this.user)
        },
        submitForm() {
            console.log(this.$refs.tree.getCheckedKeys().filter(e => e !== '/'))
            let list = this.$refs.tree.getCheckedKeys().filter(e => e !== '/')
            updateAuthority({userId: this.user.userId, menuName: list.join(',')}).then(data => {
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
        this.data = this.$router.options.routes.filter((el) => {
            return !el.hidden && el.name
        })
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(this.user.role.split(','))
        })
    }
}
</script>

<style scoped>

</style>

<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="24" class="header">
				<el-col :span="10" class="logo">
					<img style="position: relative;
								top: 0;
								height: 80px;width: 80px" src="~@/assets/pet.png" />
					<label style="font-weight: 500;
								padding-left: 17px;
								position: relative;
								bottom: 33px;">宠物医院药品管理系统</label>
				</el-col>
				<el-col :span="24">
					<el-col :span="4" class="userinfo">
						<el-dropdown trigger="hover">
							<span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>
				</el-col>
			</el-col>
			<el-col :span="24" class="main">
				<aside>
					<el-menu
							default-active="$route.path"
							class="el-menu-vertical-demo"
							@open="handleOpen"
							@close="handleClose"
							:collapse="isCollapse"
							unique-opened
							router
							background-color="#f2f2f2"
							text-color="#303133"
							active-text-color="#409EFF">
						<el-menu-item @click="collapse">
							<i v-if="isCollapse" class="iconfont el-icon-erp-jiantou_liebiaoxiangyou_o"></i>
							<i v-else class="iconfont el-icon-erp-jiantou_liebiaoxiangzuo_o"></i>
							<span slot="title">列表菜单</span>
						</el-menu-item>
						<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
							<el-submenu :index="index+''" v-if="!item.leaf">
								<template slot="title">
									<i :class="item.iconCls"></i>
									<span slot="title">{{item.name}}</span>
								</template>
								<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
							</el-submenu>
							<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
								<i :class="item.iconCls"></i>
								<span slot="title">{{item.children[0].name}}</span>
							</el-menu-item>
						</template>
					</el-menu>
				</aside>
				<section class="content-container">
					<div class="grid-content bg-purple-light">
						<el-col :span="24" class="breadcrumb-container">
							<strong class="title">{{$route.name}}</strong>
						</el-col>
						<el-col :span="24" class="content-wrapper">
							<transition name="fade" mode="out-in">
								<router-view></router-view>
							</transition>
						</el-col>
					</div>
				</section>
			</el-col>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'新青工业园',
                isCollapse: false,
				sysUserName: '',
				sysUserAvatar: '',
                clientWidth: '600px',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
			//退出登录
			logout: function () {
                this.$router.push('/login');
                this.$http.get("/drug/logout").then();
			},
			//折叠导航栏
			collapse:function(){
				this.isCollapse=!this.isCollapse;
			}
		},
		mounted() {
		    var that = this;
            this.$http.get(`/drug/getCurrentUser?timestamp=${(new Date()).getTime()}`).then(function (res) {
				that.sysUserName = res.data.resultValue.userAccount;
            })
            window.onresize = function temp() {
                that.clientWidth = `${document.documentElement.clientWidth}`;
                if (parseInt(that.clientWidth)<1200){
                    that.isCollapse=true;
				}else if(parseInt(that.clientWidth)>1200){
                    that.isCollapse=false;
				}
            };
		}

		//21号下午广州--21号晚上珠海--22号凌晨西安--22号早上到汉中    汉中--西安  西安--珠海  珠海--广州
	}

</script>

<style type="text/scss" scoped lang="scss">
    @import '../styles/vars.scss';
	@import "../assets/iconfont/iconfont.css";
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
	.pageTitle{
		span {
			bottom: 11px;
			left: 10px;
			color: white;
			position: relative;
		}
		background-color: #f78a8a;
		position: absolute;
		height: 35px;
		top: 16px;
		border-radius: 10px;
		width: 160px;
		left: 58px;
		font-size: 20px;
		color: #676767;
		margin: 0 35px;
		line-height: 80px;
	}
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 80px;
			background: rgb(64, 131, 203);
			color:rgb(48, 49, 51);
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				line-height: 80px;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				padding-left:20px;
				font-size: 24px;
				color: #fff;
				position: absolute;
				top: 4px;
			}
			.logo-width{
				width:268px;
			}
			.logo-collapse-width{
				width:60px
			}
		}
		.main {
			display: flex;
			position: absolute;
			top: 80px;
			bottom: 0px;
			overflow: hidden;
			aside {
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
				}
				.tools{
					padding: 0px 21px;
					width: 160px;
					height: 60px;
					line-height: 60px;
					cursor: pointer;
					background-color: #f2f2f2;
				}
				.closeTools{
					padding: 0px 21px;
					width: 24px;
					height: 60px;
					line-height: 60px;
					cursor: pointer;
					background-color: #f2f2f2;
				}
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>

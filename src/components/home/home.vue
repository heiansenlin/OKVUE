<template>
	<div class="wrapper" style="height: 100vh;">
		<!-- 顶部导航栏 -->
		<header class="main-header">
			<router-link to="/home/index">
				<a class="logo">
					<span class="logo-lg">LOGO</span>
				</a>
			</router-link>
			<nav class="navbar navbar-static-top justify-content-end">
				<div class="navbar-custom-menu">
					<ul class="nav navbar-nav">
						<li class="dropdown user user-menu">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" style="display:block;line-height: 50px;margin-top: -7px;margin-bottom: -7px;">
								<span>个人中心</span>
							</a>
							<ul class="dropdown-menu" style="margin-top: 6px;">
								<!-- User image -->
								<li class="user-header">
									<p>
										快乐工作每一天
									</p>
								</li>
								<!-- Menu Footer-->
								<li class="user-footer">
									<div class="float-left">
										<router-link to="/home/grzl">
											<a href="#" class="btn btn-default btn-flat">个人资料</a>
										</router-link>
									</div>
									<div class="float-left">
										<router-link to="/home/sgmm">
											<a href="#" class="btn btn-default btn-flat">修改密码</a>
										</router-link>
									</div>
									<div class="float-right" @click="logout">
										<a href="#" class="btn btn-danger btn-flat">注销</a>
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</header>
		<!-- 侧边栏 -->
		<aside class="main-sidebar" style="height: calc(100vh - 50);">
			<section class="sidebar" style="height: auto;">
				<div v-for="(item,index) in menus" style="height: 40px;width: 230px;background-color: #1d272b;color: #FFFFFF;display: inline-block;">
					<div @click="men($event)" class="men1" v-if="item.jurFlag == '0'" style="margin: 10px 5px;cursor: pointer;">
						<span class="pull-left-container">
							<i class="fa fa-share pull-left"></i>
						</span>
						<span>
							{{item.jurName}}
						</span>
						<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
						</span>
					</div>
					<div v-else style="margin: 10px 5px;cursor: pointer;">
						<router-link :to="item.jurFlag" style="color:#FFFFFF;display:block;width: 100%;height: 100%;">
							<span class="pull-left-container">
								<i class="fa fa-circle-o pull-left"></i>
							</span>
							<span>
								{{item.jurName}}
							</span>
						</router-link>
					</div>
					<div class="men12" style="display: none;min-height:40px;padding-bottom: 20px;">
						<div v-for="(item2,index) in item.list" style="height: 40px;width: 230px;background-color: #1a2225;color: #FFFFFF;display: inline-block;">
							<div @click="men($event)" class="men21" v-if="item2.jurFlag == '0'" style="margin: 10px 5px;cursor: pointer;">
								<span class="pull-left-container">
									<i class="fa fa-share pull-left"></i>
								</span>
								<span>
									{{item2.jurName}}
								</span>
								<span class="pull-right-container">
									<i class="fa fa-angle-left pull-right"></i>
								</span>
							</div>
							<div v-else style="margin: 10px 5px;cursor: pointer;">
								<router-link :to="item2.jurFlag" style="color:#FFFFFF;display:block;width: 100%;height: 100%;">
									<span class="pull-left-container">
										<i class="fa fa-circle-o pull-left"></i>
									</span>
									<span>
										{{item2.jurName}}
									</span>
								</router-link>
							</div>
							<div class="men22" style="display: none;">
								<div v-for="(item3,index) in item2.list" style="height: 40px;width: 230px;background-color: #12181a;color: #FFFFFF;display: inline-block;display: none;">
									<div @click="men($event)" class="men3" v-if="item3.jurFlag == '0'" style="margin: 10px 5px;cursor: pointer;">
										<span class="pull-left-container">
											<i class="fa fa-share pull-left"></i>
										</span>
										<span>
											{{item3.jurName}}
										</span>
										<span class="pull-right-container">
											<i class="fa fa-angle-left pull-right"></i>
										</span>
									</div>
									<div v-else style="margin: 10px 5px;cursor: pointer;">
										<router-link :to="item3.jurFlag" style="color:#FFFFFF;display:block;width: 100%;height: 100%;">
											<span class="pull-left-container">
												<i class="fa fa-circle-o pull-left"></i>
											</span>
											<span>
												{{item3.jurName}}
											</span>
										</router-link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- /.sidebar -->
		</aside>
		<!-- 内容 -->
		<div class="content-wrapper" style="height: calc(100vh - 50);">
			<router-view />
		</div>
		<footer class="main-footer">
			<div class="pull-right hidden-xs">
				<b>
					<font style="vertical-align: inherit;">
						<font style="vertical-align: inherit;">版本</font>
					</font>
				</b>
				<font style="vertical-align: inherit;">
					<font style="vertical-align: inherit;"> 2.4.0
					</font>
				</font>
			</div>
			<strong>
				<font style="vertical-align: inherit;">
					<font style="vertical-align: inherit;">版权所有©2014-2016 </font>
				</font><a href="https://adminlte.io">
					<font style="vertical-align: inherit;">
						<font style="vertical-align: inherit;">Almsaeed Studio</font>
					</font>
				</a>
				<font style="vertical-align: inherit;">
					<font style="vertical-align: inherit;">。</font>
				</font>
			</strong>
			<font style="vertical-align: inherit;">
				<font style="vertical-align: inherit;">版权所有。
				</font>
			</font>
		</footer>
	</div>
</template>

<script>
	export default {
		name: 'home',
		data() {
			return {
				menus: []
			}
		},
		created: function() {
			// 获取当前登陆人权限
			this.authority();
		},
		// 		beforeMount:function(){
		// 			this.$forceUpdate();
		// 		},
		methods: {
			clickto: function(o) {
				this.$router.replace({
					path: '/home/' + o
				});
			},
			authority: function() {
				var obj = this;
				obj.$http({
					method: 'get',
					url: '/authority/authority',
					data: {}
				}).then((res) => {
					if (res.data.success) {
						obj.$data.menus = res.data.data;
						// obj.jur(res.data.data);
					} else {
						obj.$data.menus = [];
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			logout: function() {
				let token = window.localStorage.getItem('LTokenD');
				if (token && token != '') {
					window.localStorage.clear();
				}
				this.$router.push({
					path: '/'
				});
			},
			jur: function(obj) {
				var a = '';
				obj.forEach(function(e, index) {
					a += e.jurFlag + ",";
					e.list.forEach(function(e2, index2) {
						a += e2.jurFlag + ",";
						e2.list.forEach(function(e3, index3) {
							a += e3.jurFlag + ",";
						});
					});
				});
				window.localStorage.setItem('role', a);
			},
			men: function(obj) {
				var a = obj.currentTarget.nextElementSibling.style.display;
				a == 'none' ? obj.currentTarget.nextElementSibling.style.display = 'block' : obj.currentTarget.nextElementSibling.style
					.display = 'none';
			}
		}
	}
</script>

<style>
	.btn.focus,
	.btn:focus {
		outline: 0;
		-webkit-box-shadow: 0 0 0 0rem rgba(0, 0, 0, 0);
		box-shadow: 0 0 0 0rem rgba(0, 0, 0, 0);
	}
</style>

<template>
	<div class="container-fluid" style="padding: 0;min-height: 100vh;">
		<!-- fixed-top 固定在头部 -->
		<nav class="navbar navbar-expand-sm bg-primary navbar-dark" style="padding: 0;">
			<img class="navbar-brand" src="../../assets/logo.png" alt="Logo" style="width:30px;" @click="clickto('')">
			<div class="navbar-custom-menu ml-auto" style="height: 30px;">
				<ul class="navbar-nav" style="height: 30px;">
					<li class="nav-item active" style="height: 30px;">
						<div class="btn-group" style="height: 30px;">
							<label class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" style="cursor:pointer;font-size: 11px;height: 30px;">
								<span class="caret">个人中心&nbsp;&nbsp;&nbsp;</span>
							</label>
							<div class="dropdown-menu dropdown-menu-right" style="cursor: hand;font-size: 11px;">
								<a class="dropdown-item" href="#" @click="clickto('grzx')">个人中心</a>
								<a class="dropdown-item" href="#" @click="clickto('xgmm')">修改密码</a>
								<a class="dropdown-item" href="#" @click="logout">注销</a>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</nav>
		<!-- background-color: #222d32; -->
		<div style="width: 230px;padding: 0;height: calc(100vh - 40px);">
			<div></div>
		</div>
		<!-- <div style="width: 230px;padding: 0;height: calc(100vh - 40px);">
			<div style="width: 230px;height: calc(100vh - 40px);background-color: #222d32;">
				<div :style="menuback" class="menclick" tabindex="0" style="width: 230px;height: 44px;border:1px solid #242424;"
				 v-for="(item,index) in menus" v-if="item.jurType == 0">
					<span v-if="item.jurFlag == '0'" class="text-center" style="cursor: pointer; color:#8aa4af;display:block;width: 230px;height: 44px;line-height: 44px;text-decoration: none;font-size: 14px;">
						{{item.jurName}}
						<span v-if="item.list.length > 0" style="float: right;">&#62;&nbsp;&nbsp;</span>
					</span>
					<router-link v-else class="text-center" style="color:#8aa4af;display:block;width: 230px;height: 44px;line-height: 44px;text-decoration: none;font-size: 14px;"
					 :to="item.jurFlag">
						{{item.jurName}}
					</router-link>
					<div class="menc" style="width: 230px;background-color: #222d32;">
						<div :style="menuback" style="width: 230px;height: 44px;border:1px solid #242424;" v-for="(item2,index) in item.list"
						 v-if="item2.jurType == 0">
							<span v-if="item2.jurFlag == ''" class="text-center" style="cursor: pointer; color:#8aa4af;display:block;width: 230px;height: 44px;line-height: 44px;text-decoration: none;font-size: 14px;">
								{{item2.jurName}}
								<span v-if="item2.list.length > 0" style="float: right;">&#62;&nbsp;&nbsp;</span>
							</span>
							<router-link v-else class="text-center" style="color:#8aa4af;display:block;width: 230px;height: 44px;line-height: 44px;text-decoration: none;font-size: 14px;"
							 :to="item2.jurFlag">
								{{item2.jurName}}
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div> -->
		<div style="width: calc(100vw - 230px);height: calc(100vh - 40px);position: absolute;top:40px;left:230px;padding: 10px 5px;">
			<router-view />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'home',
		data() {
			return {
				menuback: {
					backgroundImage: 'url(' + require('../../assets/img/timg.jpg') + ')',
					backgroundSize: '230 44'
				},
				menus: []
			}
		},
		created: function() {
			// 获取当前登陆人权限
			this.authority();
		},
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
						var a = '';
						obj.$data.menus.forEach(function(e, index) {
							if (e.jurType == '0') {
								a += e.jurFlag + ",";
								if (e.list.length > 0) {
									a += obj.jur(e.list, a);
								}
							}
						});
						window.localStorage.setItem('role', a);
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
			jur: function(obj, a) {
				var ob = this;
				obj.forEach(function(e, index) {
					a += e.jurFlag + ",";
					if (e.list.length > 0) {
						a += ob.jur(e, a);
					}
				});
				return a;
			}
		}
	}
</script>

<style>
	/* .menc {
		display: none;
	} */

	/* .menclick:focus .menc {
		display: block;
	} */
</style>

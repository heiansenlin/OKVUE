<template>
	<div :style="loginBack" class="row align-items-center justify-content-center">
		<div class="col-sm-2 form-horizontal">
			<div class="form-group">
				<!-- <h5>登陆</h5> -->
			</div>
			<div class="form-group">
				<input type="text" class="form-control" id="account" v-model="account" />
			</div>
			<div class="form-group">
				<input type="password" class="form-control" id="password" v-model="password" />
			</div>
			<div class="form-group">
				<input type="button" class="btn btn-success form-control" value="登陆" @click="login" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				loginBack: {
					backgroundImage: 'url(' + require('../assets/loginback.jpeg') + ')',
					width: '100vw',
					height: '100vh',
					backgroundSize: '100vw 100vh',
					margin: '0 !important'
				},
				account: 'weihuzu',
				password: '123456'
			}
		},
		methods: {
			login: function() {
				var obj = this;
				obj.$http({
					method: 'post',
					url: '/login/login',
					data: {
						account: obj.account,
						password: obj.password
					}
				}).then((res) => {
					if (res.data.success) {
						window.localStorage.setItem('LTokenD', res.data.data);
						this.$router.push({
							path: '/home'
						});
					} else {
						alert(res.data.message);
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

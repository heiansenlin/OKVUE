<template>
	<div>
		<button type="button" class="btn btn-block btn-primary btn-flat" @click="cshqx">初始化权限</button>
	</div>
</template>

<script>
	export default {
		name: 'cshqx',
		data() {
			return {}
		},
		created: function() {},
		methods: {
			cshqx: function() {
				var obj = this;
				obj.$http({
					method: 'get',
					url: '/jurisdiction/setJurs',
					data: {}
				}).then((res) => {
					alert(res.data.message);
				}).catch(function(error) {
					alert('错误' + error);
				});
			}
		}
	}
</script>

<style>
</style>

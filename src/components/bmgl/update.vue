<template>
	<div class="box-body">
		<div class="form-group">
			<label for="exampleInputEmail1">部门名称</label>
			<input type="text" v-model="depName" class="form-control" id="exampleInputEmail1" placeholder="部门名称">
		</div>
		<div class="form-group">
			<button type="button" class="btn btn-primary" @click="save">确定</button>
			<button type="button" class="btn btn-outline pull-left" data-dismiss="modal">
				<font style="vertical-align: inherit;">
					<font style="vertical-align: inherit;">关闭</font>
				</font>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				depName: '',
				uuid: '',
				version: 0
			}
		},
		created: function() {},
		methods: {
			getData: function(uuid) {
				var obj = this;
				obj.$http({
					method: 'get',
					url: '/department/department/' + uuid,
					data: {}
				}).then((res) => {
					if (res.data.success) {
						obj.$data.uuid = res.data.data.uuid;
						obj.$data.depName = res.data.data.depName;
						obj.$data.version = res.data.data.version;
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			save: function() {
				var obj = this;
				obj.$http({
					method: 'put',
					url: '/department/department/' + obj.$data.uuid,
					data: {
						depName: this.depName,
						version: obj.$data.version
					}
				}).then((res) => {
					alert(res.data.message);
					if (res.data.success) {
						obj.$data.depName = '';
						this.$parent.page();
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
		}
	}
</script>

<style>
</style>

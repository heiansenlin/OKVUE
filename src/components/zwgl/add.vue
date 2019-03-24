<template>
	<div class="box-body">
		<div class="form-group">
			<label for="exampleInputEmail1">部门名称</label>
			<select v-model="depName" class="form-control" id="exampleInputEmail1">
				<option value="">请选择</option>
				<option v-for="(item,index) in deps" :value="item.uuid">{{item.depName}}</option>
			</select>
		</div>
		<div class="form-group">
			<label for="exampleInputEmail1">职位名称</label>
			<input type="text" v-model="posName" class="form-control" id="exampleInputEmail1" />
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
				deps: [],
				depName: '',
				posName: ''
			}
		},
		created: function() {
			this.getDepDatas();
		},
		methods: {
			getDepDatas: function() {
				var obj = this;
				obj.$http({
					method: 'get',
					url: '/department//find/all',
					data: {}
				}).then((res) => {
					if (res.data.success) {
						obj.$data.deps = res.data.data;
					} else {
						obj.$data.deps = [];
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			save: function() {
				var obj = this;
				obj.$http({
					method: 'post',
					url: '/position/position',
					data: {
						'departmentModel': {
							"uuid": this.depName
						},
						'posName': this.posName,
					}
				}).then((res) => {
					alert(res.data.message);
					if (res.data.success) {
						obj.$data.depName = '';
						obj.$data.posName = '';
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

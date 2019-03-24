<template>
	<div class="box-body">
		<div class="form-group">
			<label for="exampleInputEmail1">姓名</label>
			<input type="text" v-model="userName" class="form-control" id="exampleInputEmail1" placeholder="姓名">
		</div>
		<div class="form-group">
			<label for="exampleInputEmail1">部门</label>
			<select v-model="depName" @change="getPos" class="form-control" id="exampleInputEmail1" placeholder="部门">
				<option value="">请选择</option>
				<option v-for="(item,index) in depNames" :value="item.uuid">{{item.depName}}</option>
			</select>
		</div>
		<div class="form-group">
			<label for="exampleInputEmail1">职位</label>
			<select v-model="posName" class="form-control" id="exampleInputEmail1" placeholder="职位">
				<option value="">请选择</option>
				<option v-for="(item,index) in posNames" :value="item.uuid">{{item.posName}}</option>
			</select>
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
				userName: '',
				depName: '',
				depNames: [],
				posName: '',
				posNames: [],
				ydatas: [],
				uuid: ''
			}
		},
		created: function() {
			this.getPosDatas();
		},
		methods: {
			getPosDatas: function() {
				var obj = this;
				obj.$http({
					method: 'get',
					url: '/position/find/all',
					data: {}
				}).then((res) => {
					if (res.data.success) {
						var a = [];
						obj.$data.ydatas = res.data.data;
						res.data.data.forEach(function(e, index) {
							var i = 0;
							a.forEach(function(e2, index2) {
								if (e.departmentModel.uuid == e2.uuid) {
									i++;
								}
							});
							if (i == 0) {
								a.push(e.departmentModel);
							}
						});
						obj.$data.depNames = a;
					} else {
						obj.$data.depNames = [];
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			getPos: function() {
				var obj = this;
				obj.$data.posNames = [];
				obj.$data.posName = '';
				if (obj.$data.depName != '') {
					var a = [];
					obj.$data.ydatas.forEach(function(e, index) {
						if (obj.$data.depName == e.departmentModel.uuid) {
							a.push(e);
						}
					});
					obj.$data.posNames = a;
				}
			},
			getData: function(o) {
				var obj = this;
				obj.$http({
					method: 'get',
					url: '/account/account/' + o,
					data: {}
				}).then((res) => {
					if (res.data.success) {
						obj.$data.uuid = res.data.data.uuid;
						obj.$data.userName = res.data.data.user.name;
						obj.$data.depName = res.data.data.departmentModel.uuid;
						obj.getPos();
						obj.$data.posName = res.data.data.positionModel.uuid;
					} else {
						alert(res.data.message);
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			save: function() {
				var obj = this;
				obj.$http({
					method: 'put',
					url: '/account/account/' + obj.$data.uuid,
					data: {
						user: {
							name: this.userName
						},
						departmentModel: {
							uuid: this.depName
						},
						positionModel: {
							uuid: this.posName
						}
					}
				}).then((res) => {
					alert(res.data.message);
					if (res.data.success) {
						obj.$data.account = '';
						obj.$data.password = '';
						obj.$data.userName = '';
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

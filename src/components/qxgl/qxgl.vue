<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-6" style="border-bottom: 1px solid aqua;">
				<h5>部门/职位</h5>
			</div>
			<div class="col-sm-6" style="border-bottom: 1px solid aqua;">
				<h5>权限</h5>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<table class="table table-hover">
					<tbody>
						<tr>
							<th>#</th>
							<th>部门</th>
							<th>职位</th>
							<th>操作</th>
						</tr>
						<tr v-for="(item,index) in ydatas">
							<td>{{index+1}}</td>
							<td>{{item.departmentModel.depName}}</td>
							<td>{{item.posName}}</td>
							<td>
								<button type="button" class="btn btn-danger btn-sm" @click="jurisdiction(item.uuid)">
									管理权限
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="col-sm-6">
				<div class="col-sm-12" v-for="(item,index) in jurs" style="margin-top: 5px;">
					<div class="row">
						<div class="col-sm-3">{{item.jurName}}</div>
						<div class="col-sm-3">{{item.jurType == '0' ? '菜单' : '按钮'}}</div>
						<div class="col-sm-3">{{item.jurFlag}}</div>
						<div class="col-sm-3" v-if="item.isy != null"><input type="button" value="取消" class="btn btn-danger btn-sm"
							 @click="setJur(item.uuid)" /></div>
						<div class="col-sm-3" v-else><input type="button" value="授权" class="btn btn-primary btn-sm" @click="setJur(item.uuid)" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'qxgl',
		data() {
			return {
				ydatas: [],
				posId: null,
				jurs: []
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
						obj.$data.ydatas = res.data.data;
					} else {
						obj.$data.ydatas = [];
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			jurisdiction: function(o) {
				var obj = this;
				obj.$data.jurs = [];
				obj.$data.posId = o;
				obj.$http({
					method: 'get',
					url: '/jurisdiction/findByPosId/' + o,
					data: {}
				}).then((res) => {
					if (res.data.success) {
						obj.$data.jurs = res.data.data;
					} else {
						obj.$data.jurs = [];
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			setJur: function(o) {
				var obj = this;
				var p = obj.$data.posId;
				obj.$http({
					method: 'post',
					url: '/authority/authority',
					data: {
						positionModel: {
							uuid: p
						},
						jurisdictionModel: {
							uuid: o
						}
					}
				}).then((res) => {
					if (res.data.success) {
						obj.jurisdiction(p);
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			}
		}
	}
</script>

<style>
</style>

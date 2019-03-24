<template>
	<div class="content">
		<div class="row">
			<div class="col-sm-12">
				<div class="card">
					<div class="card-header">
						<div class="box-tools pull-right">
							<div class="input-group input-group-sm" style="width: 300px;">
								<input type="text" v-model="name" class="form-control" placeholder="姓名">
								<div class="input-group-btn">
									<button type="button" class="btn btn-primary btn-sm" @click="page()">
										<i class="fa fa-search"></i>
									</button>
									<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#add">
										<i class="fa fa-plus"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div class="card-body">
						<table class="table table-hover">
							<tbody>
								<tr>
									<th>#</th>
									<th>账号</th>
									<th>姓名</th>
									<th>部门</th>
									<th>职位</th>
									<th>操作</th>
								</tr>
								<tr v-for="(item,index) in datas">
									<td>{{index+1}}</td>
									<td>{{item.account}}</td>
									<td>{{item.user.name}}</td>
									<td>{{item.departmentModel.depName}}</td>
									<td>{{item.positionModel.posName}}</td>
									<td>
										<button type="button" class="btn btn-danger btn-sm" @click="remove(item.uuid)">
											<i class="fa fa-close"></i>
										</button>
										<button type="button" class="btn btn-warning btn-sm" @click="restPass(item.uuid)">
											重置密码
										</button>
										<button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#update" @click="update(item.uuid)">
											<i class="fa fa-pencil"></i>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<!-- 新增弹窗 -->
		<div class="modal modal-info fade" id="add" style="display: none;">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">×</span></button>
					</div>
					<div class="modal-body">
						<bmadd></bmadd>
					</div>
				</div>
			</div>
		</div>
		<!-- 修改弹窗 -->
		<div class="modal modal-info fade" id="update" style="display: none;">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">×</span></button>
					</div>
					<div class="modal-body">
						<bmupdate ref="update"></bmupdate>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import bmadd from '@/components/yggl/add.vue';
	import bmupdate from '@/components/yggl/update.vue';

	export default {
		name: 'yggl',
		data() {
			return {
				name: '',
				datas: [],
				pageNow: 1
			}
		},
		components: {
			bmadd,
			bmupdate
		},
		created: function() {
			// 获取所有的部门
			this.page();
		},
		methods: {
			page: function() {
				this.$data.pageNow = 1;
				this.getDatas();
			},
			getDatas: function() {
				var obj = this;
				obj.$http({
					method: 'post',
					url: '/account/page/' + obj.$data.pageNow,
					data: {
						'user': {
							'name': this.name
						}
					}
				}).then((res) => {
					if (res.data.success) {
						obj.$data.datas = res.data.data.content;
					} else {
						obj.$data.datas = [];
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			// 删除
			remove: function(uuid) {
				var obj = this;
				obj.$http({
					method: 'delete',
					url: '/account/account/' + uuid,
					data: {}
				}).then((res) => {
					alert(res.data.message);
					if (res.data.success) {
						obj.page();
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			// 修改
			update: function(uuid) {
				this.$refs.update.getData(uuid);
			},
			// 重置密码
			restPass: function(uuid) {
				var obj = this;
				obj.$http({
					method: 'get',
					url: '/account/rest/' + uuid,
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

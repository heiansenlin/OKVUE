<template>
	<div class="content">
		<div class="row">
			<div class="col-sm-12">
				<div class="card">
					<div class="card-header">
						<div class="box-tools pull-right">
							<div class="input-group input-group-sm" style="width: 300px;">
								<input type="text" v-model="depName" class="form-control" placeholder="部门名称">
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
									<th>部门名称</th>
									<th>操作</th>
								</tr>
								<tr v-for="(item,index) in datas">
									<td>{{index+1}}</td>
									<td>{{item.depName}}</td>
									<td>
										<button type="button" class="btn btn-danger btn-sm" @click="remove(item.uuid)">
											<i class="fa fa-close"></i>
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
	import bmadd from '@/components/bmgl/add.vue';
	import bmupdate from '@/components/bmgl/update.vue';

	export default {
		name: 'bmgl',
		data() {
			return {
				depName: '',
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
					url: '/department/page/' + obj.$data.pageNow,
					data: {
						depName: this.depName
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
					url: '/department/department/' + uuid,
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
			}
		}
	}
</script>

<style>
</style>

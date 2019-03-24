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
									<th>添加人</th>
									<th>添加日期</th>
									<th>操作</th>
								</tr>
								<tr v-for="(item,index) in datas">
									<td>{{index+1}}</td>
									<td>{{item.accountModel.user.name}}</td>
									<td>{{item.sysTime}}</td>
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
			<div class="modal-dialog" style="max-width:100%;margin: 0;height: 100%;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">×</span></button>
					</div>
					<div class="modal-body">
						<add></add>
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
						<update ref="update"></update>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import add from '@/components/tags/add.vue';
	import update from '@/components/tags/update.vue';

	export default {
		name: 'tags',
		data() {
			return {
				name: '',
				datas: [],
				pageNow: 1
			}
		},
		components: {
			add,
			update
		},
		created: function() {
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
					url: '/tags/page/' + obj.$data.pageNow,
					data: {
						'tagsBody': ''
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
					url: '/tags/tags/' + uuid,
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
				// this.$refs.update.getData(uuid);
			},
		}
	}
</script>

<style>
</style>

<template>
	<div class="content">
		<div class="row">
			<div class="col-sm-12">
				<div class="card">
					<div class="card-header">
						<div class="box-tools pull-right">
							<div class="input-group input-group-sm" style="width: 300px;">
								<input type="text" v-model="phone" class="form-control" placeholder="电话">
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
									<th>姓名</th>
									<th>地址</th>
								</tr>
								<tr>
									<td class="name"></td>
									<td class="address"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header">
            <div class="box-tools">
              <div class="input-group input-group-sm">
                <h3> &nbsp&nbsp&nbsp&nbsp选择商品:&nbsp&nbsp </h3>
                <select class="goodsId pull-left">
                  <option value="">请选择商品</option>
                  <option v-for="(item,index) in goods":value="item.uuid">{{item.cname}}</option>
                </select>
                <h3> &nbsp&nbsp&nbsp&nbsp商品数量:&nbsp&nbsp </h3>
                <input name="num" class="num"/>
                <input name="accountId" hidden="hidden" class="accountId"/>
                <div class="input-group-btn">
                  <button type="button" class="btn btn-primary btn-sm" @click="add()">
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
                <th>姓名</th>
                <th>地址</th>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

	export default {
		name: 'order',
		data() {
			return {
				name: '',
				datas: [],
        goods:[]
			}
		},
		components: {
		},
		created: function() {
			// 获取所有的部门
			this.page();
		},
		methods: {
			page: function() {
				this.getDatas();
				this.getGoods();
			},
			getDatas: function() {
				var obj = this;
				obj.$http({
					method: 'post',
					url: '/account/getOneByPhone',
          data:{
            'user': {
              'phone':this.phone
            }
          }
				}).then((res) => {
					if (res.data.success) {
						$(".name").text('');
						$(".address").text('');
						$(".accountId").text('');
						$(".name").text(res.data.data.user.name);
						$(".address").text(res.data.data.user.address);
						$(".accountId").text(res.data.data.uuid);
					} else {
						obj.$data.datas = [];
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
      getGoods:function(){
        var obj = this;
        obj.$http({
          method: 'get',
          url: '/goods/findAllByBusId',
        }).then((res) => {
          if (res.data.success) {
            obj.$data.goods = res.data.data;
            console.log(res.data.data);
          } else {
            obj.$data.datas = [];
          }
        }).catch(function(error) {
          alert('错误' + error);
        });
      }
		}
	}
	function add() {
    $.ajax({
      url:"/order/order",    //请求的url地址
      async:true,//请求是否异步，默认为异步，这也是ajax重要特性
      data:{"spid":$(".goodsId").val(),"sl":$(".num").val(),"accountId":$(".accountId").val()},    //参数值
      type:"post",   //请求方式
      success:function(req){
        //请求成功时处理
        console.log("456852")
      },
      error:function(){
        //请求出错处理
        alert('错误');
      }
    });
  }
</script>

<style>
</style>

//- The Vue build version to load with the `import` command
//- (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/skin-blue.min.css'
import './assets/font-awesome/css/font-awesome.min.css'

import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'admin-lte/dist/js/adminlte.min.js'

Vue.config.productionTip = false

//- 引入服务器地址
import serverPath from './assets/js/serverPath.js'

//- 单独设置服务器地址
Vue.prototype.$p = serverPath.serverPath;
//- 声明变量
Vue.prototype.$http = axios
Vue.config.productionTip = true
//- 设置全局请求前缀
axios.defaults.baseURL = 'http://' + serverPath.serverPath
//- 设置全局超时时间
axios.defaults.timeout = 6000 * 60;
axios.interceptors.request.use(function(config) {
	var token = window.localStorage.getItem('LTokenD');
	if (!token || token == '') {
		router.replace({
			path: '/'
		})
	} else {
		// 设置全局请求头部信息
		config.headers.common['LTokenD'] = token;
	}
	return config;
}, function(error) {
	return Promise.reject(error);
});

//- 拦截器
axios.interceptors.response.use(function(response) { // 对响应数据做点什么
	if (!response.data.success) {
		if (response.data.message == 'logout') {
			response.data.message = '请从新登录';
			router.push({
				path: '/'
			});
		}
	}
	return response
}, function(error) { //-  对响应错误做点什么
	if (error.message == 'Network Error') {
		return Promise.reject("服务器挂机");
	} else if (error.message == 'timeout of 6000ms exceeded') {
		return Promise.reject("请求服务器超时");
	} else {
		return Promise.reject(error);
	}
});
//-  路由拦截器
router.beforeEach((to, from, next) => {
	// 获取自定义属性
	// console.log(to.matched.some(record => record.meta.isLogin));
	if (to.matched.some(record => record.meta.isLogin)) {
		var token = window.localStorage.getItem('LTokenD');
		if (!token || token == '') {
			router.replace({
				path: '/'
			})
		} else {
			to.matched.forEach(function(e, index) {
// 				var a = e.meta.isJur;
// 				if (a != undefined) {
// 					var r = window.localStorage.getItem('role');
// 					if (r) {
// 						if (r.search(a) != -1) {
// 							next();
// 						} else {
// 							router.replace({
// 								path: '/403'
// 							})
// 						}
// 					} else {
// 						next();
// 					}
// 				} else {
					next();
				// }
			});
			next();
		}
	} else {
		next();
	}
});
new Vue({
	router,
	render: h => h(App)
}).$mount('#app');

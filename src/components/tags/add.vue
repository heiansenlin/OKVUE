<template>
	<div class="goods-editor">
		<!-- 工具栏容器 -->
		<div id="toolbar-container"></div>

		<!-- 编辑器容器 -->
		<div id="editor">
			<!-- <p>This is the initial editor content.</p> -->
		</div>
	</div>
</template>

<script>
	import CKEditor from '@ckeditor/ckeditor5-build-inline/build/ckeditor.js'
	import '@ckeditor/ckeditor5-build-inline/build/translations/zh-cn'
	export default {
		data() {
			return {
				editor: null, // 编辑器实例
			}
		},
		mounted() {
			this.initCKEditor()
		},
		methods: {
			initCKEditor() {
				CKEditor.create(document.querySelector('#editor'), {
					language: 'zh-cn',
					ckfinder: {
						uploadUrl: '/admin/Upload/uploadUrl'
						//后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
					},
					// toolbar: "full"
				}).then(editor => {
					const toolbarContainer = document.querySelector('#toolbar-container');
					toolbarContainer.appendChild(editor.ui.view.toolbar.element);
					this.editor = editor //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
				}).catch(error => {
					console.error(error);
				});
			}
		}
	}
</script>

<style>
</style>

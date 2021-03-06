import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import cookies from 'vue-cookies'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/js/languages/zh_cn.js'
import 'froala-editor/js/plugins.pkgd.min.js'
import VueFroala from 'vue-froala-wysiwyg'
import Velocity from 'velocity-animate'
import './tools/dialogDrag.js'
import * as qiniu from 'qiniu-js'
Vue.use(cookies)
Vue.use(ElementUI);
Vue.use(VueFroala)

import http from './http'; //此处问http文件的路径
Vue.prototype.$axios = http;


Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
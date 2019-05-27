import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import axios from "axios";
import qs from 'qs'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.prototype.$qs = qs;
Vue.prototype.$http = axios;
Vue.config.debug = true;
Vue.config.productionTip = false
// Vue.prototype.$config = new VueConfig();

const router = new VueRouter({
    routes
});
// router.beforeEach((to, from, next) => {
//     let user = localStorage.getItem('user')
//     if (to.path === '/login') {
//         next()
//     } else if (to.path) {
//         if (user && user.indexOf(to.path) > -1) {
//             next()
//         } else {
//             next({
//                 path: '/login'
//             })
//             return ''
//         }
//     } else {
//         next()
//     }
//
// })
axios.defaults.withCredentials = true;
axios.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest';


Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(),
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

window.JsonObjectClone = function(obj, ignorePropertyNames) {
    if (obj) {
        return JSON.parse(JSON.stringify(obj, function(key, value) {
            if (key == "$$hashKey") {
                return undefined;
            }
            if (value == null) {
                return value;
            }
            if (typeof value == 'function') {
                return undefined;
            }
            if (typeof value == 'object') {
                if (value.nodeType == 1 && value.nodeName != null && value.tagName != null) {
                    return undefined;
                }
            }
            if (ignorePropertyNames && ignorePropertyNames.length > 0) {
                for (var i = 0; i < ignorePropertyNames.length; i++) {
                    if (key == ignorePropertyNames[i]) {
                        return undefined;
                    }
                }
            }

            return value;
        }));
    } else {
        return obj;
    }
};

window.isNullOrEmpty = function(val) {
    if (val === null || val === undefined) return true;
    else if (val === true) return true;
    else if (val === false) return false;
    else if (typeof val == 'string') {
        return val.length == 0 || val == '\t' || val == '\r' || val == '\n' || val == '\r\n' || val == '\n\r';
    } else {
        return false;
    }
};

router.beforeEach((to, from, next) => {
    //NProgress.start();
    if (to.path == '/login') {
        next()
    } else {
        axios.get("/drug/getCurrentUser").then(function(res) {
            let user = null;
            let menuInfo = null
            if (!isNullOrEmpty(res.data.resultValue.userAccount)) {
                localStorage.setItem('user', JSON.stringify(res.data.resultValue))
                user = res.data.resultValue.userAccount;
            }
            axios.get('/drug/user/list').then((data) => {
                menuInfo = data.data.resultValue.find(el => el.userId === res.data.resultValue.userId).role
                localStorage.setItem('menuInfo', menuInfo)
                if (!user && to.path != '/login') {
                    next({
                        path: '/login'
                    })
                } else {
                    if ((menuInfo && menuInfo.indexOf(to.path) > -1) || (to.path.indexOf('Edit') > -1 || to.path.indexOf('Insert') > -1)) {
                        next()
                    } else {
                        // Vue.message('该页面无法访问！')
                        next({
                            path: from.path
                        })
                        return ''
                    }
                }
            })
        }).catch(function(error) {
            next({
                path: '/login'
            })
        });
    }
})


Array.prototype.del = function(index) {
    if (isNaN(index) || index >= this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[index]) {
            this[n++] = this[i];
        }
    }
    this.length -= 1;
};

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})

import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import UserCenter from '@/components/user/UserCenter'
import DataCenter from '@/components/data/DataCenter'
import Settings from '@/components/setting/Settings'

Vue.use(Router);

//配置路由
const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            redirect: '/welcome',
            children: [{
                path: '/welcome',
                component: Welcome
            },{
                path: '/userCenter',
                component: UserCenter
            },{
                path: '/dataCenter',
                component: DataCenter
            },{
                path: '/settings',
                component: Settings
            }]
        },
        {
            path: '/helloworld',
            name: 'HelloWorld',
            component: HelloWorld
        },
    ]
});

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to  将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数, 表示放行
    // next() 放行 next('/login') 强制跳转
    if (to.path === '/login') return next()
    //先获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()

});

export default router;
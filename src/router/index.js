import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import login from '../views/login'
import siae from '../views/siae'
import backstage from '../views/backstage'
import ui from '../views/ui'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: '/siae',
        name: 'siae',
        redirect: '/siae/homePage',
        component: siae,
        children: [{
                path: 'homePage',
                name: 'homePage',
                component: () =>
                    import ('../views/siae/homePage.vue'),
            },
            {
                path: 'joinIn',
                name: 'joinIn',
                component: () =>
                    import ('../views/siae/joinIn.vue'),
            },
            {
                path: 'notice',
                name: 'notice',
                component: () =>
                    import ('../views/siae/notice.vue'),
            },
            {
                path: 'dataDownload',
                name: 'dataDownload',
                component: () =>
                    import ('../views/siae/dataDownload.vue'),
            },
        ]
    },
    {
        path: '/ui',
        name: 'ui',
        component: ui,
    }, {
        path: '/backstage',
        name: 'backstage',
        redirect: '/backstage/homePage',
        component: backstage,
        children: [{
                path: 'homePage',
                name: 'homePage',
                component: () =>
                    import ('../views/backstage/homePage.vue')
            },
            {
                path: 'menu',
                name: 'menu',
                redirect: '/backstage/menu/nav',
                component: () =>
                    import ('../views/backstage/menu.vue'),
                children: [{
                        path: 'nav',
                        name: 'nav',
                        component: () =>
                            import ('../views/backstage/menu/nav.vue'),
                    },
                    {
                        path: 'role',
                        name: 'role',
                        component: () =>
                            import ('../views/backstage/menu/role.vue'),
                    },

                ]
            },
            {
                path: 'notice',
                name: 'notice',
                redirect: '/backstage/notice/manager',
                component: () =>
                    import ('../views/backstage/notice.vue'),
                children: [{
                        path: 'manager',
                        name: 'manager',
                        component: () =>
                            import ('../views/backstage/notice/manage.vue')
                    }, {
                        path: 'edit',
                        name: 'edit',
                        component: () =>
                            import ('../views/backstage/notice/edit.vue')
                    },
                    {
                        path: 'sort',
                        name: 'sort',
                        component: () =>
                            import ('../views/backstage/notice/sort.vue')
                    }
                ]
            },

            {
                path: 'initiation',
                name: 'initiation',
                component: () =>
                    import ('../views/backstage/initiation.vue')
            },
            {
                path: 'member',
                name: 'member',
                component: () =>
                    import ('../views/backstage/member.vue')
            },
            {
                path: 'resource',
                name: 'resource',
                component: () =>
                    import ('../views/backstage/resource.vue')
            },
            {
                path: 'book/statistics',
                component: () =>
                    import ('../views/backstage/book/Statistics.vue')
            },
            {
                path: 'book/bookMenu',
                component: () =>
                    import ('../views/backstage/book/Bookmenu.vue')
            },
            {
                path: 'book/category',
                component: () =>
                    import ('../views/backstage/book/Category.vue')
            },
            {
                path: 'book/entry',
                component: () =>
                    import ('../views/backstage/book/Entry.vue')
            },
            {
                path: 'book/record',
                component: () =>
                    import ('../views/backstage/book/Record.vue')
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
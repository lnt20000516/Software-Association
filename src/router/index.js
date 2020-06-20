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
                path: 'manage',
                name: 'manage',
                redirect: 'manage/admin',
                component: () =>
                    import ('../views/backstage/manage.vue'),
                children: [{
                        path: 'admin',
                        name: 'admin',
                        component: () =>
                            import ('../views/backstage/manage/admin.vue'),
                    },
                    {
                        path: 'position',
                        name: 'position',
                        component: () =>
                            import ('../views/backstage/manage/position.vue'),
                    }
                ]

            }, {
                path: 'system',
                name: 'system',
                redirect: 'system/log',
                component: () =>
                    import ('../views/backstage/system.vue'),
                children: [{
                    path: 'log',
                    name: 'log',
                    component: () =>
                        import ('../views/backstage/system/log.vue'),
                }]
            },
            {
                path: 'resource',
                name: 'resource',
                redirect: 'resource/upload',
                component: () =>
                    import ('../views/backstage/resource.vue'),
                children: [{
                        path: 'secretKey',
                        name: 'secretKey',
                        component: () =>
                            import ('../views/backstage/resource/secretKey.vue'),
                    },
                    {
                        path: 'upload',
                        name: 'upload',
                        component: () =>
                            import ('../views/backstage/resource/upload.vue'),
                    },
                ]
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
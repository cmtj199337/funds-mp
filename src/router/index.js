import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '概览', icon: 'dashboard' }
    }]
  },

  {
    path: '/content',
    component: Layout,
    redirect: '/content/article',
    name: 'Content',
    meta: { title: '内容管理', icon: 'form' },
    children: [
      {
        path: '/content/article',
        name: 'Article',
        component: () => import('@/views/content/article'),
        meta: { title: '文档', icon: 'form' }
      },
      {
        path: '/content/articlecreate',
        name: 'ArticleCreate',
        component: () => import('@/views/content/articleCreate'),
        meta: { title: '新文档' },
        hidden: true 
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/catalog',
    name: 'Setting',
    meta: { title: '设置', icon: 'example' },
    children: [
      {
        path: '/setting/catalog',
        name: 'Catalog',
        component: () => import('@/views/setting/catalog'),
        meta: { title: '目录', icon: 'example' }
      },
      {
        path: '/setting/catalogcreate',
        name: 'CatalogCreate',
        component: () => import('@/views/setting/catalogCreate'),
        meta: { title: '添加目录' },
        hidden: true 
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

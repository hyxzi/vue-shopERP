import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../components/Login')
const Home = () => import('../views/Home')
const Welcome = () =>import('../components/Welcome')
const Users = () =>import('../components/users/Users')
const Categories =() =>import('../components/categories/Categories')
const Goods = () =>import('../components/goods/Goods')
const Orders =() =>import('../components/orders/Orders')
const Params =() =>import('../components/params/Params')
const Reports =() => import('../components/reports/Reports')
const Rights = () => import('../components/rights/Rights')
const Roles = () => import('../components/roles/Roles')
const Father = ()=>import('../components/goods/Father')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    redirect:'/welcome',
    component: Home,
    children:[
      {
        path:'/welcome',
        component:Welcome
      },
      {
       path: '/users',
       component:Users
      },
      {
        path: '/rights',
        component:Rights
      },
      {
        path: '/roles',
        component:Roles
      },
      {
        path: '/categories',
        component:Categories
      },
      {
        path:'/reports',
        component:Reports
      },
      {
        path:'/params',
        component:Params
      },
      {
        path:'/orders',
        component:Orders
      },
      {
        path:'/goods',
        component:Goods
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  } else if (!sessionStorage.getItem('token')) {
    return next('/login')
  } else {
    return next()
  }

})

export default router

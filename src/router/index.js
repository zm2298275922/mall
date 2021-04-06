import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Shopcart = () => import('../views/shopcart/Shopcart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

Vue.use(VueRouter)

// 解决重复路由跳转问题，比如说当前路由是商品详情页面/goodsDetail，但是点击按钮进行this.$router.push操作，要跳转的还是商品详情页面/goodsDetail。另一种方法是升级vue-router版本。
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

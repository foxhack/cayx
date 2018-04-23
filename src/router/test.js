import Vue from 'vue'
import Router from 'vue-router'
import Author from '@/views/user/author'
import Home from '@/views/home'
import Register from '@/components/user/register'
import ProductDetail from '@/views/products/detail'
import Transaction from '@/views/products/transaction'
import TransactionResult from '@/views/products/transactionResult'
import Bank from '@/views/user/bank'
import NewBank from '@/views/user/newbank'
import Account from '@/views/user/account'
import TransactionRecord from '@/views/user/transactionRecord'
import IncomeRecord from '@/views/user/incomeRecord'
import { getUserByUserID } from '@/api/user'
import { getProductsRate } from '@/api/product'
import { fetchData } from '@/utils/common'
Vue.use(Router)

const router = new Router({
  mode   : 'history',
  routes : [
    {
      path      : '/author',
      name      : 'author',
      component : Author,
      meta      : {
        title : '登录'
      }
    },
    {
      path      : '/user/register',
      name      : 'register',
      component : Register,
      meta      : {
        title : '注册'
      }
    },
    {
      path      : '/',
      name      : 'home',
      component : Home,
      meta      : {
        title : '主页'
      },
      children  : [
        {
          path      : '/product',
          name      : 'productList',
          component : ()=>{import ('@/views/products/list')},
          meta      : {
            title : '产品中心'
          }
        },
        {
          path      : '/user',
          name      : 'user',
          component : ()=>import ('@/views/user/user'),
          meta      : {
            title : '用户中心'
          }
        }
      ]
    },
    {
      path      : '/product/:pid',
      name      : 'productDetail',
      component : ProductDetail,
      meta      : {
        title : '产品详情'
      }
    },
    {
      path      : '/product/:pid/transaction/:type',
      name      : 'transaction',
      component : Transaction,
      meta      : {
        title : '产品交易'
      }
    },
    {
      path      : '/product/transaction-result/:pid/:type/:tid/:amount',
      name      : 'transaction-result',
      component : TransactionResult,
      props     : true,
      meta      : {
        title : '交易结果'
      }
    },
    {
      path      : '/user/bank',
      name      : 'bank',
      component : Bank,
      props     : true,
      meta      : {
        title : '银行卡'
      }
    },
    {
      path      : '/user/newbank',
      name      : 'newbank',
      component : NewBank,
      meta      : {
        title : '新银行卡'
      }
    },
    {
      path      : '/user/account/:type',
      name      : 'account',
      component : Account,
      meta      : {
        title : '账户操作'
      }
    },
    {
      path      : '/user/transaction/:type',
      name      : 'transaction-record',
      component : TransactionRecord,
      meta      : {
        title : '交易记录'
      }
    },
    {
      path      : '/user/income/:type',
      name      : 'income-record',
      component : IncomeRecord,
      meta      : {
        title : '收益记录'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  let userID = window.localStorage.getItem('userID')
  if (userID || to.path=='/author') {
    console.log('已授权:'+userID)
    next()
  } else {
    window.localStorage.setItem('toPath', to.fullPath)
    console.log('去授权页面')
    next('/author')
  }
  if (to.path.indexOf('/user') > -1 || to.path.indexOf('/product') > -1) {
    setTimeout(() => {
      let store = router.app.$store
      if (store && !store.state.user) {
        console.log('通过userID获取userID信息')
        getUserInfo(userID, store)
      } else {
        next()
      }
    })
  } else {
    next()
  }
  if (to.path.indexOf('/product') > -1) {
    setTimeout(() => {
      let store = router.app.$store
      if (store && !store.getters.productsWithRate) {
        console.log('获取产品信息')
        getProducts(store)
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

function getUserInfo(userID, store) {
  let user = store && !store.state.user
  if (userID && user) {
    fetchData(getUserByUserID(userID), { callback : { success : successCallback } })
    function successCallback(data) {
      store.commit('setUser', data)
    }
  }
}

function getProducts(store) {
  let pid = []
  store.state.products.forEach(p => {pid.push(p.pid)})
  fetchData(getProductsRate(pid), { callback : { success : successCallback } })
  function successCallback(data) {
    store.commit('saveProductsRate', data)
  }
}

export default router

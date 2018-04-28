import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Author from '@/views/user/author'
import Register from '@/components/user/register'
import PasswordSetting from '@/views/user/passwordSetting'
import ResetPassword from '@/views/user/resetPassword'
import Product from '@/views/products/list'
import ProductDetail from '@/views/products/detail'
import Transaction from '@/views/products/transaction'
import TransactionResult from '@/views/products/transactionResult'
import UserSetting from '@/views/user/setting'
import Bank from '@/views/user/bank'
import NewBank from '@/views/user/newbank'
import User from '@/views/user/user'
import Account from '@/views/user/account'
import TransactionRecord from '@/views/user/transactionRecord'
import IncomeRecord from '@/views/user/incomeRecord'
import { getUserByUserID, getAsset } from '@/api/user'
import { getProductsRate } from '@/api/product'
import { post } from '@/utils/common'
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
      path      : '/product',
      name      : 'productList',
      component : Product,
      meta      : {
        title : '产品中心'
      }
    }
    ,
    {
      path      : '/user',
      name      : 'user',
      component : User,
      meta      : {
        title : '用户中心',
        initData : 'asset'
      }
    }
    ,
    {
      path      : '/product/:pid',
      name      : 'productDetail',
      component : ProductDetail,
      meta      : {
        title : '产品详情'
      }
    }
    ,
    {
      path      : '/product/:pid/transaction/:type',
      name      : 'transaction',
      component : Transaction,
      meta      : {
        title : '产品交易',
        initData : 'asset'
      }
    },
    {
      path      : '/product/transaction-result/:pid/:type/:tid/:amount',
      name      : 'transaction-result',
      component : TransactionResult,
      props     : true,
      meta      : {
        title : '交易结果',
        initData : 'asset'
      }
    },
    {
      path      : '/user/setting',
      name      : 'userSetting',
      component : UserSetting,
      meta      : {
        title : '个人设置'
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
      path      : '/user/passwordsetting',
      name      : 'passwordSetting',
      component : PasswordSetting,
      meta      : {
        title : '交易密码管理'
      }
    },
    {
      path      : '/user/resetpassword',
      name      : 'resetPassword',
      component : ResetPassword,
      meta      : {
        title : '找回交易密码'
      }
    },
    {
      path      : '/user/newbank',
      name      : 'newbank',
      component : NewBank,
      meta      : {
        title : '新银行卡'
        //mustFrom : '/user/bank'
      }
    },
    {
      path      : '/user/account/:type',
      name      : 'account',
      component : Account,
      meta      : {
        title    : '账户操作',
        initData : 'asset'
        //mustFrom : '/user'
      }
    },
    {
      path      : '/user/transaction/:pid',
      name      : 'transaction-record',
      component : TransactionRecord,
      meta      : {
        title : '交易记录',
        initData : 'asset'
      }
    }
    ,
    {
      path      : '/user/income/:pid',
      name      : 'income-record',
      component : IncomeRecord,
      meta      : {
        title : '收益记录'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.mustFrom && from!==to.meta.mustFrom) {
    next(to.meta.mustFrom)
  }
  if (to.path=='/user/newbank') store.commit('saveToPath', from.fullPath)

  if (to.meta.title) {
    //document.title = to.meta.title
    store.commit('saveToTitle', to.meta.title)
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
    if (store && !store.state.user) {
      console.log('通过userID获取userID信息')
      getUserInfo(userID)
    } else {
      next()
    }
  } else {
    next()
  }
  if (to.path.indexOf('/product') > -1) {
    if (store && !store.getters.productsWithRate) {
      console.log('获取产品信息')
      getProducts()
    } else {
      next()
    }
  } else {
    next()
  }
  if (to.meta.initData && to.meta.initData==='asset') {
    if (store && !store.state.asset) {
      console.log('获取用户资产信息')
      getUserAsset(userID)
    } else {
      next()
    }
  } else {
    next()
  }
})

function getUserInfo(userID) {
  //let user = store && !store.state.user
  //if (userID && user) {
  post(getUserByUserID(userID), { callback : { success : successCallback } })
  function successCallback(data) {
    store.commit('setUser', data)
  }

  //}
}

function getProducts() {
  let pid = []
  store.state.products.forEach(p => {pid.push(p.pid)})
  post(getProductsRate(pid), { callback : { success : successCallback } })
  function successCallback(data) {
    store.commit('saveProductsRate', data)
  }
}

function getUserAsset(userID) {
  post(getAsset({ userID : userID }), { callback : { success : successCallback } })
  function successCallback(data) {
    store.commit('setAsset', data)
  }
}

export default router

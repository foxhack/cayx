import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import App from '@/App'
import Author from '@/views/user/author'
import Register from '@/views/user/register'
import OpenAccount from '@/components/user/openAccount'
import PasswordSetting from '@/views/user/passwordSetting'
import Product from '@/views/products/list'
import ProductDetail from '@/views/products/detail'
import Transaction from '@/views/products/transaction'
import UserSetting from '@/views/user/setting'
import Bank from '@/views/user/bank'
import User from '@/views/user/user'
import Account from '@/views/user/account'
import TransactionRecord from '@/views/user/transactionRecord'
import IncomeRecord from '@/views/user/incomeRecord'
import { api } from '@/api/api'
import { initAppData } from '@/utils/common'

Vue.use(Router)

const router = new Router({
  mode   : 'history',
  routes : [
    {
      path      : '/',
      name      : '',
      component : App,
      redirect  : '/product',
      meta      : {
        title : ''
      }
    },
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
      path      : '/user/openaccount',
      name      : 'openAccount',
      component : OpenAccount,
      meta      : {
        title : '开户申请'
      }
    },
    {
      path      : '/product',
      name      : 'productList',
      component : Product,
      meta      : {
        title : '产品中心'
      }
    },
    {
      path      : '/user',
      name      : 'user',
      component : User,
      meta      : {
        title    : '用户中心',
      }
    },
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
        title    : '产品交易',
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
      props     : true,
      meta      : {
        title    : '交易密码管理',
      }
    },
    {
      path      : '/user/account/:type',
      name      : 'account',
      component : Account,
      meta      : {
        title    : '账户操作',
      }
    },
    {
      path      : '/user/transaction/:pid',
      name      : 'transaction-record',
      component : TransactionRecord,
      meta      : {
        title : '交易记录'
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
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x : 0, y : 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    //document.title = to.meta.title
    store.commit('saveToTitle', to.meta.title)
  }

  let userID = store.state.userID
  if (userID || to.path=='/author') {
    if(userID){
      console.log('已授权:'+userID)

      let promises = []
      let callbacks = []
      if (!store.state.user) {
        promises.push(api('getUserByUserID', { userID : userID }))
        callbacks.push(function(data) {
          store.commit('setUser', data)
        })
      }
      if (!store.state.asset) {
        promises.push(api('getAsset',{ userID : userID }))
        callbacks.push(function(data) {
          store.commit('setAsset', data)
        })
      }
      if (to.path.indexOf('/product') > -1 && !store.getters.productsWithRate) {
        let pid = []
        store.state.products.forEach(p => {pid.push(p.pid)})
        promises.push(api('getProductsRate', { pid : pid }))
        callbacks.push(function(data) {
          store.commit('saveProductsRate', data)
        })
      }
      if (promises.length > 0) {
        initAppData(promises, callbacks, next)
      } else {
        next()
      }

    }else{
      console.log('去授权页')
      next()
    }

  } else {
    window.localStorage.setItem('toPath', to.fullPath)
    console.log('没有userID,去授权页面')
    next('/author')
  }
})

export default router

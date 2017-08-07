import App from '../App'

const splash = r => require.ensure([], () => r(require('../page/splash')), 'splash');
//店铺详情页面
const shop = r => require.ensure([], () => r(require('../page/shop')), 'shop');
const foodDetail = r => require.ensure([], () => r(require('../page/shop/children/foodDetail')), 'foodDetail')
const shopDetail = r => require.ensure([], () => r(require('../page/shop/children/shopDetail')), 'shopDetail')


//校验单
const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
const remark = r => require.ensure([], () => r(require('../page/confirmOrder/children/remark')), 'remark')
const invoice = r => require.ensure([], () => r(require('../page/confirmOrder/children/invoice')), 'invoice')


//等待商家确认出菜
const waitConfirm = r => require.ensure([], () => r(require('../page/waitConfirm/waitConfirm')), 'waitConfirm')


const me = r => require.ensure([], () => r(require('../page/me/me')), 'me')
const bizAct = r => require.ensure([], () => (require('../page/me/children/bizAct')), 'bizAct')
const coupon = r => require.ensure([], () => (require('../page/me/children/coupon')), 'coupon')
const member = r => require.ensure([], () => (require('../page/me/children/member')), 'member')
const order = r => require.ensure([], () => (require('../page/me/children/order')), 'order')
const personInfo = r => require.ensure([], () => (require('../page/me/children/personInfo')), 'personInfo')

const test = r => require.ensure([], () => r(require('../page/test')), 'test');


export default [{
  path: '/',
  component: App,
  children: [
    // {
    //   path: '/',
    //   component: splash
    // },
    {
      path: '/',
      component: shop,
      children: [{
        path: 'foodDetail', //食品详情页
        component: foodDetail,
      }]
    },
    //确认订单页
    {
      path: 'confirmOrder',
      component: confirmOrder,
      children: [{
        path: 'remark', //订单提交成功
        component: remark,
      }, {
        path: 'invoice', //是否开发票
        component: invoice,
      }]
    },
    {
      path: 'waitConfirm', //食品详情页
      component: waitConfirm,
    },
    {
      path: '/me', //个人中心页
      component: me,
      children: [{
        path: 'personInfo',
        component: personInfo,
      }, {
        path: 'bizAct',
        component: bizAct,
      }, {
        path: 'coupon',
        component: coupon,
      }, {
        path: 'member',
        component: member,
      }, {
        path: 'order',
        component: order,
      }]
    },
    {
      path: 'test',
      component: test,
    }
  ]
}]

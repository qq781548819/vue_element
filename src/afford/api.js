import {
  fecth,
  net,
  jwt
} from './fecth'

let isDebug = true;
export const log = (str) => {
  if (isDebug) {
    console.log(str)
  }
}
/**
 * 获取商店详情
 */
export const shopDetail = async(shop_id) => {
  return await fecth({
    "act": "token.shop.detail",
    "shop_id": shop_id
  });
}
/**
 * 菜单左右数据
 */
export const foodMenu = async(shop_id) => {
  return await fecth({
    "act": "token.shop.cates",
    "shop_id": shop_id
  });
}

/**
 * 用户信息
 */
// export const userInfo = async() => {
//   return await fecth({
//     "act": "token.user.ginfo"
//   });
// }
/**
 * 获取菜单详情
 * @param {*} id 
 */
export const shopContent = async(id) => {
  return await fecth({
    "act": "token.shop.content",
    "id": id
  });
}

// {"act":"normal.shop.code","code":"MS0yYmJkMWUzMDM5Zjk5NDk2OTQ2YzI5OGZkNjNmMGUwNS0x"}
/**
 * 根据二维码获取用户当前店铺id、桌号id
 * @param {*} code 
 */
export const shopCode = async(table) => {
  return await fecth({
    "act": "token.shop.code",
    "table": table
  })
}

export const postOrder = async(data) => {
  return await fecth({
    "act": "token.shop.order",
    ...data
  })
}

/**
 * 用户微信授权
 */
//根据授权code返回token
export const codelogin = async(code) => {
  return await fecth({
    "act": "normal.user.codelogin",
    "code": code
  })
}
//根据授权token返回用户信息
export const userInfo = async(code) => {
  return await fecth({
    "act": "token.user.info"
  })
}


export const shopFinish = async(order_sn) => {
  return await fecth({
    "act": "token.shop.finish",
    "order_sn": order_sn
  })
}

export default {
  addCart (context, payload) {
    // payload新添加的商品

    // let oldProduct = null
    // for (const item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }

    // 查找之前数组中是否有该商品,和上面遍历的方法效果一样
    const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    
    // 判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit('addCounter', oldProduct)
    } else {
      payload.count = 1
      // state.cartList.push(payload)
      context.commit('addToCart', payload)
    }
  }
}

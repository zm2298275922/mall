<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" />
    <detail-swiper :top-images="topImages" />
    <detail-base-info :goods="goods" />
    <detail-shop-info :shop="shop" />
    <detail-goods-info :detail-info="detailInfo" />
    <detail-param-info :param-info="paramInfo" />
    <detail-comment-info :comment-info="commentInfo" />
    <goods-list :goods="reCommends"></goods-list>
    <detail-bottom-bar />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import GoodsList from '../../components/content/goods/GoodsList'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      reCommends: []
    }
  },

  created () {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 取出顶部轮播图片
      this.topImages = data.itemInfo.topImages

      // 创建商品信息对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 创建店铺信息对象
      this.shop = new Shop(data.shopInfo)

      // 取出商品详细信息
      this.detailInfo = data.detailInfo

      // 创建参数信息对象
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      console.log(res)
      this.reCommends = res.data.list
    })
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  padding-top: 44px;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
  background-color: #fff;
}
</style>

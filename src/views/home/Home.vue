<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control  :titles="['流行', '新款', '精选']"
                    @tabCtrlClick="tabCtrlClick"
                    ref="tabControl1"
                    class="tab-control-top" v-show="isTabFixed" />
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load='true'
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view/>
      <tab-control  :titles="['流行', '新款', '精选']"
                    @tabCtrlClick="tabCtrlClick"
                    ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: true,
      tabCtrlOffsetTop: 0,
      isTabFixed: false
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  created () {
    // 请求多个数据
    this.getHomeMultidata()

    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    // 监听goodsListItem中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  // 每次激活状态scroll刷新一次
  activated () {
    this.$refs.scroll.refresh()
  },
  methods: {
    // 事件监听相关的方法
    tabCtrlClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // 让两个tabControl的currentIndex保持一致
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backTopClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll (position) {
      // 判断backTop是否显示
      this.isShowBackTop = (-position.y) > 800

      // 决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > (this.tabCtrlOffsetTop - 44)
    },
    loadMore () {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad () {
      this.tabCtrlOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    // 网络请求相关的方法
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home {
    padding: 0 0 49px 0;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* 在使用浏览器原生滚动时才需要，为了使导航栏不跟随页面一起滚动 */
    /* position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 10; */
  }

    /* 用定位完成顶部停留 */
  /* .tab-control {
    position: sticky;
    top: 40px;
    background-color: #fff;
  } */
  .tab-control-top {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 10;
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>

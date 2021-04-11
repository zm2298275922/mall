<template>
  <div id="shop-cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList'

import { mapGetters } from 'vuex'

export default {
  name: 'Shopcart',
  components: {
    NavBar,
    CartList
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>

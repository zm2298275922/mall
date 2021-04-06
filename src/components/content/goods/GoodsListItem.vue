<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="item-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <i class="iconfont icon-collect"></i>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    imageLoad () {
      this.$bus.$emit('itemImageLoad')
    },
    itemClick () {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
  computed: {
    showImage () {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>

<style scoped>
  .goods-list-item {
    width: 48%;
  }
  .goods-list-item img {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 2px;
  }
  .item-info {
    font-size: 12px;
    text-align: center;
    margin-bottom: 5px;
  }
  .item-info p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 3px;
    padding-left: 4px;
  }
  .price {
    color: var(--color-high-text);
    margin-right: 16px;
  }
  .iconfont {
    font-size: 13px;
    margin-right: 2px;
  }
</style>

<template>
  <div id="shop-item">
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="info-title">{{product.title}}</div>
      <div class="info-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">{{product.price}}</div>
        <div class="item-count">{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartListItem',
  props: {
    product: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
#shop-item {
  width: 100%;
  padding: 5px;
  display: flex;
  border-bottom: 1px solid #ccc;
}

.item-img {
  padding: 5px;
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  overflow: hidden;
}

.info-title, .info-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.info-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
</style>

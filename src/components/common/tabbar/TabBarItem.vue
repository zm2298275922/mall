<template>
  <div class="tab-bar-item" @click="itemClick">
    <div :style="activeStyle">
      <slot name="item-icon"></slot>
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'salmon'
    }
  },
  computed: {
    isActive () {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick () {
      this.$router.push(this.path)
    }
  }
}
</script>

<style>
  .tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  }
  .tab-bar-item i {
    font-size: 24px;
    display: block;
  }
</style>

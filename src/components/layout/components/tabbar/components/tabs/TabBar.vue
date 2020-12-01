<template>
  <div class="el-tabs__active-bar" :style="barStyle"></div>
</template>
<script>
export default {
  name: 'tabBar',

  props: {
    tabs: Array
  },

  computed: {
    barStyle: {
      cache: false,
      get() {
        if (!this.$parent.$refs.tabs) return {}
        const style = {}
        let offset = 0
        let tabWidth = 0
        console.log(this.tabs)
        this.tabs.every((tab, index) => {
          const $el = this.$parent.$refs.tabs[index]
          if (!$el) {
            return false
          }
          if (!tab.active) {
            offset += $el.clientWidth
            return true
          } else {
            tabWidth = $el.clientWidth
            return false
          }
        })
        const transform = `translateX(${offset}px)`
        style.width = tabWidth + 'px'
        style.transform = transform
        style.msTransform = transform
        style.webkitTransform = transform
        return style
      }
    }
  }
}
</script>

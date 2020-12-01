<script>
import TabBar from './TabBar'
/* import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';*/
import { addResizeListener, removeResizeListener } from './resize-event'
function noop() {}

export default {
  name: 'tabNav',

  components: {
    TabBar
  },

  props: {
    panes: Array,
    currentTabKey: String,
    currentId: String,
    editable: Boolean,
    onTabClick: {
      type: Function,
      default: noop
    },
    onTabMouseDown: {
      type: Function,
      default: noop
    },
    onTabRemove: {
      type: Function,
      default: noop
    },
    type: String
  },

  data() {
    return {
      scrollable: false,
      navStyle: {
        transform: ''
      }
    }
  },

  methods: {
    scrollPrev() {
      const containerWidth = this.$refs.navScroll.offsetWidth
      const currentOffset = this.getCurrentScrollOffset()

      if (!currentOffset) return

      const newOffset = currentOffset > containerWidth ? currentOffset - containerWidth : 0

      this.setOffset(newOffset)
    },
    scrollNext() {
      const navWidth = this.$refs.nav.offsetWidth
      const containerWidth = this.$refs.navScroll.offsetWidth
      const currentOffset = this.getCurrentScrollOffset()

      if (navWidth - currentOffset <= containerWidth) return

      const newOffset =
        navWidth - currentOffset > containerWidth * 2 ? currentOffset + containerWidth : navWidth - containerWidth

      this.setOffset(newOffset)
    },
    scrollToActiveTab() {
      if (!this.scrollable) return
      const nav = this.$refs.nav
      const activeTab = this.$el.querySelector('.is-active')
      const navScroll = this.$refs.navScroll
      const activeTabBounding = activeTab.getBoundingClientRect()
      const navScrollBounding = navScroll.getBoundingClientRect()
      const navBounding = nav.getBoundingClientRect()
      const currentOffset = this.getCurrentScrollOffset()
      let newOffset = currentOffset

      if (activeTabBounding.left < navScrollBounding.left) {
        newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left)
      }
      if (activeTabBounding.right > navScrollBounding.right) {
        newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right
      }
      if (navBounding.right < navScrollBounding.right) {
        newOffset = nav.offsetWidth - navScrollBounding.width
      }
      this.setOffset(Math.max(newOffset, 0))
    },
    getCurrentScrollOffset() {
      const { navStyle } = this
      return navStyle.transform ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1]) : 0
    },
    setOffset(value) {
      this.navStyle.transform = `translateX(-${value}px)`
    },
    update() {
      const navWidth = this.$refs.nav.offsetWidth
      const containerWidth = this.$refs.navScroll.offsetWidth
      const currentOffset = this.getCurrentScrollOffset()

      if (containerWidth < navWidth) {
        const currentOffset = this.getCurrentScrollOffset()
        this.scrollable = this.scrollable || {}
        this.scrollable.prev = currentOffset
        this.scrollable.next = currentOffset + containerWidth < navWidth
        if (navWidth - currentOffset < containerWidth) {
          this.setOffset(navWidth - containerWidth)
        }
      } else {
        this.scrollable = false
        if (currentOffset > 0) {
          this.setOffset(0)
        }
      }
    }
  },

  updated() {
    this.update()
  },

  render(h) {
    const {
      type,
      panes,
      editable,
      onTabClick,
      onTabMouseDown,
      onTabRemove,
      navStyle,
      scrollable,
      scrollNext,
      scrollPrev,
      currentTabKey,
      currentId
    } = this
    const scrollBtn = scrollable
      ? [
        <span class={['el-tabs__nav-prev', scrollable.prev ? '' : 'is-disabled']} on-click={scrollPrev}>
          <i class='el-icon-arrow-left' />
        </span>,
        <span class={['el-tabs__nav-next', scrollable.next ? '' : 'is-disabled']} on-click={scrollNext}>
          <i class='el-icon-arrow-right' />
        </span>
      ]
      : null

    const tabs = this._l(panes, (pane, index) => {
      const tabName = pane.tabName || pane.index || index
      const closable = pane.canClose || editable
      const tabKey = pane.tabKey
      pane.index = `${index}`
      const btnClose = closable ? (
        <span
          class='el-icon-close'
          on-click={ev => {
            onTabRemove(pane, ev)
          }}
        />
      ) : null

      const tabLabelContent = pane.tabName
      const isactive = currentTabKey !== '0' ? pane.tabKey === currentTabKey : pane.index === '0'
      return (
        <div
          class={{
            'el-tabs__item': true,
            'is-active': isactive,
            'is-disabled': pane.disabled,
            'is-closable': closable
          }}
          ref='tabs'
          refInFor
          on-click={ev => {
            onTabClick(pane, tabKey, ev)
          }}
          on-mousedown={ev => {
            onTabMouseDown(pane, tabKey, ev)
          }}
        >
          {tabLabelContent}
          {btnClose}
        </div>
      )
    })
    return (
      <div class={['el-tabs__nav-wrap', scrollable ? 'is-scrollable' : '']}>
        {scrollBtn}
        <div class={['el-tabs__nav-scroll']} ref='navScroll'>
          <div class='el-tabs__nav' ref='nav' style={navStyle}>
            {!type ? <tab-bar tabs={panes} /> : null}
            {tabs}
          </div>
        </div>
      </div>
    )
  },

  mounted() {
    addResizeListener(this.$el, this.update)
  },

  beforeDestroy() {
    if (this.$el && this.update) removeResizeListener(this.$el, this.update)
  }
}
</script>

<script>
import TabNav from './TabNav'

export default {
  name: 'LayoutTabs',
  components: {
    TabNav
  },

  props: {
    panes: Array,
    type: String,
    closable: Boolean,
    addable: Boolean,
    value: {},
    editable: Boolean
  },

  data() {
    return {
      currentTabKey: this.value,
      currentId: '',
      clientX: '0px',
      clientY: '0px',
      isShowMenu: false,
      curMouseOverTab: {}
    }
  },

  watch: {
    value: {
      handler(n, o) {
        this.setCurrentTabKey(n)
      },
      immediate: true
    },
    currentTabKey(value) {
      if (this.$refs.nav) {
        this.$nextTick(_ => {
          this.$refs.nav.scrollToActiveTab()
        })
      }
    }
  },

  methods: {
    handlerDocClick() {
      var _this = this
      document.onclick = function(e) {
        _this.isShowMenu = false
      }
    },
    closeOtherTab() {
      // 向父组件传出关掉其他标签栏的事件 传出为当前操作的标签栏
      this.$emit('close-other', this.curMouseOverTab)
    },
    closeAllTab() {
      // 向父组件传出关掉所有标签栏的事件  传出为当前操作的标签栏
      this.$emit('close-all', this.curMouseOverTab)
    },
    handleTabClick(tab, tabKey, event) {
      if (tab.disabled) return
      this.setCurrentTabKey(tabKey)
      this.$emit('tab-click', tab, event)
    },
    handleTabMouseDown(tab, tabKey, event) {
      this.curMouseOverTab = tab
      // 鼠标按下事件传出给父组件的事件
      this.$emit('mouse-down', {
        tab: tab,
        tabKey: tabKey
      })
      if (tab.disabled) return
      if (event.button === 2) {
        // console.log(`y:${this.clientY},x:${this.clientX}`) for debug
        this.clientX = event.clientX + 10 + 'px'
        this.clientY = event.clientY + 'px'
        this.isShowMenu = true
      } else {
        return
      }
    },
    handleTabRemove(pane, ev) {
      if (pane.disabled) return
      ev.stopPropagation()
      this.$emit('edit', pane, 'remove')
      this.$emit('tab-remove', pane)
    },
    handleTabAdd() {
      this.$emit('edit', null, 'add')
      this.$emit('tab-add')
    },
    setCurrentTabKey(key) {
      this.currentTabKey = key
      this.$emit('input', key)
    }
  },
  render(h) {
    const {
      type,
      handleTabClick,
      handleTabRemove,
      handleTabMouseDown,
      handleTabAdd,
      currentTabKey,
      currentId,
      closeOtherTab,
      closeAllTab,
      panes,
      editable,
      addable,
      isShowMenu,
      clientX,
      clientY
    } = this
    const newButton =
      editable || addable ? (
        <span class='el-tabs__new-tab' on-click={handleTabAdd}>
          <i class='el-icon-plus' />
        </span>
      ) : null

    const navData = {
      props: {
        currentId,
        currentTabKey,
        onTabClick: handleTabClick,
        onTabRemove: handleTabRemove,
        onTabMouseDown: handleTabMouseDown,
        editable,
        type,
        panes
      },
      ref: 'nav'
    }
    var showType = isShowMenu ? 'block' : 'none'
    return (
      <div
        class={{
          'el-tabs': true,
          'el-tabs--card': type === 'card',
          'el-tabs--border-card': type === 'border-card'
        }}
        on-contextmenu={ev => {
          ev.preventDefault()
          ev.stopPropagation()
        }}
      >
        <div class='el-tabs__header'>
          {newButton}
          <tab-nav {...navData} />
        </div>
        <div style={{ display: showType, left: clientX, top: clientY }} class='layout-tabbar-context-menu'>
          <ul class="layout-tabbar-context-menu__list">
            <li class='layout-tabbar-context-menu__list__item' on-click={closeOtherTab}>
              关闭其它标签
            </li>
            <li class='layout-tabbar-context-menu__list__item' on-click={closeAllTab}>
              关闭全部标签
            </li>
          </ul>
        </div>
      </div>
    )
  },
  created() {
    if (!this.currentTabKey) {
      this.setCurrentTabKey('0')
    }
    this.handlerDocClick()
  }
}
</script>

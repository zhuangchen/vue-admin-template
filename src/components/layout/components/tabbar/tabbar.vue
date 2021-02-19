<template>
  <div class="temp-tabbar">
    <tabs
      v-model="activeTabName"
      :tabs="tabs"
      :enable-context-menu="tabProps.enableContextMenu"
      :type="tabProps.type"
      @tab-other-close="handleTabOtherClose"
      @tab-all-close="handleTabAllClose"
      @tab-remove="handleTabRemove"
      @tab-click="handleTabClick"
    />
  </div>
</template>
<script lang="ts">
import {ITabPorps, ITabItemProps} from '@/model/tabbar';
import {Vue, Options} from 'vue-class-component';
import tabs from './components/tabs.vue';
@Options(
    {
        name: 'TempTabbar',
        components: {
            tabs
        }
    }
)
export default class TempTabbar extends Vue {
  activeTabName: string = '2'
  tabProps: ITabPorps = {
      enableContextMenu: true,
      type: 'card'
  }
  tabs:ITabItemProps[] = [
      {
          key: '1',
          tabName: 'tab1',
          closable: true
      }, 
      {
          key: '2',
          tabName: 'tab2',
          closable: false
      }
  ]
  handleTabOtherClose(curtab: ITabItemProps){
      console.log('handleTabOtherClose', curtab);
  }
  handleTabAllClose(curtab: ITabItemProps){
      console.log('handleTabAllClose', curtab);
  }
  handleTabRemove(tab: ITabItemProps){
      console.log('handleTabRemove', tab);
  }

  handleTabClick(tab: ITabItemProps){
      console.log('handleTabClick', tab);
  }
}
</script>

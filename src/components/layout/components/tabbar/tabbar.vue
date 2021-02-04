<template>
  <div class="temp-tabbar">
    <tabs
      v-model="activeTabName"
      :tabs="tabs"
      :type="tabProps.type"
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
  handleTabRemove(tab: ITabItemProps){
      console.log('handleTabRemove', tab);
  }

  handleTabClick(tab: ITabItemProps){
      console.log('handleTabClick', tab);
  }
}
</script>

<template>
  <div class="temp-header">
    <el-menu
      :default-active="topMenu.defaultActive"
      mode="horizontal"
      class="temp-header-menu"
      @select="handleSelect"
    >
      <top-menu-item :top-menu-items="topMenu.topMenuItems" />
    </el-menu>
  </div>
</template>
<script lang="ts">
import TopMenuItem from './components/top-menu-item.vue';
import {Vue, Options} from 'vue-class-component';
import {Ref, unref} from 'vue';
import { ITopMenu } from '@/model/menu';
@Options(
    {
        name: 'TempHeader',
        components: {
            TopMenuItem
        }
    }
)
export default class TempHeader extends Vue {
  private topMenu: ITopMenu = {
      defaultActive: '2',
      mode: 'horizontal',
      topMenuItems: [
          {
              id: '1',
              name: '菜单1'
          },
          {
              id: '2',
              name: '菜单2'
          },
          {
              id: '3',
              name: '菜单3',
              subMenu: [
                  {
                      id: '3-1',
                      name: '菜单3-1',
                      subMenu: [
                          {
                              id: '3-1-1',
                              name: '菜单3-1-1'
                          }
                      ]
                  }
              ]
          },
          {
              id: '4',
              name: '菜单4'
          }
          
      ]
  }
  handleSelect(index:string, pathIndex:Ref){
      console.log('当前菜单项索引', index);
      console.log('当请菜单项路径', unref(pathIndex));
  }
}
</script>

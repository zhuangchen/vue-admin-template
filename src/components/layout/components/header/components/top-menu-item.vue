<template>
  <template v-for="item in topMenuItems">
    <el-menu-item
      v-if="!item.subMenu || !Array.isArray(item.subMenu) || (!Array.isArray(item.subMenu) && item.subMenu.length === 0)"
      :key="item.key"
      class="temp-header-menu__item"
      :index="item.key"
    >
      <span class="temp-header-menu__title">{{ item.name }}</span>
    </el-menu-item>
    <el-submenu
      v-else
      :key="item.key"
      class="temp-header-menu__submenu"
      popper-class="temp-header-menu__popper"
      :index="item.key"
    >
      <template
        #title
      >
        <span class="temp-header-menu__title">{{ item.name }}</span>
      </template>
      <top-menu-item :top-menu-items="item.subMenu" />
    </el-submenu>
  </template>
</template>
<script lang="ts">
import {Vue, Options} from 'vue-class-component';
import {PropType} from 'vue';
import { ITopMenuItem } from '@/model/menu';
@Options(
    {
        props: {
            topMenuItems: {
                type: Array as PropType<ITopMenuItem[]>,
                default: () => ([])
            }
        },
        name: 'TopMenuItem'
    }
)
export default class TopMenuItem extends Vue {
}
</script>

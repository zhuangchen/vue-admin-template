<template>
  <template v-for="item in topMenuItems">
    <el-menu-item
      v-if="!item.subMenus || !Array.isArray(item.subMenus) || (!Array.isArray(item.subMenus) && item.subMenus.length === 0)"
      :key="item.id"
      class="temp-header-menu__item"
      :index="item.id"
    >
      <span class="temp-header-menu__title">{{ item.name }}</span>
    </el-menu-item>
    <el-submenu
      v-else
      :key="item.id"
      class="temp-header-menu__submenu"
      popper-class="temp-header-menu__popper"
      :index="item.id"
    >
      <template
        #title
      >
        <span class="temp-header-menu__title">{{ item.name }}</span>
      </template>
      <top-menu-item :top-menu-items="item.subMenus" />
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
                type: Object as PropType<ITopMenuItem>,
                default: () => ([])
            }
        },
        name: 'TopMenuItem'
    }
)
export default class TopMenuItem extends Vue {
}
</script>

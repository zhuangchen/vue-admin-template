<template>
  <template v-for="item in sidebarMenuItems">
    <el-menu-item-group
      v-if="item.isGroup"
      :key="item.id"
      class="temp-sidebar-menu__group"
    >
      <template
        #title
      >
        <i
          v-if="item.icon"
          :class="item.icon"
        />
        <span>{{ item.name }}</span>
      </template>
      <sidebar-menu-item
        :sidebar-menu-items="item.subMenu"
        @item-menu-click="handleMenuItemClick"
      />
    </el-menu-item-group>
    <el-menu-item
      v-else-if="!item.isGroup && !item.subMenu || !Array.isArray(item.subMenu) || (!Array.isArray(item.subMenu) && item.subMenu.length === 0)"
      :key="item.id"
      popper-append-to-body
      class="temp-sidebar-menu__item" 
      :index="item.id"
      @click="onClickMenuItem(item)"
    >
      <i
        v-if="item.icon"
        :class="item.icon"
      />
      <template #title>
        {{ item.name }}
      </template>
    </el-menu-item>
    <el-submenu
      v-else
      :key="item.id"
      class="temp-sidebar-menu__submenu"
      popper-append-to-body
      popper-class="temp-sidebar-menu__popper"
      :index="item.id"
    >
      <template
        #title
      >
        <i
          v-if="item.icon"
          :class="item.icon"
        />
        <span>
          {{ item.name }}
        </span>
      </template>
      <sidebar-menu-item
        :sidebar-menu-items="item.subMenu"
        @item-menu-click="handleMenuItemClick"
      />
    </el-submenu>
  </template>
</template>
<script lang="ts">
import {Vue, Options} from 'vue-class-component';
import {PropType} from 'vue';
import { ISidebarMenuItem } from '@/model/menu';
@Options(
    {
        props: {
            sidebarMenuItems: {
                type: Array as PropType<ISidebarMenuItem[]>,
                default: () => ([])
            }
        },
        emits: ['item-menu-click'],
        name: 'SidebarMenuItem'
    }
)
export default class SidebarMenuItem extends Vue {
    onClickMenuItem(menuItem: ISidebarMenuItem){
        this.$emit('item-menu-click', menuItem);
    }
    handleMenuItemClick(menuItem:ISidebarMenuItem){
        this.$emit('item-menu-click', menuItem);
    }
}
</script>

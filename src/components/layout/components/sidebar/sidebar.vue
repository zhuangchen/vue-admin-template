<template>
  <div :class="['temp-sidebar', sidebarMenu.collapse ? 'temp-sidebar--collapse' : '']">
    <div
      class="temp-sidebar__header"
      title="管理系统"
    >
      管理系统
    </div>
    <div class="temp-sidebar__body">
      <el-menu
        :collapse="sidebarMenu.collapse"
        :unique-opened="sidebarMenu.uniqueOpened"
        :default-active="sidebarMenu.defaultActive"
        class="temp-sidebar-menu"
        background-color="#545c64"
        text-color="#fff"
        :mode="sidebarMenu.mode"
        active-text-color="#ffd04b"
      >
        <sidebar-menu-item
          :sidebar-menu-items="sidebarMenu.sidebarMenuItems"
          @item-menu-click="handleMenuItemClick"
        />
      </el-menu>
    </div>
    <div
      class="temp-sidebar__footer"
      @click="onClickCollapseBtn"
    >
      <i :class="!sidebarMenu.collapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" />
    </div>
  </div>
</template>
<script lang="ts">
import { ISidebarMenu, ISidebarMenuItem } from '@/model/menu';
import SidebarMenuItem from './components/sidebar-menu-item.vue';
import {Vue, Options} from 'vue-class-component';
@Options(
    {
        name: 'TempSidebar',
        components: {
            SidebarMenuItem
        },
        emits: ['sidebar-collapse']
    }
)
export default class TempSidebar extends Vue {
    private sidebarMenu: ISidebarMenu = {
        defaultOpeneds: [],
        collapse: false,
        uniqueOpened: true,
        collapseTransition: true,
        defaultActive: '1-1-1',
        mode: 'vertical',
        sidebarMenuItems: [
            {
                id: '1',
                name: '导航一',
                icon: 'el-icon-location',
                subMenu: [
                    {
                        id: '1-1',
                        name: '分组一',
                        isGroup: true,
                        subMenu: [
                            {
                                id: '1-1-1',
                                name: '选项一'
                            },
                            {
                                id: '1-1-2',
                                name: '选项二'
                            }
                        ]
                    },
                    {
                        id: '1-2',
                        name: '分组二',
                        isGroup: true,
                        subMenu: [
                            {
                                id: '1-2-1',
                                name: '选项三'
                            },
                            {
                                id: '1-2-2',
                                name: '选项四'
                            }
                        ]
                    },
                    {
                        id: '1-3',
                        name: '选项4',
                        subMenu: [
                            {
                                id: '1-3-1',
                                name: '选项三'
                            },
                            {
                                id: '1-3-2',
                                name: '选项四'
                            }
                        ]
                    }
                ]
            }, 
            {
                id: '2',
                name: '导航二',
                icon: 'el-icon-menu'
            },
            {
                id: '3',
                name: '导航三',
                disabled: true,
                icon: 'el-icon-document'
            },
            {
                id: '4',
                name: '导航四',
                disabled: true,
                icon: 'el-icon-document',
                subMenu: [
                    {
                        id: '4-1',
                        name: '选项一'
                    },
                    {
                        id: '4-2',
                        name: '选项二'
                    }
                ]
            },
            {
                id: '5',
                name: '导航5',
                icon: 'el-icon-menu'
            },
            {
                id: '6',
                name: '导航6',
                icon: 'el-icon-menu'
            },
            {
                id: '7',
                name: '导航7',
                icon: 'el-icon-menu'
            },
            {
                id: '8',
                name: '导航8',
                icon: 'el-icon-menu'
            }
        ]
    } 
    handleMenuItemClick(menuItem:ISidebarMenuItem){
        console.log(menuItem);
    }
    onClickCollapseBtn () {
        this.sidebarMenu.collapse = !this.sidebarMenu.collapse;
        this.$emit('sidebar-collapse', this.sidebarMenu.collapse);
    }
}
</script>

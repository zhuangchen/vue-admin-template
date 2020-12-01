<template>
  <div>
    <template v-for="(sidebarNav) in menus">
      <el-submenu v-if="Array.isArray(sidebarNav.children)&&sidebarNav.children.length > 0" :key="sidebarNav.navId" :index="sidebarNav.navId + sidebarNav.navName">
        <template slot="title">
          <i :class="sidebarNav.navIcon"></i>
          <span slot="title">{{sidebarNav.navName}}</span>
        </template>
        <sub-menu :menus="sidebarNav.children" @executeRouter="executeRouter"></sub-menu>
      </el-submenu>
      <el-menu-item class="el-menu-noClidren" @click="executeRouter(sidebarNav)" :index="sidebarNav.navId" :key="sidebarNav.navId" v-else>
        <i :class="sidebarNav.navIcon"></i>
        <span slot="title" :title="sidebarNav.navName">{{sidebarNav.navName}}</span></el-menu-item>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {ISidebarNav} from '@/model/layout';
@Component({
  name: 'SubMenu',
})
export default class SubMenu extends Vue {
  @Prop({
    default: '',
  })
  private uniqueOpened: boolean;

  @Prop({
    default: () => [],
  })
  private menus: ISidebarNav[];

  private executeRouter(sidebarNav: ISidebarNav) {
    this.$emit('executeRouter', sidebarNav);
  }
}
</script>

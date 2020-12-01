<template>
  <el-menu
    ref="menu"
    mode="vertical"
    :collapse-transition="false"
    :collapse="isCollapse"
    :unique-opened="uniqueOpened"
     class="el-menu-vertical"
    :default-active="defaultActive"
    :default-openeds="defaultOpeneds"
  >
    <sub-menu :menus="menus" @executeRouter="executeRouter" :defaultActive="defaultActive"></sub-menu>
  </el-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import SubMenu from './sub-menu.vue';
import {ISidebarNav} from '@/model/layout';
@Component({
  name: 'Menu',
  components: {
    SubMenu,
  },
})
export default class Menu extends Vue {
  @Prop({
    default: () => [],
  })
  private menus: ISidebarNav[];

  @Prop({
    default: false,
  })
  private uniqueOpened: boolean;

  @Prop({
    default: false,
  })
  private isCollapse: boolean;

  @Prop({
    default: '',
  })
  private defaultActive: string;

  @Prop({
    default: () => [],
  })
  private defaultOpeneds: string[];

  private executeRouter(sidebarNav: ISidebarNav) {
    this.$emit('executeRouter', sidebarNav);
  }
  @Watch('defaultActive')
  private watchDefaultActive() {
    (this.$refs.menu as any).activeIndex = this.defaultActive;
  }
}
</script>

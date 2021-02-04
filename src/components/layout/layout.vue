<template>
  <div :class="[collapse ? 'temp-layout temp-layout--collapse' : 'collapse']">
    <div class="temp-layout__left">
      <temp-sidebar @sidebar-collapse="handleSidebarCollapse" />
    </div>
    <div class="temp-layout__right">
      <temp-header />
      <temp-tabbar />
      <temp-main />
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component';
import {TempFooter, TempHeader, TempMain, TempTabbar, TempSidebar} from './components';

@Options({
    components: {
        TempFooter,
        TempHeader,
        TempMain,
        TempTabbar,
        TempSidebar
    }
})
export default class Layout extends Vue {
    collapse: boolean = false
    handleSidebarCollapse(collapse:boolean) {
        this.collapse = collapse;
    }
}
</script>

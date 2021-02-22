<template>
  <div :class="[collapse ? 'temp-layout temp-layout--collapse' : 'temp-layout']">
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
import { mapState, mapActions } from 'vuex';
@Options({
    components: {
        TempFooter,
        TempHeader,
        TempMain,
        TempTabbar,
        TempSidebar
    },
    computed: mapState({
        collapse: (state:any) => state.ui.isCollapseSidebar
    }),
    methods: {
        ...mapActions([
            'setSidebarStatus'
        ])
    }
})
export default class Layout extends Vue {
  
    handleSidebarCollapse() {
        (this as any).setSidebarStatus(!(this as any).collapse);
    }
}
</script>

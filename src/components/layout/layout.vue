<template>
  <div class="temp-layout">
    <temp-header />
    <temp-footer />
    <temp-main />
    <temp-tabbar />
    <temp-sidebar />
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
  
}
</script>

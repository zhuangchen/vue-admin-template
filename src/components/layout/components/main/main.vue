<template>
  <div class="temp-main">
    <router-view />
  </div>
</template>
<script lang="ts">
import {Vue, Options} from 'vue-class-component';
@Options(
    {
        name: 'TempMain'
    }
)
export default class TempMain extends Vue {
}
</script>

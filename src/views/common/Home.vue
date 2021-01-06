<template>
  <temp-slider :max="3" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
@Options({
    name: 'Home'
})
export default class App extends Vue {

}
</script>

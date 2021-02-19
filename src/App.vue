<template>
  <router-view />
  <div id="subapp-viewport" />
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
export default class App extends Vue {}
</script>
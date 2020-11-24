<template>
  <router-view />
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store';
import {fetchUserById} from './api';
fetchUserById(1).then(res => {
  
});
export default class App extends Vue {}
</script>
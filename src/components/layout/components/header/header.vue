<template>
  <div class="temp-header">
    <div class="temp-header__container temp-float--clear">
      <div class="temp-header__left temp-float--left">
        <top-menu />
      </div>
      <div class="temp-header__right temp-float--right">
        <function-list />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import FunctionList from './components/function-list.vue';
import TopMenu from './components/top-menu.vue';
import {Vue, Options} from 'vue-class-component';
@Options(
    {
        name: 'TempHeader',
        components: {
            TopMenu,
            FunctionList
        }
    }
)
export default class TempHeader extends Vue {

}
</script>

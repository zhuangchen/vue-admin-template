<template>
  <div class="temp-header">
    <div class="temp-header__container temp-float--clear">
      <div class="temp-header__left temp-float--left" />
      <div class="temp-header__right temp-float--right">
        <function-list />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import FunctionList from './components/function-list.vue';
import {Vue, Options} from 'vue-class-component';
@Options(
    {
        name: 'TempHeader',
        components: {
            FunctionList
        }
    }
)
export default class TempHeader extends Vue {

}
</script>

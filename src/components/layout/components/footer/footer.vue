<template>
  <div class="temp-footer">
    {{ msg }}
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({name: 'TempFooter'})
export default class TempFooter extends Vue {
  private msg: string = 'Copyright ©xxxxxxx.com, All Rights Reserved.';
}
</script>

<style scoped lang="scss">
.temp-footer {
  padding: 5px;
  font-size: $font_little;
  text-align: center;
  background: #272727;
  color: rgba(255, 255, 255, 0.7);
}
</style>
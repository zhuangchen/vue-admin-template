<template>
  <div class="temp-footer">
    {{ msg }}
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options(
    {
        name: 'TempFooter'
    }
)
export default class TempFooter extends Vue {
  private msg: string = 'Copyright ©xxxxxxx.com, All Rights Reserved.';
}
</script>
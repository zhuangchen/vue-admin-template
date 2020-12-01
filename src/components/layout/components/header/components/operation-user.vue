<template>
  <div class="operation-user">
    <span class="operation-user__avatar">
      <i class="el-icon-user"></i>
    </span>
    <span class="operation-user__name">admin</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class OperationUser extends Vue {
}
</script>

<style scoped lang="scss">
.operation-user{
  display: flex;
  justify-content: center;
  align-content: center;
  height: 35px;
  margin-top: 7px;
  line-height: 35px;
  &__avatar{
    height: 35px;
    width: 35px;
    line-height: 35px;
     border-radius: 50%;
     text-align: center;
     font-size: 20px;
  }
  &__name{
    padding-left: 5px;
  }
}
</style>
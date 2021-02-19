<template>
  <ul class="temp-header-function-list">
    <li class="function-item">
      <el-dropdown>
        <div class="function-user">
          <div class="function-user__image">
            <img src="../../../../../assets/logo.png">
          </div>
          <div class="function-user__iocn">
            <i class="el-icon-arrow-down el-icon--right" />
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item>主页</el-dropdown-item>
            <el-dropdown-item divided>
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </li>
  </ul>
</template>
<script lang="ts">
import {Vue, Options} from 'vue-class-component';
@Options(
    {
        name: 'FunctionList'
    }
)
export default class FunctionList extends Vue {
}
</script>

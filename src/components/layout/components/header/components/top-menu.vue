<template>
  <el-menu
    :default-active="defaultActive"
    mode="horizontal"
    class="temp-header-menu"
    @select="handleSelect"
  >
    <top-menu-item :top-menu-items="topMenuItems" />
  </el-menu>
</template>
<script lang="ts">
import TopMenuItem from './top-menu-item.vue';
import {Vue, Options} from 'vue-class-component';
import {Ref, unref} from 'vue';
import { mapGetters } from 'vuex';
@Options(
    {
        name: 'TopMenu',
        components: {
            TopMenuItem
        },
        computed: {
            ...mapGetters({
                defaultActive: 'getCurrentTopMenuItemKey',
                topMenuItems: 'getTopMenus'
            })
        },
        watch: {
            $route: {
                immediate: true,
                handler (n) {
                    console.log(n);
                }
            }
        }
    }
)
export default class TopMenu extends Vue {
    handleSelect(index:string, pathIndex:Ref){
        console.log('当前菜单项索引', index);
        console.log('当请菜单项路径', unref(pathIndex));
    }
}
</script>

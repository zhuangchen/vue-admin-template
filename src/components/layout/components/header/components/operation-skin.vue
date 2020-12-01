<template>
  <div class="operation-skin">
    <el-popover popper-class="select-color-popover" placement="bottom" width="200" trigger="click">
      <div class="select-color-popover__content">
        <div v-for="item in partColor" :key="item.partName" class="select-color-item">
          <div class="select-color-item__header">{{item.partName}}</div>
          <div class="select-color-item__body">
            <div
              class="select-color-item__body__item"
              @click="onClickColor(color)"
              v-for="color in item.colors"
              :style="{backgroundColor: color.color}"
              :key="color.color"
            ></div>
          </div>
        </div>
      </div>
      <svg class="icon tiaosepan" slot="reference" aria-hidden="true">
        <use xlink:href="#icon-tiaosepan" />
      </svg>
    </el-popover>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
interface IColor {
  color: string;
  theme: string;
  attr: string;
}
interface IPartColor {
  partName: string;
  colors: IColor[];
}
@Component
export default class OperationSkin extends Vue {
  private partColor: IPartColor[] = [
    {
      partName: '顶部导航',
      colors: [
        {
          color: '#fff',
          theme: 'default',
          attr: 'data-headerbg',
        },
        {
          color: '#409EFF',
          theme: 'blue',
          attr: 'data-headerbg',
        },
        {
          color: '#465161',
          theme: 'dark',
          attr: 'data-headerbg',
        },
        {
          color: '#F04E23',
          theme: 'official',
          attr: 'data-headerbg',
        },
        {
          color: '#17b3a3',
          theme: 'green',
          attr: 'data-headerbg',
        },
      ],
    },
    {
      partName: '侧边菜单',
      colors: [
        {
          color: '#fff',
          theme: 'default',
          attr: 'data-sidebarbg',
        },
        {
          color: '#409EFF',
          theme: 'blue',
          attr: 'data-sidebarbg',
        },
        {
          color: '#465161',
          theme: 'dark',
          attr: 'data-sidebarbg',
        },
        {
          color: '#F04E23',
          theme: 'official',
          attr: 'data-sidebarbg',
        },
        {
          color: '#17b3a3',
          theme: 'green',
          attr: 'data-sidebarbg',
        },
      ],
    },
  ];
  private onClickColor(color: IColor) {
    document
      .getElementsByTagName('html')[0]
      .setAttribute(color.attr, color.theme);
  }
}
</script>

<style scoped lang="scss">
.select-color-popover{
  &__content{
    .select-color-item{
      &:first-child {
        margin-top: 0px;
        }
        margin-top: 8px;
        padding: 5px;
        font-size: 12px;
      &__header{
        font-size: 13px;
      }
      &__body{
        display: flex;
        margin-top: 5px;
        justify-content: space-between;
        align-content: center;
        &__item{
          height: 20px;
          width: 20px;
          cursor: pointer;
          border: 1px solid #f0f0f0;
        }
      }
    }
  }
}
.operation-skin {
  display: inline-block;
  font-size: 28px;
}
</style>
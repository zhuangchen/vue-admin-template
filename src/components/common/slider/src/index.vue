<template>
  <div class="temp-slider">
    <div class="temp-slider__left">
      {{ name }}
    </div>
    <div class="temp-slider__middle">
      <div
        ref="sliderAreaRef"
        class="temp-slider__area"
      >
        <div
          class="temp-slider__bg temp-slider__bg--left"
          :style="getLeftBgStyle()"
        >
          <span class="temp-slider__bg__des temp-slider__bg__des--left">{{ option.leftBgDescription }}</span>
        </div>
        <div
          class="temp-slider__bg temp-slider__bg--right"
          :style="getRightBgStyle()"
        >
          <span class="temp-slider__bg__des temp-slider__bg__des--right">{{ option.rightBgDescription }}</span>
        </div>
        <div
          ref="sliderBarref"
          class="temp-slider__bar"
          :style="barStyle"
          @mousedown="onBarDown"
        >
          <div class="temp-slider__bar__pointer" />
        </div>
        <div class="temp-slider__dots">
          <div
            v-for="(dot,index) in max + 1"
            :key="dot"
            :class="[computedPointerValue === Number(dot - 1)?'temp-slider__dot--pointer': '','temp-slider__dot']"
            :style="getStopStyle(index)"
          />
        </div>
        <div class="temp-slider__events">
          <template
            v-for="(mark,index) in marks"
            :key="index"
          >
            <div
              v-if="mark.hasEvent"
              :style="getEventStyle(index)"
              class="temp-slider__event"
            >
              <div
                v-for="(tip,tk) in mark.events"
                :key="tk"
                :style="getEventTipStyle(tk)"
                class="temp-slider__event__tip"
              >
                {{ tip.des }}
              </div>
              <div />
            </div>
          </template>
        </div>
        <div class="temp-slider__marks">
          <template
            v-for="(item,index) in marks"
            :key="index"
          >
            <div
              v-if="item['topMark']"
              :class="[computedPointerValue === Number(index)?'temp-slider__mark--pointer': '','temp-slider__mark','temp-slider__mark--top']"
              :style="getMarkStyle(index)"
            >
              {{ item['topMark'] }}
            </div>
            <div
              v-if="item['bottomMark']"
              :style="getMarkStyle(index,item.type)"
              :class="[computedPointerValue === Number(index)?'temp-slider__mark--pointer': '','temp-slider__mark'+'--'+item.type,'temp-slider__mark','temp-slider__mark--bottom']"
            >
              {{ item['bottomMark'] }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="temp-slider__right">
      slider__right
    </div>
  </div>
</template>

<script lang="ts">
import {  Options, Vue } from 'vue-class-component';
import { PropType, defineComponent, ref, reactive} from 'vue';
interface ISliderOption {
  max: number;      // 最大值 从0开始计数
  pastNum: number;   // 过去数量 从0 开始计数
  leftBgDescription?: string;   // 左侧背景描述
  rightBgDescription?: string;   // 右侧背景描述
}
console.log(ref(0));
console.log(reactive({a: 1}));
const c  = defineComponent({
    props: {
    },
    setup () {
        const computedPointerValue = ref<number>(0);
        const barStyle = ref<any>(null);
        const initSliderBarLeft = ref<number>(0);
        const dragging = ref<boolean>(false);
        const startX = ref<number>(0);
        return {
            computedPointerValue
        }; 
    }
});
export default class TempSlider<p=ISliderOption, max=number> extends Vue {
  public max: number = 7
  private computedPointerValue: number = 0
  private barStyle: any = null
  private initSliderBarLeft:number = 0
  private dragging: boolean = false
  private startX: number = 0
  private valueRange: number[] = [1, 3]
  private pastNum: number = 4
  private defaultOption: ISliderOption= {
      max: 16,
      pastNum: 3,
      leftBgDescription: '过去4周',
      rightBgDescription: '未来13周'
  }
  private option: ISliderOption = {
      max: 7,
      pastNum: 4,
      leftBgDescription: '过去4周',
      rightBgDescription: '未来13周'
  }
  private marks: any = {
      0: {
          topMark: '08-01',
          bottomMark: '-4',
          type: 'past',
          hasEvent: true,
          events: {
              '50': {
                  des: '双11大促'
              }
          }
      },
      1: {
          topMark: '08-02',
          bottomMark: '-3',
          type: 'past'
      },
      2: {
          topMark: '08-03',
          bottomMark: '-2',
          type: 'past',
          hasEvent: true,
          events: {
              '20': {
                  des: '双11大促'
              },
              '70': {
                  des: '双12大促'
              }
          }
      },
      3: {
          topMark: '08-04',
          bottomMark: '-1',
          type: 'past'
      },
      4: {
          topMark: '08-05',
          bottomMark: '当前周',
          type: 'now'
      },
      5: {
          topMark: '08-06',
          bottomMark: '2',
          type: 'future'
      },
      6: {
          topMark: '08-07',
          bottomMark: '3',
          type: 'future'
      }
  }
  mounted () {
      this.setBarStyleByValue();
  }
  getLeftBgStyle(){
      return {
          width: `calc((100%)/ ${this.max} * 4 - 12px)`,
          left: '-20px'
      };
  }
  getEventStyle(index: number){
      return {
          width: `calc((100%)/ ${this.max}`,
          left: 100 / (this.max) * index + '%'
      };
  }
  getEventTipStyle(precent: string) {
      return {
          left: precent + '%'
      };
  }
  getRightBgStyle(){
      console.log((this.max));
      console.log(this.max);
      return {
          width: `calc((100%)/ ${this.max} * 2 - 12px)`,
          right: '-20px'
      };
  }
  getMarkStyle(index: number, type:string){
      return {
          textAlign: 'center',
          width: type === 'now' ? '50px' : 'calc((100% - 100px)/7)',
          left: 100 / (this.max) * index + '%'
      };
  }
  getStopStyle(dot: number){
      return {
          left: 100 / (this.max) * dot + '%'
      };
  }
  setBarStyleByValue(){
      const range = this.valueRange[1] - this.valueRange[0];
      this.barStyle = {
          left: 100 / this.max * this.valueRange[0] + '%',
          width: 100 / (this.max) * range + '%'
      };
      this.computedPointerValue = this.valueRange[0] + 1;
  }
  setValueByBarStyle(){
      const value0 = Math.round(parseFloat(this.barStyle.left) / (100 / this.max));
      this.valueRange = [value0, value0+2];
      this.setBarStyleByValue();
  }
  private setBarPosition(currentX: number) {
      const sliderAreaWidth = (this.$refs as any).sliderAreaRef.clientWidth;
      const sliderBarWidth = (this.$refs as any).sliderBarref.clientWidth;
      // 拖动条left的最大比列
      const maxLeftPrecent = (sliderAreaWidth - sliderBarWidth) / sliderAreaWidth;

      // 拖动差值
      const diff = currentX - this.startX;

      // 拖动的比列
      const dragPrecent = diff / sliderAreaWidth;

      // left位置 原始left比例 + 拖动比列
      let dragPrecentOnBasic = this.initSliderBarLeft + dragPrecent;
      
      // 小于0处理
      if(dragPrecentOnBasic < 0) {
          dragPrecentOnBasic = 0;
      }
      // 大于最大比例处理
      if(dragPrecentOnBasic > maxLeftPrecent){
          dragPrecentOnBasic = maxLeftPrecent;
      }
      this.barStyle = {
          left: dragPrecentOnBasic * 100 + '%',
          width: 100 / (this.max) * 2 + '%'
      };
  }
  private onDragging(e: MouseEvent) {
      if(this.dragging){
          this.setBarPosition(e.clientX);
      }
  }
  private onDragEnd(e: MouseEvent) {
      if (this.dragging) {
          // 优化位置
          this.setValueByBarStyle();
          this.dragging = false;
          window.removeEventListener('mousemove', this.onDragging);
          window.removeEventListener('mouseup', this.onDragEnd);
      }
  }
  private onBarDown(e: MouseEvent) {
      e.preventDefault();
      this.dragging = true;
      this.startX = e.clientX;
      // 记录开始时的left百分比
      this.initSliderBarLeft = parseFloat((this.$refs as any).sliderBarref.style.left)/100;
      window.addEventListener('mousemove', this.onDragging);
      window.addEventListener('mouseup', this.onDragEnd);
  }
}
</script>
<style scoped lang="scss">
.temp-slider {
  width: 100%;
  background: #fff;
  display: flex;
  align-content: center;
  padding: 36px;
  color: #666;
  font-size: 12px;

  &__bg__des {
    position: absolute;
    top: 50%;
    font-size: 10px;
    height: 18px;
    line-height: 18px;
    transform: translateY(-50%);

    &--left {
      color: rgba(204, 204, 204, 1);
      right: 6px;
    }

    &--right {
      left: 6px;
      color: rgba(75, 162, 253, 0.4);
    }
  }

  &__bg {
    height: 22px;
    border-radius: 4px;
    position: absolute;
    top: 22px;

    &--left {
      background-color: rgba(248, 248, 248, 1);
      border: 1px dashed rgba(238, 238, 238, 1);
    }

    &--right {
      background-color: rgba(75, 162, 253, 0.08);
      border: 1px dashed rgba(75, 162, 253, 0.15);
    }
  }

  &__event {
    position: absolute;
    background-color: rgba(245, 108, 108, 1);
    height: 6px;
    top: 0;
    z-index: 888;

    &__tip {
      white-space: nowrap;
      height: 35px;
      padding: 0 10px;
      background-color: rgba(245, 108, 108, 1);
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
      border-radius: 4px;
      text-align: center;
      line-height: 35px;
      bottom: 43px;
      transform: translateX(-50%);
      position: absolute;
      z-index: 999;

      &::before {
        width: 0;
        height: 100%;
        content: '';
        display: block;
        position: absolute;
        border-left: 1px dashed rgba(245, 108, 108, 1);
        bottom: -100%;
        left: 50%;
        transform: translateX(-50%);
      }

      &::after {
        width: 0;
        height: 0;
        position: absolute;
        left: 50%;
        top: 100%;
        display: block;
        content: '';
        transform: translateX(-50%);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid rgba(245, 108, 108, 1);
      }
    }
  }

  &__mark {
    position: absolute;
    transform: translateX(-50%);
    height: 22px;
    line-height: 22px;
    font-size: 14px;
    color: rgba(102, 102, 102, 1);

    &--pointer {
      font-size: 16px;
      font-weight: weight;
      color: rgba(75, 162, 253, 1);
    }

    &--now {
      font-size: 12px;
      color: #4ba2fd;
      border: 1px solid #4ba2fd;
      border-radius: 4px;
      background: rgba(75, 162, 253, 0.15);
    }

    &--bottom {
      top: 22px;
    }

    &--top {
      bottom: 22px;
    }
  }

  &__dot {
    &--pointer {
      z-index: 880;
    }

    width: 6px;
    height: 6px;
    top: 50%;
    position: absolute;
    background: rgba(221, 221, 221, 1);
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 1);
    transform: translate(-50%, -50%);
    z-index: 990;
  }

  &__bar {
    height: 6px;
    background-color: #409eff;
    position: absolute;
    border-radius: 3px;
    z-index: 889;
  }

  &__bar__pointer {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid rgba(75, 162, 253, 1);
    background: rgba(255, 255, 255, 1);
    border-radius: 50%;

    &::after {
      position: absolute;
      left: 50%;
      top: 100%;
      display: block;
      content: '';
      width: 0;
      height: 0;
      transform: translateX(-50%);
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 9px solid rgba(75, 162, 253, 1);
    }
  }

  &__area {
    width: 100%;
    height: 6px;
    background-color: #e4e7ed;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
  }

  &__middle {
    flex: 1;
  }

  &__left {
    background: red;
  }

  &__right {
    background: blue;
  }
}
</style>
<template>
  <div
    :class="['el-tabs__active-bar', `is-${ rootTabs.props.tabPosition }`]"
    :style="barStyle"
  />
</template>
<script lang='ts'>
import { defineComponent, inject, getCurrentInstance, watch, nextTick, ref, PropType, VNode } from 'vue';
import { capitalize } from '@vue/shared';
import {  RootTabs, TabVueComponent } from './tabs.vue';

export default defineComponent({
    name: 'ElTabBar',
    props: {
        tabs: {
            type: Array as PropType<VNode[]>,
            default: () => ([])
        }
    },
    setup(props) {
        const rootTabs = inject<RootTabs>('rootTabs');
        if (!rootTabs) {
            throw new Error('ElTabBar must use with ElTabs');
        }
        const instance = getCurrentInstance();

        const getBarStyle = () => {
            let style = {} as CSSStyleDeclaration;
            let offset = 0;
            let tabSize = 0;

            const sizeName = ['top', 'bottom'].includes(rootTabs.props.tabPosition) ? 'width' : 'height';
            const sizeDir = sizeName === 'width' ? 'x' : 'y';

            props.tabs.every(tab => {
                let $el = tab.el as Element;
                if (!$el) { return false; }
                if (!$el.classList.contains('is-active')) {
                    offset += ($el as any)[`client${capitalize(sizeName)}`];
                    return true;
                } else {
                    tabSize = ($el as any)[`client${capitalize(sizeName)}`];

                    const tabStyles = window.getComputedStyle($el);

                    if (sizeName === 'width') {
                        if (props.tabs.length > 1) {
                            tabSize -= parseFloat(tabStyles.paddingLeft) + parseFloat(tabStyles.paddingRight);
                        }
                        offset += parseFloat(tabStyles.paddingLeft);
                    }
                    return false;
                }
            });

            const transform = `translate${capitalize(sizeDir)}(${offset}px)`;
            style[sizeName] = `${tabSize}px`;
            style.transform = transform;
            (style as any).msTransform = transform;
            style.webkitTransform = transform;

            return style;
        };

        const barStyle = ref(getBarStyle());

        watch(() => props.tabs, () => {
            nextTick(() => {
                barStyle.value = getBarStyle();
            });
        });

        return {
            rootTabs,
            barStyle
        };
    }
});
</script>

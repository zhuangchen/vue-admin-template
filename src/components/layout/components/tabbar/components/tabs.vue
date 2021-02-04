<script lang='ts'>
import { h, defineComponent, ref, onMounted, onUpdated, provide, watch, nextTick, getCurrentInstance, ComputedRef, PropType, Ref, ComponentInternalInstance, VNode, Component, Fragment, KeygenHTMLAttributes } from 'vue';
import TabNav from './tab-nav.vue';


type BeforeLeave = (newTabName: string, oldTabName: string) => void | Promise<void> | boolean

export interface IETabsProps {
  type: string
  activeName: string
  closable: boolean
  addable: boolean
  modelValue: string
  editable: boolean
  tabPosition: string
  beforeLeave: BeforeLeave
  stretch: boolean
}

export interface RootTabs {
  props: IETabsProps
  currentName: Ref<string>
}

export interface Tab {
  key: string
  tabName: string
  closable: boolean
  disabled: boolean
  active: ComputedRef<boolean>
  index: string
  meta: object
}
export interface TabVueComponent {
  uid: number
  instance: ComponentInternalInstance
  props: IETabsProps
  tabName: ComputedRef<string>
  active: ComputedRef<boolean>
  index: Ref<string>
  isClosable: ComputedRef<boolean>
}
export type UpdatePaneStateCallback = (tab: Tab) => void

export default defineComponent({
    name: 'ElTabs',
    components: { TabNav },
    props: {
        tabs: {
            type: Array as PropType<Tab[]>,
            default () {
                return [];
            }
        },
        type: {
            type: String,
            default: ''
        },
        activeName: {
            type: String,
            default: ''
        },
        closable: Boolean,
        addable: Boolean,
        modelValue: {
            type: String,
            default: ''
        },
        editable: Boolean,
        tabPosition: {
            type: String,
            default: 'top'
        },
        beforeLeave: {
            type: Function as PropType<BeforeLeave>,
            default: null
        },
        stretch: Boolean
    },
    emits: ['tab-click', 'edit', 'tab-remove', 'tab-add', 'input', 'update:modelValue'],
    setup(props: IETabsProps, ctx) {
        const nav$ = ref<typeof TabNav>(TabNav);
        const currentName = ref(props.modelValue || props.activeName || '0');
        provide<RootTabs>('rootTabs', {
            props,
            currentName
        });


        watch(() => props.activeName, modelValue => {
            setCurrentName(modelValue);
        });

        watch(() => props.modelValue, modelValue => {
            setCurrentName(modelValue);
        });

        watch(currentName, () => {
            if (nav$.value) {
                nextTick(() => {
                    nav$.value.$nextTick(() => {
                        nav$.value.scrollToActiveTab();
                    });
                });
            }
        });

        const changeCurrentName = (value: string)=> {
            currentName.value = value;
            ctx.emit('input', value);
            ctx.emit('update:modelValue', value);
        };

        const setCurrentName = (value:string) => {
            if(currentName.value !== value && props.beforeLeave) {
                const before = props.beforeLeave(value, currentName.value);
                if(before && (before as Promise<void>).then) {
                    (before as Promise<void>).then(() => {
                        changeCurrentName(value);
                        nav$.value && nav$.value.removeFocus();
                    }, () => {
                        // ignore promise rejection in `before-leave` hook
                    });
                } else if(before !== false) {
                    changeCurrentName(value);
                }
            } else {
                changeCurrentName(value);
            }
        };

        const handleTabClick = (tab:Tab, tabName:string, event:Event) => {
            if(tab.disabled) return;
            setCurrentName(tabName);
            ctx.emit('tab-click', tab, event);
        };

        const handleTabRemove = (tab:Tab, event:Event) => {
            if(tab.disabled) return;
            event.stopPropagation();
            ctx.emit('edit', tab, 'remove');
            ctx.emit('tab-remove', tab);
        };

        return {
            nav$,
            handleTabClick,
            handleTabRemove,
            currentName
        };

    },

    render(){
        let {
            type,
            handleTabClick,
            handleTabRemove,
            currentName,
            tabs,
            editable,
            tabPosition,
            stretch
        } = this;
 

        const header = h(
            'div',
            {
                class: ['el-tabs__header', `is-${tabPosition}`]
            },
            [
                h(
                    TabNav,
                    {
                        currentName,
                        editable,
                        tabs,
                        type,
                        stretch,
                        ref: 'nav$',
                        onTabClick: handleTabClick,
                        onTabRemove: handleTabRemove
                    }
                )
            ]
        );


        return h(
            'div',
            {
                class: {
                    'el-tabs': true,
                    'el-tabs--card': type === 'card',
                    [`el-tabs--${tabPosition}`]: true,
                    'el-tabs--border-card': type === 'border-card'
                }
            },
            tabPosition !== 'bottom' ? [header] : [ header]
        );
    }
});
</script>

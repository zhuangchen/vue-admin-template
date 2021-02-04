// 标签页属性
export interface ITabPorps {
    type: 'card' | 'border-card' | '' // 标签类型
}

// 标签项属性
export interface ITabItemProps {
    key?: string
    tabName: string
    closable: boolean
    disabled?: boolean
    active?: boolean
    index?: string
    meta?: object
}
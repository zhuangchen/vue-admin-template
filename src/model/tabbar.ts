// 标签页属性
export interface ITabPorps {
    enableContextMenu: boolean // 是否启用鼠标右键功能菜单
    type: 'card' | 'border-card' | '' // 标签类型
}

// 标签项属性
export interface ITabItem {
    key?: string
    tabName: string
    closable: boolean
    disabled?: boolean
    active?: boolean
    index?: string
    meta?: object
}
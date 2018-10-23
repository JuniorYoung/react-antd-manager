/**
 * Action类型
 */
export const SWITCH_MENU = 'SWITCH_MENU'

/**
 * Action创建函数
 */
export function switchMenu(menuName) {
    return {
        type: SWITCH_MENU,
        menuName
    }
}
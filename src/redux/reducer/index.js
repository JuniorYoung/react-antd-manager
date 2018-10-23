import { SWITCH_MENU } from './../action'
export default function (state = {}, action) {
    switch (action.type) {
        case SWITCH_MENU:
            return {
                ...state,
                menuName: action.menuName
            }
        default:
            return state
    }
}

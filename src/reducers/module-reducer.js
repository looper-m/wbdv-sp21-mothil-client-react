const initialState = {
    modules: []
}

const moduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_MODULE":
            return {
                ...state,
                modules: [
                    ...state.modules,
                    action.module
                ]
            }
        case "FIND_MODULES_FOR_COURSE":
            return {
                ...state,
                modules: action.modules
            }
        case "FIND_MODULE": //todo
            return {
                ...state,
            }
        case "UPDATE_MODULE":
            return {
                ...state,
                modules: state.modules.map(module => module._id === action.module._id ? action.module : module)
            }
        case "DELETE_MODULE":
            return {
                ...state,
                modules: state.modules.filter(module => module._id !== action.module._id)
            }
        case "RESET_MODULES":
            return {}
        default:
            return state
    }
}

export default moduleReducer
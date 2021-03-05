const initialState = {
    lessons: []
}

const lessonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_LESSON":
            return {
                ...state,
                lessons: [
                    ...state.lessons,
                    action.lesson
                ]
            }
        case "FIND_LESSONS_FOR_MODULE":
            return {
                ...state,
                lessons: action.lessons
            }
        case "FIND_LESSON": //todo
            return {
                ...state,
            }
        case "UPDATE_LESSON":
            return {
                ...state,
                lessons: state.lessons.map(lesson => lesson._id === action.lesson._id ? action.lesson : lesson)
            }
        case "DELETE_LESSON":
            return {
                ...state,
                lessons: state.lessons.filter(lesson => lesson._id !== action.lesson._id)
            }
        case "RESET_LESSONS":
            return {}
        default:
            return state
    }
}

export default lessonReducer
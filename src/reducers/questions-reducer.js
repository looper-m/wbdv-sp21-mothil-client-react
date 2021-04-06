const initialState = {
    questions: []
}

const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FIND_QUESTIONS_FOR_QUIZ":
            return {
                questions: action.questions
            }
        default:
            return state
    }
}

export default questionsReducer
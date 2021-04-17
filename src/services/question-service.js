const QUESTIONS_URL = `https://wbdv-sp21-mothil-server-node.herokuapp.com/api/quizzes`

export const findQuestionsForQuiz = (quizId) =>
    fetch(`${QUESTIONS_URL}/${quizId}/questions`)
        .then(response => response.json())

const api = {findQuestionsForQuiz}

export default api
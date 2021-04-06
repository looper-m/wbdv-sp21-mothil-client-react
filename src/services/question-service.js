const QUESTIONS_URL = `http://localhost:4000/api/quizzes`

export const findQuestionsForQuiz = (quizId) =>
    fetch(`${QUESTIONS_URL}/${quizId}/questions`)
        .then(response => response.json())

const api = {findQuestionsForQuiz}

export default api
const QUIZZES_URL = `https://wbdv-sp21-mothil-server-node.herokuapp.com/api/quizzes`

export const findAllQuizzes = () =>
    fetch(QUIZZES_URL)
        .then(response => response.json())

export const findQuizById = (quizId) =>
    fetch(`${QUIZZES_URL}/${quizId}`)
        .then(response => response.json())

export const submitQuiz = (quizId, questions) =>
    fetch(`${QUIZZES_URL}/${quizId}/attempts`,
        {
            method: 'POST',
            body: JSON.stringify(questions),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())

export const getBestAttempt = (quizId) =>
    fetch(`${QUIZZES_URL}/${quizId}/best`)
        .then(response => response.json())

const api = {findAllQuizzes, findQuizById, submitQuiz, getBestAttempt}

export default api
const QUIZZES_URL = `http://localhost:4000/api/quizzes`

export const findAllQuizzes = () =>
    fetch(QUIZZES_URL)
        .then(response => response.json())

export const findQuizById = (quizId) =>
    fetch(`${QUIZZES_URL}/${quizId}`)
        .then(response => response.json())

const api = {findAllQuizzes, findQuizById}

export default api
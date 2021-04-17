import quizService from "../../services/quiz-service";
import {connect} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const QuizzesList = (
    {
        quizzes = [],
        findAllQuizzes
    }) => {
    const {courseId} = useParams()
    const [bestScore, setBestScore] = useState(null)

    useEffect(() => {
        findAllQuizzes()
    }, [])

    const handleGetScore = (quizId) => {
        quizService.getBestAttempt(quizId)
            .then(response => {
                let current = {}
                current[quizId] = response.length === 0 ? "Not Attempted" : Math.round(response[0].score)
                setBestScore(prevState => (
                    {
                        ...prevState,
                        ...current
                    }
                ))
            })
    }

    return (
        <>
            <nav className="navbar sticky-top navbar-dark bg-primary">
                <span className="navbar-brand mr-3">
                    <Link to='/courses/table'>
                        <i className="fas fa-times fa-lg wbdv-overlay-text-color mr-3"/>
                    </Link>
                    <h3 className="d-inline wbdv-overlay-text-color align-bottom">
                        Quizzes
                    </h3>
                </span>
            </nav>
            <div className="container">
                <ul className="list-group py-3">
                    {
                        quizzes.map((quiz, index) =>
                            <li className="list-group-item d-flex justify-content-between align-items-center wbdv-standalone-text-color"
                                key={index}>
                                <strong>{quiz.title}</strong>
                                <div>
                                    {
                                        bestScore && bestScore.hasOwnProperty(quiz._id) ?
                                            <span className="badge badge-success badge-pill mr-4">
                                                {bestScore[quiz._id]}
                                            </span>
                                            :

                                            <button type="button"
                                                    className="btn btn-outline-danger btn-sm mr-4"
                                                    onClick={() => handleGetScore(quiz._id)}>
                                                &nbsp;Best Attempt&nbsp;
                                            </button>
                                    }
                                    <Link to={`/courses/${courseId}/quizzes/${quiz.title}/${quiz._id}`}
                                          className="btn btn-primary btn-sm">
                                        Start
                                    </Link>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        </>
    )
}

const stateToPropertiesMapper = (state) => ({
    quizzes: state.quizzesReducer.quizzes
})

const dispatchToPropertiesMapper = (dispatch) => ({
    findAllQuizzes: () => {
        quizService.findAllQuizzes()
            .then(quizzes => dispatch({
                type: "FIND_ALL_QUIZZES",
                quizzes
            }))
    }
})

export default connect(stateToPropertiesMapper, dispatchToPropertiesMapper)(QuizzesList)
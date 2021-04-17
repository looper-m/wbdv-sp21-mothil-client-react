import {Link, useParams} from "react-router-dom";
import questionService from "../../services/question-service";
import quizService from "../../services/quiz-service";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import MultipleChoiceQuestion from "./questions/multiple-choice-question";
import TrueFalseQuestion from "./questions/true-false-question";

const Quiz = (
    {
        questions = [],
        findQuestionsForQuiz
    }) => {
    const {courseId, quizTitle, quizId} = useParams()
    const [score, setScore] = useState(null)
    const [answered, setAnswered] = useState(null)

    useEffect(() => {
        findQuestionsForQuiz(quizId)
    }, [])

    const handleSubmitQuiz = () => {
        if (answered === null) {
            return
        }

        let currentAttempt = []
        questions.forEach(question =>
            currentAttempt.push(
                answered.hasOwnProperty(question._id) ?
                    {
                        _id: question._id,
                        correct: question.correct,
                        answer: answered[question._id]
                    } :
                    {
                        _id: question._id,
                        correct: question.correct,
                        answer: ""
                    }
            )
        )

        quizService.submitQuiz(quizId, currentAttempt)
            .then(response => {
                setScore(response.score)
            })
    }

    const setAttempt = (questionId, answer) => {
        const current = {}
        current[questionId] = answer

        setAnswered(prevState => (
            {
                ...prevState,
                ...current
            }
        ))
    }

    return (
        <>
            <nav className="navbar sticky-top navbar-dark bg-primary flex-nowrap">
                <span className="navbar-brand mr-3 wbdv-text-truncate">
                    <Link to={`/courses/${courseId}/quizzes`}>
                        <i className="fas fa-times fa-lg wbdv-overlay-text-color mr-3"/>
                    </Link>
                    <h3 className="d-inline wbdv-overlay-text-color align-bottom">
                        {quizTitle}
                    </h3>
                </span>
            </nav>
            <div className="container">
                <ul className="list-group py-3">
                    {
                        questions.map((question, index) => {
                            return (
                                <li className="list-group-item py-4"
                                    key={index}>
                                    <>
                                        {
                                            question.type === "TRUE_FALSE" &&
                                            <TrueFalseQuestion
                                                question={question}
                                                setAttempt={setAttempt}/>
                                        }
                                        {
                                            question.type === "MULTIPLE_CHOICE" &&
                                            <MultipleChoiceQuestion
                                                question={question}
                                                setAttempt={setAttempt}/>
                                        }
                                    </>
                                </li>
                            )
                        })
                    }
                </ul>
                <span className="h4">
                    Your score:
                    <span className="text-danger">
                        &nbsp;{score && Math.round(parseInt(score))}
                    </span>
                </span>
                <button type="button"
                        className={`btn btn-success btn-lg d-block float-right ${answered ? '' : 'disabled'}`}
                        onClick={handleSubmitQuiz}>
                    &nbsp;Submit&nbsp;
                </button>
            </div>
        </>
    )
}

const stateToPropertiesMapper = (state) => ({
    questions: state.questionsReducer.questions
})

const dispatchToPropertiesMapper = (dispatch) => ({
    findQuestionsForQuiz: (quizId) => {
        questionService.findQuestionsForQuiz(quizId)
            .then(questions => dispatch({
                type: "FIND_QUESTIONS_FOR_QUIZ",
                questions
            }))
    }
})

export default connect(stateToPropertiesMapper, dispatchToPropertiesMapper)(Quiz)
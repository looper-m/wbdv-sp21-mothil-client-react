import {Link, useParams} from "react-router-dom";
import questionService from "../../services/question-service";
import {connect} from "react-redux";
import {useEffect} from "react";
import MultipleChoiceQuestion from "./questions/multiple-choice-question";
import TrueFalseQuestion from "./questions/true-false-question";

const Quiz = (
    {
        questions = [],
        findQuestionsForQuiz
    }) => {
    const {courseId, quizTitle, quizId} = useParams()

    useEffect(() => {
        findQuestionsForQuiz(quizId)
    }, [])

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
                        questions.map((question, index) =>
                            <li className="list-group-item py-4"
                                key={index}>
                                <>
                                    {
                                        question.type === "TRUE_FALSE" &&
                                        <TrueFalseQuestion
                                            question={question}/>
                                    }
                                    {
                                        question.type === "MULTIPLE_CHOICE" &&
                                        <MultipleChoiceQuestion
                                            question={question}/>
                                    }
                                </>
                            </li>
                        )
                    }
                </ul>
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
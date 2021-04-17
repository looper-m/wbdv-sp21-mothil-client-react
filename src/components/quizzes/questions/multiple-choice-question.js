import {useState} from "react";

const MultipleChoiceQuestion = ({question, setAttempt}) => {
    const [answer, setAnswer] = useState("")
    const [graded, isGraded] = useState(false)

    const handleGrade = () => {
        isGraded(true)
    }

    const handleChoice = (choice) => {
        if (answer !== choice) {
            setAttempt(question._id, choice)
            isGraded(false)
            setAnswer(choice)
        }
    }

    return (
        <>
            <h3 className="d-flex justify-content-between align-items-center">
                {question.question}
                {
                    graded &&
                    (
                        question.correct === answer ?
                            <i className="fas fa-check text-success"/> : <i className="fas fa-times text-danger"/>
                    )
                }
            </h3>
            <ul className="list-group py-3">
                {
                    question.choices.map((choice, index) =>
                        <li className={`list-group-item 
                        ${graded && (choice === question.correct ? 'list-group-item-success' :
                            answer === choice && 'list-group-item-danger')}
                        `}
                            key={index}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check">
                                    <input className="form-check-input"
                                           type="radio"
                                           name={question._id}
                                           id={question._id + choice + index}
                                           value={choice}
                                           onClick={() => handleChoice(choice)}/>
                                    <label className="form-check-label"
                                           htmlFor={question._id + choice + index}>
                                        {choice}
                                    </label>
                                </div>
                                {
                                    graded && (
                                        choice === question.correct ?
                                            <i className="fas fa-check-circle text-success"/>
                                            :
                                            answer === choice && <i className="fas fa-times-circle text-danger"/>
                                    )
                                }
                            </div>
                        </li>
                    )
                }
            </ul>
            <p className="py-2">
                Your answer: <strong>{answer}</strong>
            </p>
            <button type="button"
                    className="btn btn-outline-success d-block"
                    onClick={handleGrade}>
                &nbsp;Grade&nbsp;
            </button>
        </>
    )
}

export default MultipleChoiceQuestion
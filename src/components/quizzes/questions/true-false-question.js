import {useState} from "react";

const TrueFalseQuestion = ({question}) => {
    const [answer, setAnswer] = useState("")
    const [graded, isGraded] = useState(false)

    const handleGrade = () => {
        isGraded(true)
    }

    const handleChoice = (choice) => {
        if (answer !== choice) {
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
                <li className={`list-group-item 
                        ${graded && ("true" === question.correct ? 'list-group-item-success' :
                    answer === "true" && 'list-group-item-danger')}
                        `}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="radio"
                                   name={question._id}
                                   id={question._id + 'true'}
                                   value='true'
                                   onClick={() => handleChoice("true")}/>
                            <label className="form-check-label"
                                   htmlFor={question._id + 'true'}>
                                TRUE
                            </label>
                        </div>
                        {
                            graded && (
                                "true" === question.correct ?
                                    <i className="fas fa-check-circle text-success"/>
                                    :
                                    answer === "true" && <i className="fas fa-times-circle text-danger"/>
                            )
                        }
                    </div>
                </li>
                <li className={`list-group-item 
                        ${graded && ("false" === question.correct ? 'list-group-item-success' :
                    answer === "false" && 'list-group-item-danger')}
                        `}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="radio"
                                   name={question._id}
                                   id={question._id + 'false'}
                                   value='false'
                                   onClick={() => handleChoice("false")}/>
                            <label className="form-check-label"
                                   htmlFor={question._id + 'false'}>
                                FALSE
                            </label>
                        </div>
                        {
                            graded && (
                                "false" === question.correct ?
                                    <i className="fas fa-check-circle text-success"/>
                                    :
                                    answer === "false" && <i className="fas fa-times-circle text-danger"/>
                            )
                        }
                    </div>
                </li>
            </ul>
            <p className="py-2">
                Your answer: <strong>{answer}</strong>
            </p>
            <button type="button"
                    className="btn btn-success d-block"
                    onClick={handleGrade}>
                &nbsp;Grade&nbsp;
            </button>
        </>
    )
}

export default TrueFalseQuestion
import {Link} from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import "./course-row.css";

const CourseRow = (props) => {
    const onUpdate = () => {
        props.onUpdate(props.course._id)
        props.setEditId(null)
    }

    const onDelete = () => {
        props.onDelete(props.course._id)
    }

    const setEditId = () => {
        props.setEditId(props.course._id)
    }

    const pathToCourseEditor = `/courses/table/edit/${props.course.title}/${props.course._id}`
    const pathToQuizzesList = `/courses/${props.course._id}/quizzes`

    return (
        <tr className="align-middle border-top border-bottom">
            <td className="pr-0">
                {props.editId === props.course._id
                    ? <input type="text"
                             className="form-control"
                             onChange={props.onChangeTitle}
                             defaultValue={props.course.title}/>
                    :
                    <div className="wbdv-course-title-row">
                        <Link to={pathToCourseEditor}>
                            <i className="fas fa-file-alt mr-2"/>
                            {props.course.title}
                        </Link>
                    </div>
                }
            </td>
            <td className="d-none d-md-table-cell">{props.course.owner}</td>
            <td className="d-none d-lg-table-cell">
                <Moment format="MM/DD/YYYY" date={props.course._updatedAt}/>
            </td>
            <td className="px-0">
                <Link to={pathToQuizzesList}>
                    <span className="badge badge-pill badge-primary">
                        Quizzes
                    </span>
                </Link>
                <div className="float-right">
                    {props.editId === props.course._id
                        ? <div>
                            <i className="fas fa-check-circle fa-2x text-success pr-3"
                               onClick={onUpdate}/>
                            <i className="fas fa-trash fa-2x text-danger pr-2"
                               onClick={onDelete}/>
                        </div>
                        : <i className="fas fa-edit fa-2x text-info pr-2"
                             onClick={setEditId}/>
                    }
                </div>
            </td>
        </tr>
    )
}

export default CourseRow
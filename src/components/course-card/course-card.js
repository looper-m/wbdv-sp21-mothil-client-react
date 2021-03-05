import {Link} from "react-router-dom";
import * as images from "../../images/web-courses";
import "./course-card.css";

const CourseCard = (props) => {
    let imageSource = images.noImage
    let matchLen = 0
    for (const title in images) {
        if (props.course.title.toLowerCase().includes(title) && title.length > matchLen) {
            imageSource = images[title]
            matchLen = title.length
        }
    }

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

    const pathToCourseEditor = `/courses/grid/edit/${props.course.title}/${props.course._id}`

    return (
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="card shadow-sm rounded mb-5">
                <Link to={pathToCourseEditor}>
                    <img className="card-img-top wbdv-fit-img"
                         src={imageSource}
                         alt="image-alt"/>
                </Link>
                {props.editId === props.course._id
                    ? <div className="wbdv-top-right bg-light shadow rounded p-2">
                        <i className="fas fa-check-circle fa-2x text-success pr-3"
                           onClick={onUpdate}/>
                        <i className="fas fa-trash fa-2x text-danger"
                           onClick={onDelete}/>
                    </div>
                    : <div className="wbdv-top-right bg-light shadow rounded p-2">
                        <i className="fas fa-pencil-alt fa-lg text-info"
                           onClick={setEditId}/>
                    </div>
                }
                <div className="card-body">
                    {props.editId === props.course._id
                        ? <input type="text"
                                 className="form-control"
                                 onChange={props.onChangeTitle}
                                 defaultValue={props.course.title}/>
                        : <Link to={pathToCourseEditor}>
                            <div className="font-weight-bold wbdv-text-truncate wbdv-standalone-text-color">
                                {props.course.title}
                            </div>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseCard
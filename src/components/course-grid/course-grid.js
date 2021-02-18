import {useState} from "react"
import {Link} from "react-router-dom"
import CourseCard from "../course-card/course-card"
import "./course-grid.css"

const CourseGrid = (props) => {
    const [editId, setEditId] = useState(null)

    return (
        <div>
            <div className="row mb-3 sticky-top wbdv-grid-sticky-offset bg-white py-3 justify-content-end">
                <div className="col-sm-4 h5 wbdv-standalone-text-color d-none d-md-block">
                    Recent Documents
                </div>
                <div className="col-sm-4 h5 wbdv-standalone-text-color d-none d-md-block text-center">
                    Owned by me
                    <i className="fas fa-caret-down fa-lg wbdv-fas-color pl-2"/>
                </div>
                <div className="col-sm-4 h5 wbdv-standalone-text-color text-right">
                    <i className="fas fa-folder fa-lg wbdv-fas-color pr-4"/>
                    <i className="fas fa-sort-alpha-down-alt fa-lg wbdv-fas-color pr-4"/>
                    <Link to="/">
                        <i className="fas fa-list fa-lg wbdv-fas-color pr-2"/>
                    </Link>
                </div>
            </div>
            <div className="row">
                {
                    props.courses.map(course => {
                        return (
                            <CourseCard
                                key={course._id}
                                course={course}
                                onDelete={props.onDelete}
                                onChangeTitle={props.onChangeTitle}
                                onUpdate={props.onUpdate}
                                setEditId={setEditId}
                                editId={editId}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CourseGrid
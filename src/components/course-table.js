import {Component} from "react"
import CourseRow from "./course-row"

class CourseTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editId: null
        }
    }

    setEditId = (courseId) => {
        this.setState({editId: courseId})
    }

    render() {
        return (
            <table className="table table-borderless table-hover shadow-sm rounded">
                <thead>
                <tr className="h5 wbdv-standalone-text-color">
                    <th className="sticky-top wbdv-sticky-offset bg-white">Title</th>
                    <th className="sticky-top wbdv-sticky-offset bg-white d-none d-md-table-cell">Owned by</th>
                    <th className="sticky-top wbdv-sticky-offset bg-white d-none d-lg-table-cell">Last modified</th>
                    <th className="sticky-top wbdv-sticky-offset bg-white text-right px-0">
                        <i className="fas fa-folder fa-lg wbdv-fas-color pr-4"/>
                        <i className="fas fa-sort-alpha-down-alt fa-lg wbdv-fas-color pr-4"/>
                        <i className="fas fa-th fa-lg wbdv-fas-color pr-2"
                           onClick={this.props.onToggleView}/>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.courses.map(course => {
                        return (
                            <CourseRow
                                key={course._id}
                                course={course}
                                onDelete={this.props.onDelete}
                                onChangeTitle={this.props.onChangeTitle}
                                onUpdate={this.props.onUpdate}
                                setEditId={this.setEditId}
                                editId={this.state.editId}
                            />
                        )
                    })
                }
                </tbody>
            </table>
        )
    }
}

export default CourseTable
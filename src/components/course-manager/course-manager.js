import React, {Component} from "react"
import CourseService from "../../services/course-service"
import DismissibleAlert from "../dismissible-alert"
import LoadingBar from "react-top-loading-bar"
import "./course-manager.css"
import CourseTable from "../course-table"
// import CourseGrid from "../course-grid"

const alertType = {
    WARNING: "alert-warning",
    ERROR: "alert-danger",
    SUCCESS: "alert-success",
    INFO: "alert-info"
}

//todo set more alerts, sticky add course bottom right
class CourseManager extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            toggleView: true,
            alert: null,
            newCourseValue: "",
            updatedCourseValue: ""
        }
        this.loadingRef = React.createRef()
        this.courseService = new CourseService()
    }

    handleCreateCourseChange = (event) => {
        this.setState({newCourseValue: event.target.value})
    }

    handleCreateCourse = () => {
        this.loadingRef.current.continuousStart()
        let title = this.state.newCourseValue === "" ? "NEW COURSE" : this.state.newCourseValue
        let course = {
            title: title,
            owner: "me"
        }

        this.courseService.createCourse(course).then(actualCourse => {
            this.setState({courses: [...this.state.courses, actualCourse]})
        }).finally(() => {
            this.loadingRef.current.complete()
            this.setState({newCourseValue: ""})
        })
    }

    handleDeleteCourse = (courseId) => {
        this.loadingRef.current.continuousStart()

        this.courseService.deleteCourse(courseId).then(() => {
            let filteredCourses = this.state.courses.filter(course => course._id !== courseId)
            this.setState({courses: filteredCourses})
        }).finally(() => this.loadingRef.current.complete())
    }

    handleUpdateCourseChange = (event) => {
        this.setState({updatedCourseValue: event.target.value})
    }

    handleUpdateCourse = (courseId) => {
        this.loadingRef.current.continuousStart()
        let title = this.state.updatedCourseValue

        this.courseService.findCourseById(courseId).then(retrievedCourse => {
            if (title === retrievedCourse.title || title === "") return
            let updatedCourse = {...retrievedCourse, title: title}
            this.courseService.updateCourse(retrievedCourse._id, updatedCourse).then(() => {
                let tCourses = this.state.courses // todo change to direct deconstruction like alert below
                let index = tCourses.findIndex(course => course._id === updatedCourse._id)
                tCourses[index] = updatedCourse
                this.setState({courses: tCourses})
            })
        }).catch(() => {
            this.setState({
                alert: {
                    type: alertType.ERROR,
                    message: <span>Course could <strong>not</strong> be <strong>found</strong>!</span>
                }
            })
        }).finally(() => {
            this.loadingRef.current.complete()
            this.setState({updatedCourseValue: ""})
        })
    }

    findAllCourses = () => {
        this.loadingRef.current.continuousStart()

        this.courseService.findAllCourses().then(retrievedCourses => {
            this.setState({courses: retrievedCourses})
        }).finally(() => this.loadingRef.current.complete())
    }

    handleToggleView = () => {
        this.setState({toggleView: !this.state.toggleView})
    }

    dismissAlert = () => {
        this.setState({alert: null})
    }

    componentDidMount() {
        this.findAllCourses()
    }

    render() {
        const {alert} = this.state;
        return (
            <div>
                <LoadingBar
                    color="orange"
                    shadow="true"
                    height={3}
                    waitingTime={500}
                    ref={this.loadingRef}/>
                <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-primary">
                    <div className="d-flex flex-grow-1">
                        <span className="navbar-brand mr-0 mr-md-5">
                            <a className="mr-3"
                               href="#">
                                <span className="fas fa-bars fa-lg wbdv-overlay-text-color"/>
                            </a>
                            <h3 className="d-none d-md-inline wbdv-overlay-text-color align-bottom">
                                Course Manager
                            </h3>
                        </span>
                        <div className="mt-1 w-100">
                            <div className="input-group">
                                <input type="text"
                                       className="form-control border-0 wbdv-rm-round-corners"
                                       placeholder="New Course Title"
                                       value={this.state.newCourseValue}
                                       onChange={this.handleCreateCourseChange}/>
                                <span className="input-group-append">
                                    <button className="btn wbdv-input-group-align"
                                            type="button">
                                        <i className="fas fa-plus-circle fa-inverse fa-2x wbdv-add-course-icon-color"
                                           onClick={this.handleCreateCourse}/>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="container-fluid">
                    {alert && <DismissibleAlert type={this.state.alert.type}
                                                message={this.state.alert.message}
                                                dismiss={this.dismissAlert}/>
                    }
                    <br/>

                    {/*{this.state.toggleView ?*/}
                    {/*    <CourseGrid courses={this.state.courses}*/}
                    {/*                onDelete={this.handleDeleteCourse}*/}
                    {/*                onChangeTitle={this.handleUpdateCourseChange}*/}
                    {/*                onUpdate={this.handleUpdateCourse}*/}
                    {/*                onToggleView={this.handleToggleView}/> :*/}
                        <CourseTable courses={this.state.courses}
                                     onDelete={this.handleDeleteCourse}
                                     onChangeTitle={this.handleUpdateCourseChange}
                                     onUpdate={this.handleUpdateCourse}
                                     onToggleView={this.handleToggleView}/>
                    {/*}*/}
                </div>
            </div>
        )
    }
}

export default CourseManager
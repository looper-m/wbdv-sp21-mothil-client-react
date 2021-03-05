import {Link, useHistory, useParams} from "react-router-dom";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import ModuleList from "./module-list";
import moduleReducer from "../../reducers/module-reducer";
import lessonReducer from "../../reducers/lesson-reducer";
import topicReducer from "../../reducers/topic-reducer";
import useLocationBlocker from "../location-blocker";
import LessonTabs from "./lesson-tabs";
import TopicPills from "./topic-pills";
import React, {useEffect, useState, useRef} from "react";
import LoadingBar from "react-top-loading-bar";

const store = createStore(
    combineReducers({
        moduleReducer, lessonReducer, topicReducer
    })
)

const CourseEditor = (props) => {
    const history = useHistory()
    const {courseId, courseTitle, layout} = useParams()
    const [isMounted, setIsMounted] = useState(true)
    const loadingRef = useRef(null)
    // useLocationBlocker()

    useEffect(() => {
        return () => {
            setIsMounted(false)
        }
    }, [])

    return (
        <Provider store={store}>
            <LoadingBar
                color="orange"
                shadow="true"
                height={3}
                waitingTime={500}
                ref={loadingRef}/>
            <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-primary flex-nowrap">
                <span className="navbar-brand mr-3 wbdv-text-truncate">
                    <Link to={`/courses/${layout}`}>
                        <i className="fas fa-times fa-lg wbdv-overlay-text-color mr-3"/>
                    </Link>
                    <h3 className="d-inline wbdv-overlay-text-color align-bottom">
                        {courseTitle}
                    </h3>
                </span>
                <button className="navbar-toggler border-0"
                        type="button"
                        data-toggle="collapse"
                        data-target="#wbdv-editor-navbar"
                        aria-controls="wbdv-editor-navbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="fas fa-bars fa-lg wbdv-overlay-text-color pt-0 mt-0"/>
                </button>
                <div className="collapse navbar-collapse"
                     id="wbdv-editor-navbar">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link pr-4"
                           href="#">
                            Build
                        </a>
                        <a className="nav-item nav-link active pr-4"
                           href="#">
                            Pages
                        </a>
                        <a className="nav-item nav-link pr-4"
                           href="#">
                            Apps
                        </a>
                        <a className="nav-item nav-link pr-4"
                           href="#">
                            Settings
                        </a>
                        <a className="nav-item nav-link"
                           href="#"
                           tabIndex="-1"
                           aria-disabled="true">
                            <i className="fas fa-plus fa-lg"/>
                        </a>
                    </div>
                </div>
            </nav>
            {
                // isMounted &&
                <div className="container-fluid">
                    <div className="row px-3">
                        <div className="col-sm-2 col-md-3 col-xl-2 px-0 py-3">
                            <ModuleList loadingBar={loadingRef}/>
                        </div>
                        <div className="col-sm-10 col-md-9 col-xl-10 px-2 py-3">
                            <LessonTabs loadingBar={loadingRef}/>
                            <div className="row border border-top-0 shadow-sm mx-0">
                                <TopicPills loadingBar={loadingRef}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Provider>
    )
}

export default CourseEditor
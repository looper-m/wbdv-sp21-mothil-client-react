import {useHistory} from 'react-router-dom'

const CourseEditor = (props) => {
    const history = useHistory()

    return (
        <div>
            <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-primary flex-nowrap">
                <span className="navbar-brand mr-3 wbdv-text-truncate">
                    <i className="fas fa-times fa-lg wbdv-overlay-text-color mr-3"
                       onClick={history.goBack}/>
                    <h3 className="d-inline wbdv-overlay-text-color align-bottom">
                        {props.match.params.title}
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
                            Theme
                        </a>
                        <a className="nav-item nav-link pr-4"
                           href="#">
                            Store
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
            <div className="container-fluid">
                <div className="row px-3">
                    <div className="col-sm-2 col-md-3 col-xl-2 px-0 py-3">
                        <button className="btn btn-block d-md-none border mb-1"
                                type="button"
                                data-toggle="collapse"
                                data-target="#wbdv-module-list">
                            <i className="fas fa-chevron-circle-down fa-lg wbdv-fas-color"/>
                        </button>
                        <div id="wbdv-module-list"
                             className="collapse d-md-block">
                            <ul className="list-group wbdv-blueboard-bg-comp-color p-2">
                                <li className="list-group-item list-group-item-action d-flex align-items-center justify-content-between rounded mb-2">
                                    Module 1 - jQuery
                                    <i className="fas fa-trash"/>
                                </li>
                                <li className="list-group-item list-group-item-action d-flex align-items-center justify-content-between rounded mb-2 active">
                                    Module 2 - React
                                    <i className="fas fa-trash"/>
                                </li>
                                <li className="list-group-item list-group-item-action d-flex align-items-center justify-content-between rounded mb-2">
                                    Module 3 - Redux
                                    <i className="fas fa-trash"/>
                                </li>
                                <li className="list-group-item list-group-item-action d-flex align-items-center justify-content-between rounded mb-2">
                                    Module 4 - Native
                                    <i className="fas fa-trash"/>
                                </li>
                                <li className="list-group-item list-group-item-action d-flex align-items-center justify-content-between rounded mb-2">
                                    Module 5 - Angular
                                    <i className="fas fa-trash"/>
                                </li>
                                <li className="list-group-item list-group-item-action d-flex align-items-center justify-content-between rounded mb-2">
                                    Module 6 - Node
                                    <i className="fas fa-trash"/>
                                </li>
                                <li className="list-group-item list-group-item-action d-flex align-items-center justify-content-between rounded mb-2">
                                    Module 7 - Mongo
                                    <i className="fas fa-trash"/>
                                </li>
                                <li className="list-group-item list-group-item-action wbdv-blueboard-bg-comp-color border-0">
                                    <i className="fas fa-plus-circle fa-inverse float-right"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-10 col-md-9 col-xl-10 px-2 py-3">
                        <ul className="nav nav-pills nav-fill">
                            <li className="nav-item">
                                <a className="nav-link active"
                                   href="#">
                                    Topic 1
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                   href="#">
                                    Topic 2
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                   href="#">
                                    Topic 3
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled"
                                   href="#">
                                    Topic 4
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                   href="#"><i
                                    className="fas fa-plus-circle d-inline fa-lg"/></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseEditor
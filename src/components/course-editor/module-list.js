import {useEffect, useState, useRef} from "react";
import {connect} from "react-redux";
import moduleService from "../../services/module-service";
import {Link, useParams} from "react-router-dom";
import EditableItem from "../editable-item";
import "./course-editor.css";

const ModuleList = (
    {
        modules = [],
        createModule,
        updateModule,
        deleteModule,
        findModulesForCourse,
        resetModules,
        loadingBar
    }) => {
    const {layout, courseTitle, courseId, moduleId} = useParams()
    const [selectedModule, setSelectedModule] = useState(null)

    const mounted = useRef()
    useEffect(() => {
        if (!mounted.current) {
            findModulesForCourse(courseId, loadingBar)
            mounted.current = true
        } else {
            setSelectedModuleTitle()
        }
    })

    // useEffect(() => {
    //     return () => {
    //         mounted.current = false
    //         resetModules()
    //     }
    // }, [])

    const handleCreateModule = () => {
        createModule(courseId, loadingBar)
    }

    const handleUpdateModule = (module) => {
        updateModule(module, loadingBar)
    }

    const handleDeleteModule = (module) => {
        deleteModule(module, loadingBar)
    }

    const setSelectedModuleTitle = () => {
        const selectedModule = modules.find(module => module._id === moduleId)
        setSelectedModule(selectedModule?.title)
    }

    return (
        <>
            <button className="btn btn-block btn-outline-primary d-md-none mb-1"
                    type="button"
                    data-toggle="collapse"
                    data-target="#wbdv-module-list">
                {
                    selectedModule ?
                        <div className="wbdv-text-truncate">
                            Module:<br/>
                            <strong>{selectedModule}</strong>
                        </div>
                        :
                        <i className="fas fa-chevron-circle-down fa-lg wbdv-fas-color"/>
                }
            </button>
            <div id="wbdv-module-list"
                 className="collapse d-md-block">
                <ul className="list-group wbdv-blueboard-bg-comp-color p-2">
                    {
                        modules && modules.map((module, index) =>
                            <div key={module._id + index}>
                                <Link to={`/courses/${layout}/edit/${courseTitle}/${courseId}/modules/${module._id}`}
                                      className="wbdv-blend-text-link d-md-none"
                                      data-toggle="collapse"
                                      data-target="#wbdv-module-list">
                                    <li className={`list-group-item list-group-item-action rounded mb-2 ${module._id === moduleId && "active"}`}>
                                        <EditableItem
                                            item={module}
                                            updateItem={handleUpdateModule}
                                            deleteItem={handleDeleteModule}/>
                                    </li>
                                </Link>
                                <Link to={`/courses/${layout}/edit/${courseTitle}/${courseId}/modules/${module._id}`}
                                      className="wbdv-blend-text-link d-none d-md-block">
                                    <li className={`list-group-item list-group-item-action rounded mb-2 ${module._id === moduleId && "active"}`}>
                                        <EditableItem
                                            item={module}
                                            updateItem={handleUpdateModule}
                                            deleteItem={handleDeleteModule}/>
                                    </li>
                                </Link>
                            </div>
                        )
                    }
                    <li className="list-group-item list-group-item-action d-flex justify-content-center wbdv-blueboard-bg-comp-color border-0">
                        <i onClick={handleCreateModule} className="fas fa-plus-square fa-2x fa-inverse"/>
                    </li>
                </ul>
            </div>
        </>
    )
}

const stateToPropertiesMapper = (state) => ({
    modules: state.moduleReducer.modules
})

const dispatchToPropertiesMapper = (dispatch) => ({
    createModule: (courseId, loadingBar) => {
        if (courseId === undefined) return
        loadingBar.current.continuousStart()
        moduleService.createModule(courseId, {title: "New Module"})
            .then(module => dispatch({type: "CREATE_MODULE", module}))
            .finally(() => loadingBar.current.complete())
    },
    updateModule: (module, loadingBar) => {
        loadingBar.current.continuousStart()
        moduleService.findModule(module._id)
            .then(retrievedCourse => {
                if (module.title === retrievedCourse.title || module.title === "") return
                moduleService.updateModule(module._id, module)
                    .then(() => dispatch({type: "UPDATE_MODULE", module}))
            })
            .finally(() => loadingBar.current.complete())
    },
    deleteModule: (module, loadingBar) => {
        loadingBar.current.continuousStart()
        moduleService.deleteModule(module._id)
            .then(() => dispatch({type: "DELETE_MODULE", module}))
            .finally(() => loadingBar.current.complete())
    },
    findModulesForCourse: (courseId, loadingBar) => {
        if (courseId === undefined) return
        loadingBar.current.continuousStart()
        moduleService.findModulesForCourse(courseId)
            .then(modules => dispatch({
                type: "FIND_MODULES_FOR_COURSE",
                modules: modules
            }))
            .finally(() => loadingBar.current.complete())
    },
    resetModules: () =>
        dispatch({type: "RESET_MODULES"})
})

export default connect(stateToPropertiesMapper, dispatchToPropertiesMapper)(ModuleList)
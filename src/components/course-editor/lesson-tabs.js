import {useEffect} from "react";
import {connect} from "react-redux";
import lessonService from "../../services/lesson-service";
import {Link, useParams} from "react-router-dom";
import EditableItem from "../editable-item";

const LessonTabs = (
    {
        lessons = [],
        createLesson,
        updateLesson,
        deleteLesson,
        findLessonsForModule,
        resetLessons,
        loadingBar
    }) => {
    const {layout, courseTitle, courseId, moduleId, lessonId} = useParams()

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            findLessonsForModule(moduleId, loadingBar)
        }

        return () => {
            isMounted = false
            resetLessons()
        }
    }, [courseId, moduleId])

    const handleCreateLesson = () => {
        createLesson(moduleId, loadingBar)
    }

    const handleUpdateLesson = (lesson) => {
        updateLesson(lesson, loadingBar)
    }

    const handleDeleteLesson = (lesson) => {
        deleteLesson(lesson, loadingBar)
    }

    return (
        <>
            <ul className="nav nav-tabs">
                {
                    lessons && lessons.map(lesson =>
                        <Link
                            to={`/courses/${layout}/edit/${courseTitle}/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
                            key={lesson._id}
                            className="nav-item wbdv-blend-text-link">
                            <li className={`nav-link d-flex justify-content-between ${lesson._id === lessonId && "active"}`}>
                                <EditableItem
                                    item={lesson}
                                    updateItem={handleUpdateLesson}
                                    deleteItem={handleDeleteLesson}/>
                            </li>
                        </Link>
                    )
                }
                {
                    moduleId !== undefined &&
                    <li className="nav-item">
                        <div className="nav-link">
                            <i onClick={handleCreateLesson} className="fas fa-plus-circle wbdv-fas-color d-inline fa-lg"/>
                        </div>
                    </li>
                }
            </ul>
        </>
    )
}

const stateToPropertiesMapper = (state) => ({
    lessons: state.lessonReducer.lessons
})

const dispatchToPropertiesMapper = (dispatch) => ({
    createLesson: (moduleId, loadingBar) => {
        if (moduleId === undefined) return //todo remove
        loadingBar.current.continuousStart()
        lessonService.createLesson(moduleId, {title: "New Lesson"})
            .then(lesson => dispatch({type: "CREATE_LESSON", lesson}))
            .finally(() => loadingBar.current.complete())
    },
    updateLesson: (lesson, loadingBar) => {
        loadingBar.current.continuousStart()
        lessonService.findLesson(lesson._id)
            .then(retrievedLesson => {
                if (lesson.title === retrievedLesson.title || lesson.title === "") return
                lessonService.updateLesson(lesson._id, lesson)
                    .then(() => dispatch({type: "UPDATE_LESSON", lesson}))
            })
            .finally(() => loadingBar.current.complete())
    },
    deleteLesson: (lesson, loadingBar) => {
        loadingBar.current.continuousStart()
        lessonService.deleteLesson(lesson._id)
            .then(() => dispatch({type: "DELETE_LESSON", lesson}))
            .finally(() => loadingBar.current.complete())
    },
    findLessonsForModule: (moduleId, loadingBar) => {
        if (moduleId === undefined) return

        loadingBar.current.continuousStart()
        lessonService.findLessonsForModule(moduleId)
            .then(lessons => dispatch({
                type: "FIND_LESSONS_FOR_MODULE",
                lessons: lessons
            }))
            .finally(() => loadingBar.current.complete())
    },
    resetLessons: () =>
        dispatch({type: "RESET_LESSONS"})
})

export default connect(stateToPropertiesMapper, dispatchToPropertiesMapper)(LessonTabs)
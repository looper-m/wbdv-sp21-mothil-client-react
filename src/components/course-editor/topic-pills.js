import {useEffect} from "react";
import {connect} from "react-redux";
import topicService from "../../services/topic-service";
import {Link, useParams} from "react-router-dom";
import EditableItem from "../editable-item";

const TopicPills = (
    {
        topics = [],
        createTopic,
        updateTopic,
        deleteTopic,
        findTopicsForLesson,
        resetTopics,
        loadingBar
    }) => {
    const {layout, courseTitle, courseId, moduleId, lessonId, topicId} = useParams()

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            findTopicsForLesson(lessonId, loadingBar)
        }

        return () => {
            isMounted = false
            resetTopics()
        }
    }, [lessonId])

    const handleCreateTopic = () => {
        createTopic(lessonId, loadingBar)
    }

    const handleUpdateTopic = (topic) => {
        updateTopic(topic, loadingBar)
    }

    const handleDeleteTopic = (topic) => {
        deleteTopic(topic, loadingBar)
    }

    return (
        <>
            <ul className="nav nav-pills nav-fill">
                {
                    topics && topics.map(topic =>
                        <Link
                            to={`/courses/${layout}/edit/${courseTitle}/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
                            key={topic._id}
                            className="nav-item wbdv-blend-text-link py-3">
                            <li className={`nav-link d-flex  justify-content-between ${topic._id === topicId && "active"}`}>
                                <EditableItem
                                    item={topic}
                                    updateItem={handleUpdateTopic}
                                    deleteItem={handleDeleteTopic}/>
                            </li>
                        </Link>
                    )
                }
                {
                    lessonId !== undefined &&
                    <li className="nav-item py-3">
                        <div className="nav-link">
                            <i onClick={handleCreateTopic} className="fas fa-plus wbdv-fas-color d-inline fa-lg"/>
                        </div>
                    </li>
                }
            </ul>
        </>
    )
}

const stateToPropertiesMapper = (state) => ({
    topics: state.topicReducer.topics
})

const dispatchToPropertiesMapper = (dispatch) => ({
    createTopic: (lessonId, loadingBar) => {
        if (lessonId === undefined) return
        loadingBar.current.continuousStart()
        topicService.createTopic(lessonId, {title: "New Topic"})
            .then(topic => {
                return dispatch({type: "CREATE_TOPIC", topic})
            })
            .finally(() => loadingBar.current.complete())
    },
    updateTopic: (topic, loadingBar) => {
        loadingBar.current.continuousStart()
        topicService.findTopic(topic._id)
            .then(retrievedTopic => {
                if (topic.title === retrievedTopic.title || topic.title === "") return
                topicService.updateTopic(topic._id, topic)
                    .then(() => dispatch({type: "UPDATE_TOPIC", topic}))
            })
            .finally(() => loadingBar.current.complete())
    },
    deleteTopic: (topic, loadingBar) => {
        loadingBar.current.continuousStart()
        topicService.deleteTopic(topic._id)
            .then(() => dispatch({type: "DELETE_TOPIC", topic}))
            .finally(() => loadingBar.current.complete())
    },
    findTopicsForLesson: (lessonId, loadingBar) => {
        if (lessonId === undefined) return
        loadingBar.current.continuousStart()
        topicService.findTopicsForLesson(lessonId)
            .then(topics => dispatch({
                type: "FIND_TOPICS_FOR_LESSON",
                topics: topics
            }))
            .finally(() => loadingBar.current.complete())
    },
    resetTopics: () =>
        dispatch({type: "RESET_TOPICS"})
})

export default connect(stateToPropertiesMapper, dispatchToPropertiesMapper)(TopicPills)
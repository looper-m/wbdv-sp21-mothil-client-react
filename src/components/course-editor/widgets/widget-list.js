import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import widgetService from "../../../services/widget-service";
import HeadingWidget from "./HeadingWidget";
import ParagraphWidget from "./ParagraphWidget";

const WidgetList = (
    {
        widgets = [],
        createWidget,
        updateWidget,
        deleteWidget,
        findWidgetsForTopic,
        findAllWidgets,
        resetWidgets,
        loadingBar
    }) => {
    const {topicId} = useParams()
    const [editWidget, setEditWidget] = useState({})

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            findWidgetsForTopic(topicId, loadingBar)
        }

        return () => {
            isMounted = false
            resetWidgets()
        }
    }, [topicId])

    const handleCreateWidget = () => {
        createWidget(topicId, loadingBar)
    }

    const handleUpdateWidget = () => {
        updateWidget(editWidget, loadingBar)
        setEditWidget({})
    }

    const handleDeleteWidget = () => {
        deleteWidget(editWidget, loadingBar)
        setEditWidget({})
    }

    const handleChangeWidgetType = (e) => {
        setEditWidget({...editWidget, type: e.target.value})
    }

    return (
        <>
            {
                topicId !== undefined &&
                <div className="col-sm-12 d-flex justify-content-end border-0 mb-3">
                    <i onClick={handleCreateWidget} className="fas fa-plus-square fa-2x"/>
                </div>
            }
            <ul className="col-sm-12 list-group px-0">
                {
                    widgets && widgets.map(widget =>
                        <li className="list-group-item list-group-item-action border-0 rounded mb-2"
                            key={widget.id}>
                            <span className="d-flex justify-content-between">
                                <span className="w-100 h-100 mr-4">
                                    {
                                        editWidget.id === widget.id &&
                                        <select defaultValue={widget.type}
                                                onChange={handleChangeWidgetType}
                                                className="form-control mb-3">
                                            <option value="HEADING">Heading</option>
                                            <option value="PARAGRAPH">Paragraph</option>
                                        </select>
                                    }
                                    <HeadingWidget editing={editWidget.id === widget.id}
                                                   widget={widget}
                                                   editType={editWidget.type}
                                                   setWidget={setEditWidget}/>
                                    <ParagraphWidget editing={editWidget.id === widget.id}
                                                     widget={widget}
                                                     editType={editWidget.type}
                                                     setWidget={setEditWidget}/>
                                </span>
                                {
                                    editWidget.id === widget.id ?
                                        <>
                                            <i onClick={handleUpdateWidget}
                                               className="fas fa-lg fa-check-circle pt-2 pr-2"/>
                                            <i onClick={handleDeleteWidget}
                                               className="fas fa-lg fa-times-circle pt-2"/>
                                        </>
                                        :
                                        <i onClick={() => setEditWidget(widget)}
                                           className="fas fa-lg fa-cog pt-2"/>
                                }
                            </span>
                        </li>
                    )
                }
            </ul>
        </>
    )
}

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgetReducer.widgets
})

const dispatchToPropertiesMapper = (dispatch) => ({
    createWidget: (topicId, loadingBar) => {
        if (topicId === undefined) return
        loadingBar.current.continuousStart()
        widgetService.createWidget(topicId, {type: "HEADING", size: 1, text: "New Widget"})
            .then(widget => {
                return dispatch({type: "CREATE_WIDGET", widget})
            })
            .finally(() => loadingBar.current.complete())
    },
    updateWidget: (widget, loadingBar) => {
        loadingBar.current.continuousStart()
        widgetService.findWidgetById(widget.id)
            .then(retrievedWidget => {
                // if (widget.title === retrievedWidget.title || widget.title === "") return
                widgetService.updateWidget(widget.id, widget)
                    .then(() => dispatch({type: "UPDATE_WIDGET", widget}))
            })
            .finally(() => loadingBar.current.complete())
    },
    deleteWidget: (widget, loadingBar) => {
        loadingBar.current.continuousStart()
        widgetService.deleteWidget(widget.id)
            .then(() => dispatch({type: "DELETE_WIDGET", widget}))
            .finally(() => loadingBar.current.complete())
    },
    findWidgetsForTopic: (topicId, loadingBar) => {
        if (topicId === undefined) return
        loadingBar.current.continuousStart()
        widgetService.findWidgetsForTopic(topicId)
            .then(widgets => dispatch({
                type: "FIND_WIDGETS_FOR_TOPIC",
                widgets: widgets
            }))
            .finally(() => loadingBar.current.complete())
    },
    findAllWidgets: (loadingBar) => {
        loadingBar.current.continuousStart()
        widgetService.findAllWidgets()
            .then(widgets => dispatch({
                type: "FIND_ALL_WIDGETS",
                widgets: widgets
            }))
            .finally(() => loadingBar.current.complete())
    },
    resetWidgets: () =>
        dispatch({type: "RESET_WIDGETS"})
})

export default connect(stateToPropertiesMapper, dispatchToPropertiesMapper)(WidgetList)
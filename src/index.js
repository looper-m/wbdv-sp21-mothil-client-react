import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import {combineReducers, createStore} from "redux";
import moduleReducer from "./reducers/module-reducer";
import lessonReducer from "./reducers/lesson-reducer";
import topicReducer from "./reducers/topic-reducer";
import widgetReducer from "./reducers/widget-reducer";
import quizzesReducer from "./reducers/quizzes-reducer";
import questionsReducer from "./reducers/questions-reducer";
import {Provider} from "react-redux";

const store = createStore(
    combineReducers({
        moduleReducer, lessonReducer, topicReducer, widgetReducer, quizzesReducer, questionsReducer
    })
)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

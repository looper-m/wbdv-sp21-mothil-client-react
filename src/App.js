import CourseManager from "./components/course-manager/course-manager"
import CourseEditor from "./components/course-editor"
import Home from "./components/home"
import {Switch, Route, BrowserRouter as Router} from "react-router-dom"
import React from "react"

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/courses/:layout/course-editor/:title"
                       component={CourseEditor}>
                </Route>
                <Route path="/courses/">
                    <CourseManager/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;

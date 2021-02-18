import CourseManager from "./components/course-manager/course-manager"
import {Switch, Route, BrowserRouter as Router, Redirect} from "react-router-dom"
import CourseEditor from "./components/course-editor"
import React from "react"

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/courses/course-editor/:title/:id"
                       render={(props) => <CourseEditor {...props}/>}>
                </Route>
                <Route path="/">
                <CourseManager/>
                </Route>

            </Switch>
        </Router>
    )
}

export default App;

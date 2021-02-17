import CourseManager from "./components/course-manager/course-manager";
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import CourseEditor from "./components/course-editor";

const App = () =>
    <div>
        <Router>
            <Switch>
                <Route path="/course-editor/:id">
                    <CourseEditor/>
                </Route>
                <Route path="/">
                    <CourseManager/>
                </Route>
            </Switch>
        </Router>
    </div>

export default App;

import React from "react";
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import CourseManager from "./components/course-manager/course-manager";
import CourseEditor from "./components/course-editor/course-editor";
import Home from "./components/home";
import Quiz from "./components/quizzes/quiz";
import QuizzesList from "./components/quizzes/quizzes-list";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path={[
                    "/courses/:layout/edit/:courseTitle/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId",
                    "/courses/:layout/edit/:courseTitle/:courseId/modules/:moduleId/lessons/:lessonId",
                    "/courses/:layout/edit/:courseTitle/:courseId/modules/:moduleId",
                    "/courses/:layout/edit/:courseTitle/:courseId"]}
                       component={CourseEditor}>
                    {/*render={CourseEditor}>*/}
                </Route>
                <Route exact path="/courses/:courseId/quizzes/:quizTitle/:quizId"
                       component={Quiz}>
                </Route>
                <Route exact path="/courses/:courseId/quizzes"
                       component={QuizzesList}>
                </Route>
                <Route exact path="/"
                       component={Home}>
                </Route>
                <Route path="/courses/"
                       component={CourseManager}>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;

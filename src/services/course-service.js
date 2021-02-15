export default class CourseService {
    url = 'https://wbdv-generic-server.herokuapp.com/api/001373547/users';

    createCourse = course =>
        fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())

    findAllCourses = () =>
        fetch(this.url).then(response => response.json())

    findCourseById = courseId =>
        fetch(`${this.url}/${courseId}`).then(response => response.json())

    updateCourse = (courseId, course) =>
        fetch(`${this.url}/${courseId}`, {
            method: 'PUT',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())

    deleteCourse = courseId =>
        fetch(`${this.url}/${courseId}`, {
            method: 'DELETE'
        }).then(response => response.json())
}
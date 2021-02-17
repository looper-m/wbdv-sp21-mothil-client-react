import {Component} from 'react';

class CourseEditor extends Component {
    render() {
        console.log("Mothil", this.props.match)
        return(
            <div>
                <h2>Course Editor</h2>
            </div>
        )
    }
}

export default CourseEditor
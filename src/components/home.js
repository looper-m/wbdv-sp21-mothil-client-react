import {Link} from "react-router-dom";
import {logo_banner} from '../images/blueboard'

const Home = () => {
    return (
        <>
            <div className="p-4 mt-4 mb-4 bg-white rounded container">
                <img src={logo_banner} className="mx-auto d-block mb-5 img-fluid" width="278"/>
                <h2 className="wbdv-standalone-text-color wbdv-lite-text-shadow text-center mb-2">Welcome to BlueBoard
                    course manager!</h2>
                <hr/>
                <h4>
                    <Link to="/courses/table">
                        <i className="fas fa-clipboard-list mr-2"/>
                        Course Manager
                    </Link>
                </h4>
                <br/>
            </div>
        </>
    )
}

export default Home
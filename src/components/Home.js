import { useState, useEffect } from "react"
import axios from "axios"
import apiUtils from "../utils/apiUtils"
import { useNavigate } from 'react-router-dom';

const Home = ({ isLoggedIn }) => {
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const [statusMessage, setStatusMessage] = useState();
    const [activeColor, setMsgColor] = useState("");
    const [persistedCourses, setPersistedCourses] = useState([]);

    const URL = apiUtils.getUrl()
    const navigate = useNavigate();

    const onChange = (evt) => {
        setIngredient(evt.target.value)
    }

    const search = async () => {
        const response = await axios.get(URL + '/recipes/' + ingredient)
        if (response.data.msg === 'No ingredient was found') {
            setStatusMessage("No ingredient was found")
            setMsgColor('#FF0000')
        } else if (response.data.results.length === 0) {
            setStatusMessage("No ingredient was found")
            setMsgColor('#FF0000')
        } else {
            setCourses(response.data.results)
            setStatusMessage("")
        }
    }

    const add = (course) => {
        setSelectedCourses(oldState => [...oldState, course])
        setMsgColor('#4caf50')
        setStatusMessage('Course added to menu: ' + course.title)
    }

    const toOrder = () => {
        if (persistedCourses.length > 0 && localStorage.getItem('user') != null) {
            navigate('/order')
            setStatusMessage('')
        }
        else {
            setStatusMessage('Please log in and add courses to your menu before you order.')
            setMsgColor('#FF0000')
        }
    }

    useEffect(() => {
        if (selectedCourses.length > 0) {
            localStorage.setItem('menuArr', JSON.stringify(selectedCourses))
            setPersistedCourses(JSON.parse(localStorage.getItem('menuArr')))
        }
    }, [selectedCourses]);

    return (
        <div>
            <div>
                <div className="center">

                    <input onChange={onChange} className="menuSearch" placeholder="Search for ingredient" id="search" />
                    <br></br>
                    <button onClick={search} className="btn btn-success loginButton">Search</button>
                    <button onClick={toOrder} className="btn btn-primary loginButton">Order Menu</button>
                </div>
            </div>
            <div className="courseSection">
                <p style={{ color: activeColor }} className="errorMessage" >{statusMessage}</p>
                {courses.map((c) => <div className="courseSelection" key={c.id}><img className="courseImg" src={c.image} alt="" /> <p className="courseInfo">{c.title}</p> <button onClick={() => add(c)} className="btn btn-success addToMenuButton">Add to menu</button></div>)}
            </div>
        </div>
    )
}

export default Home
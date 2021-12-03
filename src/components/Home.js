import { useState, useEffect } from "react"
import axios from "axios"
import apiUtils from "../utils/apiUtils"
import { useNavigate } from 'react-router-dom';

const Home = ({ isLoggedIn }) => {
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const [statusMessage, setStatusMessage] = useState();
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
        } else if (response.data.results.length === 0) {
            setStatusMessage("No ingredient was found")
        } else {
            setCourses(response.data.results)
            setStatusMessage("")
        }
    }

    const add = (course) => {
        console.log(course);
        setSelectedCourses(oldState => [...oldState, course])
    }

    const toOrder = () => {
        if (persistedCourses.length > 0 && localStorage.getItem('user') != null) {
            navigate('/order')
            setStatusMessage('')
        }
        else {
            setStatusMessage('Please log in and add courses to your menu before you order.')
        }
    }

    useEffect(() => {
        if (selectedCourses.length > 0) {
            localStorage.setItem('menuArr', JSON.stringify(selectedCourses))
            setPersistedCourses(JSON.parse(localStorage.getItem('menuArr')))
        }
    }, [selectedCourses]);

    useEffect(() => {
        setPersistedCourses(JSON.parse(localStorage.getItem('menuArr')))
    }, []);

    return (
        <div>
            <div className="center">
            </div>
            <div>
                <div className="center">
                    <p className="errorMessage">{statusMessage}</p>
                    <input onChange={onChange} className="menuSearch" placeholder="Search for ingredient" id="search" />
                    <br></br>
                    <button onClick={search} className="btn btn-success loginButton">Search</button>
                    <button onClick={toOrder} className="btn btn-primary loginButton">Order Menu</button>
                </div>
            </div>
            <div className="courseSection">
                {courses.map((c) => <div onClick={() => add(c)} key={c.id}><img className="courseImg" src={c.image} alt="" /> <p className="courseInfo">{c.title}</p></div>)}
            </div>
        </div>
    )
}

export default Home
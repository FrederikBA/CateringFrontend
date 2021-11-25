import { useState, useEffect } from "react"
import axios from "axios"
import apiUtils from "../utils/apiUtils"

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const URL = apiUtils.getUrl()

    const menu = { "courses": selectedCourses }

    const onChange = (evt) => {
        setIngredient(evt.target.value)
    }

    const search = async () => {
        const response = await axios.get(URL + '/recipes/' + ingredient)
        setCourses(response.data.results)
    }

    const add = (course) => {
        console.log(course);
        setSelectedCourses(oldState => [...oldState, course])
    }

    const createMenu = async () => {
        await axios.post(URL + '/menu', menu
        )
    }

    useEffect(() => {
        if (selectedCourses.length) console.log(selectedCourses);
    }, [selectedCourses]);


    return (
        <div>
            <div className="center">
                Selected courses length: {selectedCourses.length}
            </div>
            <div>
                <div className="center">
                    <input onChange={onChange} className="menuSearch" placeholder="Search for ingredient" id="search" />
                    <br></br>
                    <button onClick={search} className="btn btn-primary">Search</button>
                </div>
            </div>
            <div className="courseSection">
                {courses.map((c) => <div onClick={() => add(c)} key={c.id}><img className="courseImg" src={c.image} alt="" /> <p className="courseInfo">{c.title}</p></div>)}
            </div>
            <div className="center">
                <button onClick={createMenu} className="btn btn-primary">Create Menu</button>
            </div>
        </div>
    )
}

export default Home
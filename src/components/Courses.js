import { useState, useEffect } from "react"
import { useParams } from "react-router";
import apiUtils from "../utils/apiUtils";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const URL = apiUtils.getUrl()
  const orderNumber = parseInt(useParams().id)

  useEffect(() => {
    const getCourses = async () => {
      const response = await axios.get(URL + '/menu/courses/' + orderNumber)
      setCourses(response.data.courses);
    }
    getCourses()
  }, [URL, courses]);

  return (
    <div className="center">
      <h1>Courses</h1>
      {courses.map((c) => <div className="courseSelection" key={c.id}><img className="courseImg" src={c.image} alt="" /> <p className="courseInfo">{c.title}</p></div>)}
    </div>
  )
}

export default Courses
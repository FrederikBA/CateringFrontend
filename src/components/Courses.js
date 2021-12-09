import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router";
import apiUtils from "../utils/apiUtils";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const URL = apiUtils.getUrl()
  const orderNumber = parseInt(useParams().id)
  const navigate = useNavigate()

  useEffect(() => {
    const getCourses = async () => {
      const response = await axios.get(URL + '/menu/courses/' + orderNumber)
      setCourses(response.data.courses);
    }
    getCourses()
  }, [URL, courses]);

  const goBack = () => {
    if (localStorage.getItem('user') === 'admin') {
      navigate('/ViewOrders')
    }
    else {
      navigate('/customer')
    }
  }

  return (
    <div className="center">
      <h3>Order number: {orderNumber}</h3>
      {courses.map((c) => <div className="courseSelection" key={c.id}><img className="courseImg" src={c.image} alt="" /> <p className="courseInfo">{c.title}</p></div>)}
      <button onClick={goBack} className="btn btn-success">Go back</button>
    </div>
  )
}

export default Courses
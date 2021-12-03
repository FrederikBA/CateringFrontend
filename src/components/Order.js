import { useState } from "react"
import { useNavigate } from "react-router";
import axios from "axios"
import apiUtils from "../utils/apiUtils"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import numbers from '../utils/numbers.json'


const Order = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [servings, setServings] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const navigate = useNavigate()

  const URL = apiUtils.getUrl()

  const courses = JSON.parse(localStorage.getItem('menuArr'))

  const menu = {
    "deliveryDate": startDate,
    "courses": courses,
    "servings": servings,
    "deliveryAddress": deliveryAddress
  }

  const createMenu = async (user) => {
    user = localStorage.getItem('user')
    await axios.post(URL + '/menu/' + user, menu
    )
    setStatusMessage('Menu ordered successfully')
    localStorage.removeItem('menuArr')
    navigate('/receipt')
  }

  const updateServings = (e) => {
    setServings(e.target.value)
  }

  const updateDeliveryAddress = (e) => {
    setDeliveryAddress(e.target.value)
  }

  return (
    <div className="orderSection">
      <h2>Order Details</h2>
      <label>Servings</label>
      <br></br>
      <select onChange={updateServings} className="form-select">{numbers.map((number) => <option key={number}
        value={number}>{number}</option>)}</select>
      <br></br>
      <label>Delivery Date</label>
      <DatePicker locale="en" className="datePicker" selected={startDate}
        onChange={(date) => setStartDate(date)} />
      <label>Delivery Address</label>
      <input onChange={updateDeliveryAddress} className="form-input" type="text" />
      <p>{statusMessage}</p>
      <button onClick={createMenu} className="btn btn-success orderButton">Place order</button>
    </div>
  )
}

export default Order
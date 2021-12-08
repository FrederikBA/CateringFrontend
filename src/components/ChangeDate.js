import axios from "axios";
import { useState } from "react"
import apiUtils from "../utils/apiUtils"
import { useParams } from "react-router"
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router";


const ChangeDate = () => {
    const [startDate, setStartDate] = useState(new Date());
    const id = parseInt(useParams().id)
    const URL = apiUtils.getUrl()
    const navigate = useNavigate()


    const editDate = async () => {
        await axios.put(URL + '/menu/' + id, {
            "deliveryDate": startDate
        })
        navigate('/customer')
    }

    return (
        <div className="centerAligned">
            <h2>Edit Delivery Date</h2>
            <div className="orderSection">
                <DatePicker locale="en" className="datePicker" selected={startDate}
                    onChange={(date) => setStartDate(date)} />
                <button onClick={editDate} className="btn btn-success" >Change date</button>
            </div>
        </div>
    )
}
export default ChangeDate
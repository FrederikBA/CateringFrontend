import axios from "axios";
import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils";

const ChangeDatePage = () => {
    const URL = apiUtils.getUrl()
    const [date, setDate] = useState();


    useEffect(() => {
        const editDate = async (id) => {
            const response = await axios.get(URL + '/menu/' + id)
            setDate();

        }
        editDate()
    }, [URL]);


    return (
        <div>
                <p>EDIT DATE ERRR'</p>
        </div>
    )
}
export default ChangeDatePage
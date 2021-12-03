import axios from "axios";
import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils";

const ViewCustomer = () => {
    const URL = apiUtils.getUrl()

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const getCustomers = async () => {
            const response = await axios.get(URL + '/user/all')
            setCustomers(response.data.users);

        }
        getCustomers()
    }, [URL, customers]);

    const deleteUser = async (event) => {
        const username = event.target.id
        await axios.delete(URL + '/user/' + username)
    }

    return (
        <div>
            <table className="table table-light">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => <tr key={customer.userName}><td>{customer.userName}</td><td><button id={customer.userName} className="btn btn-danger" username={customer.userName} onClick={deleteUser}>Delete</button></td></tr>)}
                </tbody>
            </table>
        </div>
    )
};
export default ViewCustomer

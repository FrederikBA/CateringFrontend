import axios from "axios";
import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils";
import { NavLink } from "react-router-dom";

const ViewOrders = () => {
    const URL = apiUtils.getUrl()

    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const getMenus = async () => {
            const response = await apiUtils.getAuthAxios().get(URL + '/menu/all')
            setMenus(response.data.menus);

        }
        getMenus()
    }, [URL, menus]);

    const deleteMenu = async (event) => {
        const id = event.target.id
        await axios.delete(URL + '/menu/' + id)
    }

    return (
        <div>
            <table className="table table-light">
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Created</th>
                        <th>Delivery Address</th>
                        <th>Delivery Date</th>
                        <th>Number of servings</th>
                        <th>Price</th>
                        <th>Courses</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {menus.map((menu) => <tr key={menu.id}><td>{menu.id}</td><td>{menu.created}</td><td>{menu.deliveryAddress}</td><td>{menu.deliveryDate}</td><td>{menu.servings}</td><td>{menu.totalPrice}</td><td><NavLink to={`/courses/${menu.id}`}><button className="btn btn-primary">Courses</button></NavLink></td><td><button className="btn btn-danger" id={menu.id} onClick={deleteMenu}>Delete</button></td></tr>)}
                </tbody>
            </table>
        </div>
    )
};
export default ViewOrders

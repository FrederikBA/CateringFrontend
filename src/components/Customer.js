import authUtils from "../utils/authUtils"
import apiUtils from "../utils/apiUtils";
import { useState, useEffect } from "react"
import axios from "axios";
import { NavLink } from "react-router-dom";



const Customer = ({ currentRoles }) => {
  const URL = apiUtils.getUrl()
  const username = localStorage.getItem('user')
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get(URL + '/menu/' + username)
      setOrders(response.data.menus)

    }
    getOrders()
  }, [URL, orders]);

  const deleteMenu = async (event) => {
    const id = event.target.id
    await axios.delete(URL + '/menu/' + id)
  }

  
  
    return (
      <div>
        {authUtils.handleAccess('customer', currentRoles) ? < h1 > Welcome {username}, here you can see a list of every order you have made.</h1> : (<h1>You do not have the correct role to view this page</h1>)}

        <table className="table table-light">
          <thead>
            <tr>
              <th>Order number</th>
              <th>Created</th>
              <th>Delivery Address</th>
              <th>Delivery Date</th>
              <th>Number of servings</th>
              <th>Price</th>
              <th>Change Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => <tr key={order.id}><td>{order.id}</td><td>{order.created}</td><td>{order.deliveryAddress}</td><td>{order.deliveryDate}</td><td>{order.servings}</td><td>{order.totalPrice}</td><td><NavLink to={`/customer/${order.id}`}><button className="btn btn-primary">Edit</button></NavLink></td><td><button className="btn btn-danger" id={order.id} onClick={deleteMenu}>Delete</button></td></tr>)}
          </tbody>
        </table>

      </div>
    )
  };

  export default Customer
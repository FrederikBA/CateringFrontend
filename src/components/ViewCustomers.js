import axios from "axios";
import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils";

const ViewCustomer = () => {
    const URL = apiUtils.getUrl()

    const [menus, setMenus] = useState([]);

useEffect(() => {
    const getMenus = async () => {
        const response = await axios.get(URL + '/menu/all')
        setMenus(response.data.menus);
        
    }
    getMenus()
}, [URL]);

  return ( 
      <div>
          <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Delete</th>
                </tr>
            </thead>
        <tbody>
            {menus.map((menu) => <tr key={menu.userName}><td>{menu.userName}</td> </tr>)}
        </tbody>
          </table>
      </div>
  )
};
export default ViewCustomer

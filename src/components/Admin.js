import authUtils from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import ViewCustomer from "./ViewCustomers";

const Admin = ({ currentRoles }) => {
  const username = localStorage.getItem("user");

  const navigate = useNavigate();


  const viewOrder = () => {
    navigate('/vieworders')
  }

  const viewCustomer = () => {
    navigate('/viewcustomer')
  }

  return (
    <div className="center ">
      {authUtils.handleAccess("admin", currentRoles) ? (
        <h1>
          {" "}
          Welcome {username}, this is the admin page. Only users with the role:
          'admin' may access this.
        </h1>
      ) : (
        <h1>You do not have the correct role to view this page</h1>
      )}
      <button className="btn btn-success adminButtons" onClick={viewOrder}> View orders</button>
      <br></br>
      <button className="btn btn-success adminButtons" onClick={viewCustomer}>Manage customers</button>
    </div>
  );
};

export default Admin;

import authUtils from "../utils/authUtils"

const Customer = ({ currentRoles }) => {
  const username = localStorage.getItem('user')


  return (
    <div>
      {authUtils.handleAccess('customer', currentRoles) ? < h1 > Welcome {username}, this is the user page. Only users with the role: 'customer' may access this.</h1> : (<h1>You do not have the correct role to view this page</h1>)}
    </div>
  )
}

export default Customer
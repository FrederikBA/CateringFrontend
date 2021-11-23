import authUtils from "../utils/authUtils";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, currentRoles, setCurrentRoles, onLogout }) => {
    const navigate = useNavigate();

    const onClick = () => {
        onLogout()
        setCurrentRoles([])
        navigate('/')
    }

    return (
        <div>
            <ul className='header'>
                <li><NavLink activeclassname='active' to='/'>Home</NavLink></li>

                {authUtils.handleAccess('customer', currentRoles) && <li><NavLink activeclassname='active' to='/customer'>Customer</NavLink></li>}
                {authUtils.handleAccess('admin', currentRoles) && <li> <NavLink activeclassname='active' to='/admin'>Admin</NavLink></li>}

                {!isLoggedIn && <li><NavLink activeclassname='active' to='/login'>Login</NavLink></li>}
                {isLoggedIn && <button onClick={onClick} className='logout'>Logout</button>}
            </ul>
        </div >
    )
}

export default Header
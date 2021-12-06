import authUtils from "../utils/authUtils";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Header = ({ isLoggedIn, currentRoles, setCurrentRoles, onLogout }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [cartContent, setCartContent] = useState([]);

    const navigate = useNavigate();

    const onClick = () => {
        onLogout()
        setCurrentRoles([])
        navigate('/')
    }

    const openModal = () => {
        try {
            if (localStorage.getItem('menuArr').length === 0) {
                alert('Cart is empty')

            } else {
                setIsOpen(true);
                setCartContent(JSON.parse(localStorage.getItem('menuArr')))
            }
        } catch (error) {
            alert('Cart is empty')
        }
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <ul className='header'>
                <li><NavLink activeclassname='active' to='/'>Home</NavLink></li>

                {authUtils.handleAccess('customer', currentRoles) && <li><NavLink activeclassname='active' to='/customer'>Customer</NavLink></li>}
                {authUtils.handleAccess('admin', currentRoles) && <li> <NavLink activeclassname='active' to='/admin'>Admin</NavLink></li>}

                {!isLoggedIn && <li><NavLink activeclassname='active' to='/login'>Login</NavLink></li>}
                {isLoggedIn && <button onClick={onClick} className='logout'>Logout</button>}
                <FontAwesomeIcon onClick={openModal} size="2x" className="shoppingCart" icon={faShoppingCart} />
            </ul>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div>
                    <p className="styledText">You have ordered {cartContent.length} courses:</p>
                    {cartContent.map((c) => <div key={c.id}><p className="courseInfo">{c.title}</p></div>)}
                </div>
                <button onClick={closeModal} className='close btn btn-primary'>Close</button>
            </Modal>
        </div >
    )
}

export default Header
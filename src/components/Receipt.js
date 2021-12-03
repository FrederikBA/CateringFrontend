import { useNavigate } from "react-router"

const Receipt = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate('/')
  }

  return (
    <div className="center">
      <h2>Thank you for your order.</h2>
      <button onClick={toHome} className="btn btn-success">Return to frontpage</button>
    </div>
  )
}

export default Receipt
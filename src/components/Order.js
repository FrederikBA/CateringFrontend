import { useState, useEffect } from "react"
import axios from "axios"
import apiUtils from "../utils/apiUtils"

const Order = () => {
  const URL = apiUtils.getUrl()

  const courses = JSON.parse(localStorage.getItem('menuArr'))

  const menu = {
     "courses": courses,
     "servings": 2 
    }



  const createMenu = async (user) => {
    user = localStorage.getItem('user')
    await axios.post(URL + '/menu/' + user, menu
    )
  }

  return (
    <div>
      Selected courses length: {courses.length}
      <h1>Order</h1>
      <button onClick={createMenu} className="btn btn-primary loginButton">Place order</button>
    </div>
  )
}

export default Order
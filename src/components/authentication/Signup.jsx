import React from 'react';
import { useRef } from "react"
const Signup = ({ setCurrUser, setShow }) => {
  const formRef = useRef()
  const signup = async (userInfo, setCurrUser) => {
    //signup post request
    const url = "http://localhost:3001/signup"
    try {
      const response = await fetch(url, {
        method: 'post',
        headers: {
          "content-type": 'application/json',
          "accept": "application/json"
        },
        body: JSON.stringify(userInfo)
      })
      const data = await response.json()
      if (!response.ok) throw data.error
      localStorage.setItem('token', response.headers.get("Authorization"))
      setCurrUser(data)
    } catch (error) {
      console.log("error", error)
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData)
    const userInfo = {
      "user": { email: data.email, password: data.password, first_name: data.first_name, last_name: data.last_name, username: data.username }
    }
    signup(userInfo, setCurrUser)
    e.target.reset()
  }
  const handleClick = e => {
    e.preventDefault()
    setShow(true)
  }
  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        Email: <input type="email" name='email' placeholder="email" />
        <br />
        First Name: <input type="text" name='first_name' placeholder="first name" />
        <br />
        Last Name: <input type="text" name='last_name' placeholder="last name" />
        <br />
        UserName: <input type="text" name='username' placeholder="username" />
        <br />
        Password: <input type="password" name='password' placeholder="password" />
        <br />
        Confirm Password: <input type="password" name='confirmpassword' placeholder="confirm password" />
        <br />
        <input type='submit' value="Submit" />
      </form>
      <br />
      <div>Already registered, <a href="#login" onClick={handleClick} >Login</a> here.</div>
    </>
  )
}
export default Signup

import axios from "axios";
import React, { useContext, useRef } from "react";
import { Label, TextInput, Button, Checkbox } from 'flowbite-react'
import { Context } from "../context/Context";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:3001/login", {
        email: userRef.current.value,
        password: passwordRef.current.value,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  const handleClick = e => {
    e.preventDefault()
  }
  console.log(isFetching);
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center m-auto">
        <div className="max-w-md w-full m-auto mt-48 p-5 bg-white border rounded">
          <h2 className="font-medium text-2xl text-center">Login</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email1"
                  value="Your email"
                />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder=""
                required={true}
                ref={userRef}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password1"
                  value="Your password"
                />
              </div>
              <TextInput
                id="password1"
                type="password"
                required={true}
                ref={passwordRef}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                Remember me
              </Label>
            </div>
            <Button type="submit" className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>
              Submit
            </Button>
          </form>
          <div className='mt-4'>Not registered yet, <a href="/signup" onClick={handleClick} >Signup</a> </div>
        </div>
      </div>
    </>
  )
}
export default Login






import React, { useState } from "react";
import { Label, TextInput, Button, Checkbox } from 'flowbite-react'
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/outline";


function LoginForm({ handleLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);

  }

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center m-auto ">
        <div className="max-w-md w-full m-auto mt-20 md:mt-48 p-5 bg-white border drop-shadow-md hover:drop-shadow-2xl">
          <h2 className="font-medium text-2xl text-center">Login</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email"
                  value="Your email"
                />
              </div>
              <TextInput
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-2 block">
              <Label
                htmlFor="password1"
                value="Your password"
              />
            </div>
            <div className="flex-row gap-2">
              <div className="flex-row mb-1">
                <TextInput
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Button
                  onClick={togglePasswordVisibility}
                  color="green"
                >
                  {isPasswordVisible ? (
                    <EyeIcon className="h-4 w-4 text-white-500" />
                  ) : (
                    <EyeSlashIcon className="h-4 w-4 text-white-500" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                Remember me
              </Label>
            </div>
            <Button type="submit"
              className='background-color hover:bg-yellow-900'>
              Submit
            </Button>
          </form>
          <div className='mt-4 flex justify-between'>
            <div>
              <p> Not registered yet,
                <a href="/signup" className="no-underline hover:underline text-blue-500 ml-0.5" >Signup</a></p></div>
            <div>
              <p className="no-underline hover:underline text-blue-500 ml-0.5">forget password?</p>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
export default LoginForm;

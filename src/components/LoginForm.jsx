import React, { useState } from "react";
import { Label, TextInput, Button, Checkbox } from 'flowbite-react'

function LoginForm({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);

  }

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center m-auto">
        <div className="max-w-md w-full m-auto mt-48 p-5 bg-white border rounded">
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
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password1"
                  value="Your password"
                />
              </div>
              <TextInput
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <div className='mt-4'>Not registered yet, <a href="/signup" >Signup</a> </div>
        </div>
      </div>
    </>
  )
}
export default LoginForm






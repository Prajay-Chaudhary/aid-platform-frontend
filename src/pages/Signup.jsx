
// const Signup = () => {
//   const formRef = useRef()
//   const [error, setError] = useState(false)
//   const signup = async (userInfo) => {
//     //signup post request
//     const url = "http://127.0.0.1:3001/signup"
//     try {
//       const response = await fetch(url, {
//         method: 'post',
//         headers: {
//           "content-type": 'application/json',
//           "accept": "application/json"
//         },
//         body: JSON.stringify(userInfo)
//       })
//       const data = await response.json()
//       if (!response.ok) throw data.error
//       localStorage.setItem('token', response.headers.get("Authorization"))
//       window.location.replace("/login"); //redirect to login page
//     } catch (error) {
//       setError(true)
//     }
//   }
//   //handle submit button
//   const handleSubmit = e => {
//     e.preventDefault()
//     setError(false)
//     const formData = new FormData(formRef.current)
//     const data = Object.fromEntries(formData)
//     const userInfo = {
//       "user": { email: data.email, password: data.password, first_name: data.first_name, last_name: data.last_name, username: data.username }
//     }
//     signup(userInfo)
//     e.target.reset()
//   }
import axios from "axios";
import React, { useState } from 'react';
import { Label, TextInput, Button, Checkbox, FileInput } from 'flowbite-react'

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://127.0.0.1:3001/signup", {
        // username,
        // email,
        // password,
        // firstname,
        // lastname
        email,
        first_name: firstname,
        last_name: lastname,
        password: password,
        username: username

      }, {
        headers: {
          "content-type": 'application/json',
          "accept": "application/json"
        }
      });
      res.data && window.location.replace("http://127.0.0.1:3001/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center m-auto">
        <div className="max-w-lg w-full m-auto mt-10 p-5 bg-white border rounded">
          <h2 className="font-medium text-2xl text-center">Signup</h2>
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="text"
                  value="First Name:"
                />
              </div>
              <TextInput
                id="firstname"
                type="text"
                placeholder=""
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="text"
                  value="Last Name:"
                />
              </div>
              <TextInput
                id="lastname"
                type="text"
                placeholder=""
                onChange={(e) => setLastname(e.target.value)}

              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="text"
                  value="User Name:"

                />
              </div>
              <TextInput
                id="username"
                type="text"
                placeholder=""
                onChange={(e) => setUsername(e.target.value)}

              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password"
                  value="Your password"
                />
              </div>
              <TextInput
                id="password1"
                type="password"
                onChange={(e) => setPassword(e.target.value)}

              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password"
                  value="Confirm password"
                />
              </div>
              <TextInput
                id="password1"
                type="password"

              />
            </div>
            <div id="fileUpload">
              <div className="mb-2 block">
                <Label
                  htmlFor="file"
                  value="Upload file"
                />
              </div>
              <FileInput
                id="file"
                helperText="Upload your identity *(approved formats: .jpg, .png, .pdf only)"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                Remember me
              </Label>
            </div>
            <Button type="submit" className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-full'>
              SignIn
            </Button>
            {error && < span className='text-red-600 mt-1'>Something went wrong!</span>}
          </form>
          <div className='mt-4'>Already registered, <a href="/login" >Login</a> here.</div>
        </div>
      </div >
    </>
  )
}
export default Signup




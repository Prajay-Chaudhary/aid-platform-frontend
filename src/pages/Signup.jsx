import React, { useState } from 'react';
import { Label, TextInput, Button, Checkbox, FileInput } from 'flowbite-react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username,
            email,
            password,
            first_name: firstName,
            last_name: lastName
          }
        })
      });
      const json = await res.json();
      console.log(json);
      navigate('/login'); // Navigate to the login page
      // Redirect to login page or any other page you want
    } catch (err) {
      console.error(err);
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
                name="email1"
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
                name="firstname"
                type="text"
                placeholder=""
                onChange={(e) => setFirstName(e.target.value)}
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
                name="lastname"
                type="text"
                placeholder=""
                onChange={(e) => setLastName(e.target.value)}

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
                name="username"
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
                id="password"
                name="password"
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
                id="password"
                name="password"
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




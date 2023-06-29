import React, { useState } from 'react';
import { Label, TextInput, Button, FileInput } from 'flowbite-react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null); // Store the selected file image as a state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a new FormData object
    formData.append('user[username]', username);
    formData.append('user[email]', email);
    formData.append('user[password]', password);
    formData.append('user[first_name]', firstName);
    formData.append('user[last_name]', lastName);
    formData.append('user[files]', file); // Append the files to the form data
    setError(false);
    try {
      const res = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        body: formData // Send the form data instead of JSON
      });
      const json = await res.json();
      console.log(json);
      navigate('/login'); // Navigate to the login page
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };



  return (
    <>
      <div className="w-full h-screen flex items-center justify-center m-auto">
        <div className="max-w-lg w-full m-auto mt-10 p-5 bg-white border rounded drop-shadow-md hover:drop-shadow-2xl rounded-lg">
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
                  value="Upload your Id:"
                />
              </div>
              <FileInput
                id="file"
                helperText="Upload your identity *(approved formats: .jpg, .png, .pdf only)"
                name="file"
                multiple={false}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <Button type="submit" className='background-color hover:bg-yellow-900 rounded-full'>
              SignIn
            </Button>
            {error && < span className='text-red-600 mt-1'>Something went wrong!</span>}
          </form>
          <div className='mt-4'>Already registered, <a href="/login" className="no-underline hover:underline text-blue-500" >Login</a> here.</div>
        </div>
      </div >
    </>
  )
}
export default Signup





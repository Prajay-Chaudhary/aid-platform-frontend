// import React, { useState } from "react";
// import { Label, TextInput, Button, Checkbox } from 'flowbite-react'

// function LoginForm({ handleLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleLogin(email, password);

//   }

//   return (
//     <>
//       <div className="w-full h-screen flex items-center justify-center m-auto ">
//         <div className="max-w-md w-full m-auto mt-20 md:mt-48 p-5 bg-white border drop-shadow-md hover:drop-shadow-2xl">
//           <h2 className="font-medium text-2xl text-center">Login</h2>
//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//             <div>
//               <div className="mb-2 block">
//                 <Label
//                   htmlFor="email"
//                   value="Your email"
//                 />
//               </div>
//               <TextInput
//                 type="email"
//                 name="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <div className="mb-2 block">
//                 <Label
//                   htmlFor="password1"
//                   value="Your password"
//                 />
//               </div>
//               <TextInput
//                 type="password"
//                 name="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="flex items-center gap-2">
//               <Checkbox id="remember" />
//               <Label htmlFor="remember">
//                 Remember me
//               </Label>
//             </div>
//             <Button type="submit"
//               className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>
//               Submit
//             </Button>
//           </form>
//           <div className='mt-4 flex justify-between'>
//             <div>
//               <p> Not registered yet,
//                 <a href="/signup" className="no-underline hover:underline text-blue-500 ml-0.5" >Signup</a></p></div>
//             <div>
//               <p className="no-underline hover:underline text-blue-500 ml-0.5">forget password?</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
// export default LoginForm






import React, { useState } from "react";
import { Label, TextInput, Button, Checkbox } from 'flowbite-react'

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
            <div>
              <div>
                <TextInput
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  className="absolute inset-y-0 right-0 flex items-center text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
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
              className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>
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

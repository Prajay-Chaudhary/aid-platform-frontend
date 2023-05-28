import React from 'react'
import landingPageImage from '../images/landingPageImage.png'
import { Button } from 'flowbite-react'

const Home = () => {
  const current_user = JSON.parse(sessionStorage.getItem('token'))

  if (current_user) {
    window.location = '/request'
  }

  return (
    <>
      <div className='md:flex justify-center h-screen mt-4 md:mt-0'>
        <div className='m-auto'>
          <p className='md:text-7xl text-5xl font-extrabold text-rose-800 text-center'>AID</p>
          <p className='md:text-7xl text-5xl font-extrabold text-rose-800 text-center'>PLATFORM</p>
          <p className='md:text-6xl text-4xl font-bold text-black text-center'>help people Near You!</p>
          <div className='flex flex-row my-9 justify-center gap-2 md:gap-4'>
            <Button type="button"
              href="/login"
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm sm:px-6 px-4 sm:py-2.5 py-2 text-center mr-2 mb-2 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" >Sign in!</Button>
            <Button
              type="button"
              href="/signup"
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm sm:px-6 px-4 sm:py-2.5 py-2 text-center mr-2 mb-2 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Sign up!</Button>
          </div>
        </div>
        <div className="m-auto">
          <img
            alt="slogan"
            src={landingPageImage}
            className="h-auto max-w-full rounded-lg"
          />
        </div>
      </div>
    </>
  )
}

export default Home

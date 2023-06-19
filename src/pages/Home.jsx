import React from 'react'
import landingPageImage from '../images/landingPageImage.png'
import { Button } from 'flowbite-react'

const Home = () => {
  const token = JSON.parse(sessionStorage.getItem('token'))

  if (token) {
    window.location = '/request'
  }

  return (
    <>
      <div className='md:flex justify-center h-screen mt-4 md:mt-0'>
        <div className='m-auto'>
          <p className='md:text-7xl text-5xl font-extrabold txt-color text-center'>AID</p>
          <p className='md:text-7xl text-5xl font-extrabold txt-color text-center'>PLATFORM</p>
          <p className='md:text-6xl text-4xl font-bold text-black text-center'>help people Near You!</p>
          <div className='flex flex-row my-9 justify-center gap-2 md:gap-4'>
            <Button type="button"
              href="/login"
              color="gray"
              outline
              size="xl"
              className="hover:text-yellow-900" >Sign in!</Button>
            <Button
              type="button"
              href="/signup"
              size="xl"
              className="text-white background-color hover:bg-yellow-900 ">Sign up!</Button>
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

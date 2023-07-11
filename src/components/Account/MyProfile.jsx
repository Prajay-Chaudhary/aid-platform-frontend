import React from 'react'
import { Label, TextInput, Avatar } from 'flowbite-react';
import { user } from '../../utils/auth';

const MyProfile = () => {

  return (
    <>
      <div>
        {user && (
          <div>
            <div className="w-full h-screen flex items-center justify-center m-auto ">
              <div className="max-w-md w-full m-auto mt-20 md:mt-48 p-5 bg-white border drop-shadow-md hover:drop-shadow-2xl rounded-lg">
                <div className='flex items-center justify-center mt-5'>
                  <div className="flex flex-wrap gap-2">
                    <Avatar rounded />
                  </div>
                </div>
                <h2 className="font-medium text-2xl text-center"><span>{user.first_name}</span> <span>{user.last_name}</span></h2>
                <form className="flex flex-col gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="email"
                        color="black"
                        value="Email address"
                      />
                    </div>
                    <TextInput
                      type="email"
                      name="email"
                      id="email"
                      value={user.email}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        color="black"
                        htmlFor="first-name"
                        value="First name"
                      />
                    </div>
                    <TextInput
                      type="email"
                      id="last-name"
                      value={user.first_name}
                    />
                  </div>
                  <div className='mb-3'>
                    <div className="mb-2 block">
                      <Label
                        color="black"
                        htmlFor="last-name"
                        value="Last name"
                      />
                    </div>
                    <TextInput
                      type="email"
                      id="last-name"
                      value={user.last_name}
                    />
                  </div>
                </form>

              </div>
            </div >
          </div>
        )}
      </div>
    </>
  )
}

export default MyProfile
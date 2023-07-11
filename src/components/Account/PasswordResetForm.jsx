import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, TextInput } from "flowbite-react";
import API_BASE_URL from '../../config/apiConfig';

const PasswordResetForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/users/password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('Password reset instructions have been sent to your email');
      } else {
        toast.error('Failed to send password reset instructions');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while processing your request');
    }
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center m-auto">
        <div className="max-w-md w-full m-auto mt-20 md:mt-48 p-5 bg-white border drop-shadow-md hover:drop-shadow-2xl">
          <h2 className="font-medium text-2xl text-center mb-4">Reset your password</h2>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <div>
                <TextInput
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required="true"
                />
              </div>
              <div className='flex justify-center mt-5'>
                <Button type="submit"
                  className='background-color hover:bg-yellow-900'>
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordResetForm;
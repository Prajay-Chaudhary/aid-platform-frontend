import React, { useState } from 'react';
import * as Yup from 'yup';
import { Label, Button, TextInput } from "flowbite-react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import API_BASE_URL from '../../config/apiConfig';

const PasswordUpdate = () => {
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(sessionStorage.getItem('token'));
  const user = JSON.parse(sessionStorage.getItem('user'));

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required('Current password is required'),
    password: Yup.string().required('New password is required'),
    confirmPassword: Yup.string()
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/password/update`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}` // send authorized token to the server
        },
        body: JSON.stringify({
          user: {
            email: user.email,
            current_password: data.currentPassword,
            password: data.password,
            password_confirmation: data.confirmPassword,
          },
        }),
      });
      const { notice } = await response.json(); // Extract the notice from the response JSON
      if (response.ok) {
        // Remove token from session storage
        sessionStorage.removeItem('token');
        toast.success('Password updated successfully, please login!');
        // Delay the redirect to the login page by 2 second
        setTimeout(() => {
          window.location = '/login';
        }, 2000);
      } else {
        toast.error(notice || 'Error updating password');
      }
    } catch (error) {
      toast.error('Error updating password');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="w-full h-screen flex items-center justify-center m-auto">
        <div className="max-w-md w-full m-auto mt-20 md:mt-48 p-5 bg-white border drop-shadow-md hover:drop-shadow-2xl rounded-lg">
          <h2 className="font-medium text-2xl text-center">Update your password</h2>
          <div className="p-4">
            <Formik
              initialValues={{
                currentPassword: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col gap-4">
                  <div className="relative">
                    <Label htmlFor="currentPassword">Current password *</Label>
                    <Field name="currentPassword">
                      {({ field }) => (
                        <TextInput
                          {...field}
                          id="currentPassword"
                          type="password"
                          placeholder="******"
                          className={`form-input ${errors.currentPassword && touched.currentPassword ? 'error' : ''}`}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="currentPassword"
                      component="span"
                      className="text-red-500"
                    />
                  </div>

                  <div className="relative">
                    <Label htmlFor="password">New password *</Label>
                    <Field name="password">
                      {({ field }) => (
                        <TextInput
                          {...field}
                          id="password"
                          type="password"
                          placeholder="******"
                          className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-red-500"
                    />
                  </div>

                  <div className="relative">
                    <Label htmlFor="confirmPassword">Confirm password *</Label>
                    <Field name="confirmPassword">
                      {({ field }) => (
                        <TextInput
                          {...field}
                          id="confirmPassword"
                          type="password"
                          placeholder="******"
                          className={`form-input ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="confirmPassword"
                      component="span"
                      className="text-red-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-blue-400 text-white"
                    disabled={loading}
                  >
                    Update
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordUpdate;

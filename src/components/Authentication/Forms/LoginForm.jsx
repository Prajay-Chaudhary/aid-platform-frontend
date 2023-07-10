import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { Label, Button, Checkbox } from 'flowbite-react';

const LoginForm = ({ handleLogin }) => {

  const [isPasswordVisible, setPasswordVisibility] = useState(false);


  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  //attempts to log in by calling the handleLogin function with the provided email and password
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await handleLogin(values.email, values.password);
    } catch (error) {
      // Login failed, handle the error
    } finally {
      setSubmitting(false);
    }
  };


  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center m-auto ">
        <div className="max-w-md w-full m-auto mt-20 md:mt-48 p-5 bg-white border drop-shadow-md hover:drop-shadow-2xl rounded-lg">
          <h2 className="font-medium text-2xl text-center">Login</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col gap-4">
                <div>
                  <div className="mb-3 block">
                    <Label htmlFor="email">Your email</Label>
                  </div>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className={`form-input ${errors.password && touched.password ? 'error' : ''} w-full rounded-lg`}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500" />
                </div>

                <div className="block">
                  <Label htmlFor="password">Your password</Label>
                </div>
                <Field
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  className={`form-input ${errors.password && touched.password ? 'error' : ''} w-full rounded-lg`}
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
                <div>
                  <Button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="bg-white border-yellow-900"
                  >
                    {isPasswordVisible ? (
                      <EyeIcon className="h-4 w-4 text-white" />
                    ) : (
                      <EyeSlashIcon className="h-4 w-4 text-black" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">
                    Remember me
                  </Label>
                </div>
                <Button type="submit" className="background-color hover:bg-yellow-900">
                  Submit
                </Button>
              </Form>

            )}
          </Formik>
          <div className='flex flex-row justify-between'>
            <div className="mt-4">
              not regestered yet? <a href="/signup" className="no-underline hover:underline text-blue-500">sign up</a> here.
            </div>
            <div className="mt-4">
              <a href="/password-reset" className="no-underline hover:underline text-blue-500">forgot password?</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

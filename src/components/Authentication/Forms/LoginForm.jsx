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
                  <div className="mb-2 block">
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

                <div className="mb-2 block">
                  <Label htmlFor="password">Your password</Label>
                </div>
                <div className="flex-row gap-2">
                  <div className="flex-row mb-1">
                    <Field
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      className={`form-input ${errors.password && touched.password ? 'error' : ''} w-full rounded-lg`}
                    />
                  </div>
                  <div>
                    <Button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="background-color hover:bg-yellow-900"
                    >
                      {isPasswordVisible ? (
                        <EyeIcon className="h-4 w-4 text-white-500" />
                      ) : (
                        <EyeSlashIcon className="h-4 w-4 text-white-500" />
                      )}
                    </Button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500" />
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
        </div>
      </div>
    </>
  );
};

export default LoginForm;

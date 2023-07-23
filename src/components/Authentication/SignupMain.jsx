import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Label, TextInput, Button, FileInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/apiConfig';

const SignupMain = () => {
  const navigate = useNavigate();

  //form initial values
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
    passwordConfirmation: '',
    file: null
  });

  //defines a validation schema using Yup for form validation
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required *'),
    password: Yup.string().min(8).required('Password is required *'),
    firstName: Yup.string().required('First name is required *'),
    lastName: Yup.string().required('Last name is required *'),
    username: Yup.string().required('Username is required *'),
    file: Yup.mixed().required('Please upload your ID *'),
    passwordConfirmation: Yup.string()
      .required()
      .oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
      )
  });

  //an asynchronous function that handles the submission of the form data to the backend server
  //and displaying appropriate toast messages based on the response from the server.
  const handleSubmitExternally = async (values) => {
    const { email, firstName, lastName, username, password, file } = values; //extracts the individual field values from values obj

    // creates a new instance of FormData and appends the field values to it
    const formData = new FormData();
    formData.append('user[username]', username);
    formData.append('user[email]', email);
    formData.append('user[password]', password);
    formData.append('user[first_name]', firstName);
    formData.append('user[last_name]', lastName);
    formData.append('user[file]', file);


    //POST request to the endpoint
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        toast.success('Signup successful!');
        navigate('/login'); // Navigate to the login page
      } else {
        const json = await response.json();

        //error message is obtained from the response JSON data and shows it
        if (json.status && json.status.message) {
          toast.error(json.status.message);
        } else {
          toast.error('Something went wrong!');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };



  return (
    <div className="w-full h-screen flex items-center justify-center mb-[180px]">
      <div className="max-w-lg w-full m-auto mt-10 p-5 bg-white border rounded drop-shadow-md hover:drop-shadow-2xl rounded-lg">
        <h2 className="font-medium text-2xl text-center">Signup</h2>
        {/* used to wrap the form and handle its submission */}
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleSubmitExternally(values);
            actions.setSubmitting(false);
          }}
        >
          {({ handleSubmit, errors, touched, isSubmitting, setFieldValue, values }) => (
            <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email" value="Your email" />
                <Field name="email">
                  {({ field }) => (
                    <div>
                      <TextInput
                        {...field}
                        id="email"
                        name="email"
                        type="email"
                        as={TextInput}
                        value={values.email} // Bind value to the state variable
                        className={`form-control ${errors.email && touched.email ? 'error' : ''}`}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage name="email" component="span" className="text-red-600 mt-1" />
              </div>
              <div>
                <Label htmlFor="firstName" value="First Name" />
                <Field name="firstName">
                  {({ field }) => (
                    <div>
                      <TextInput
                        {...field}
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={values.firstName}
                        as={TextInput}
                        className={`form-control ${errors.firstName && touched.firstName ? 'error' : ''}`}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage name="firstName" component="span" className="text-red-600 mt-1" />
              </div>
              <div>
                <Label htmlFor="lastName" value="Last Name" />
                <Field name="lastName">
                  {({ field }) => (
                    <div >
                      <TextInput
                        {...field}
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={values.lastName}
                        as={TextInput}
                        className={`form-control ${errors.lastName && touched.lastName ? 'error' : ''}`}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage name="lastName" component="span" className="text-red-600 mt-1" />
              </div>
              <div>
                <Label htmlFor="username" value="Username" />
                <Field name="username">
                  {({ field }) => (
                    <div>
                      <TextInput
                        {...field}
                        id="username"
                        name="username"
                        type="text"
                        value={values.username}
                        as={TextInput}
                        className={`form-control ${errors.username && touched.username ? 'error' : ''}`}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage name="username" component="span" className="text-red-600 mt-1" />
              </div>
              <div>
                <Label htmlFor="password" value="Password" />
                <Field name="password">
                  {({ field }) => (
                    <div>
                      <TextInput
                        {...field}
                        id="password"
                        name="password"
                        type="password"
                        value={values.password}
                        as={TextInput}
                        className={`form-control ${errors.password && touched.password ? 'error' : ''}`}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage name="password" component="span" className="text-red-600 mt-1" />
              </div>
              <div>
                <Label htmlFor="passwordConfirmation" value="Confirm Password" />
                <Field name="passwordConfirmation">
                  {({ field }) => (
                    <div>
                      <TextInput
                        {...field}
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type="password"
                        value={field.value || ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        as={TextInput}
                        className={`form-control ${errors.passwordConfirmation && touched.passwordConfirmation ? 'error' : ''}`}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage name="passwordConfirmation" component="span" className="text-red-600 mt-1" />
              </div>
              {/* File input */}
              <div id="fileUpload">
                <Label htmlFor="file" value="Upload your ID" />
                <FileInput
                  id="file"
                  name="file"
                  accept=".jpg, .png, .pdf"
                  multiple={false}
                  helperText="Upload your identity *(approved formats: .jpg, .png, .pdf only)"
                  //handle changes in the file input field and update the corresponding value in Formik's form state.
                  onChange={(event) => setFieldValue("file", event.target.files[0])}
                />
                <ErrorMessage name="file" component="span" className="text-red-600 mt-1" />
              </div>

              <Button
                type="submit"
                className="background-color hover:bg-yellow-900 rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Sign Up'}
              </Button>
            </Form>
          )}
        </Formik>
        <div className="mt-4">
          Already registered? <a href="/login" className="no-underline hover:underline text-blue-500">Login</a> here.
        </div>
      </div>
    </div>
  );
};

export default SignupMain;








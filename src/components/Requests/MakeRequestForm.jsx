import React, { useState } from 'react';
import { Label, Textarea, Radio, FileInput, Button, TextInput } from 'flowbite-react';
import { MapPinIcon, DocumentIcon, DocumentTextIcon, XCircleIcon } from "@heroicons/react/24/outline";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const MakeRequestForm = ({ setModalOn }) => {
  const [requestData, setRequestData] = useState("");
  const [address, setAddress] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requestType, setRequestType] = useState("");
  const [images, setImages] = useState(null); // Store the selected image as a state

  const token = JSON.parse(sessionStorage.getItem('token'));
  const current_user = JSON.parse(sessionStorage.getItem('user'));

  const handleCancelClick = () => {
    setModalOn(false)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a new FormData object
    formData.append('request[owner_id]', current_user.id);
    formData.append('request[address]', address);
    formData.append('request[title]', title);
    formData.append('request[description]', description);
    formData.append('request[request_type]', requestType);
    formData.append('request[images]', images); // Append the image to the form data
    console.log("form data", formData);

    try {
      const res = await fetch('http://localhost:3001/requests', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData // Send the form data instead of JSON
      });
      const json = await res.json();
      setRequestData(json);
      console.log("request data:", json);
      window.location = '/requests'; // Navigate to the request page
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <div className="bg-gray-800 bg-opacity-50 fixed inset-0 flex items-center justify-center shadow-lg z-50">
        <div className="flex h-screen w-screen justify-center items-center ">
          <div className="flex-col justify-center bg-white py-10 px-8 rounded-xl shadow-xl">
            <div className='flex float-right pl-0.5'>
              <button onClick={handleCancelClick} className='absolute  right-30 top-10'>
                <XCircleIcon className="h-9 w-20 text-red-600" />
              </button>
            </div>
            <div>
              <h1 className='txt-color font-bolder text-4xl'>Create a new request</h1>
            </div>
            <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
              <div>
                <div className="mb-2 flex-row">
                  <div className='flex mb-2'>
                    <Label
                      htmlFor="base"
                      value="Address:"
                      className=' font-extrabold'
                    />
                    <div>
                      <MapPinIcon className="h-6 w-6 txt-color" />
                    </div>
                  </div>
                  <div className='mb-3'>
                    <GooglePlacesAutocomplete
                      apiKey="AIzaSyDnYe4Bf7o8tg27Hkuf7vd_ynFBHcXrfvM"
                      selectProps={{
                        onChange: (address) => setAddress(address.label),
                      }}

                    />
                  </div>
                  <div className="mb-2 flex-row font-extrabold">
                    <div className='flex mb-2'>
                      <Label
                        htmlFor="base"
                        value="Title:"
                        className='font-extrabold'
                      />
                      <div>
                        <DocumentIcon className="h-6 w-6 txt-color" />
                      </div>
                    </div>
                  </div>
                  <TextInput
                    htmlFor="base"
                    id='title:'
                    size='md'
                    className='mb-2'
                    onChange={(e) => setTitle(e.target.value)}

                  >

                  </TextInput>

                  <div className="mb-2 flex-row font-extrabold">
                    <div className='flex mb-2'>
                      <Label
                        htmlFor="base"
                        value="Description:"
                        className=' font-extrabold'
                      />
                      <div>
                        <DocumentTextIcon className="h-6 w-6 txt-color" />
                      </div>
                    </div>

                  </div>
                  <Textarea
                    id="comment"
                    placeholder="should be maximum 300 characters."
                    required
                    rows={4}
                    className='mb-2'
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <fieldset
                  className="flex flex-row gap-4 mb-3"
                  id="radio"
                >
                  <legend>
                    Request Type:
                  </legend>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="OneTimeHelp"
                      name="requestType"
                      value="OneTimeHelp"
                      onChange={() => setRequestType("One Time Help")} // Set the selected request type directly
                    />
                    <Label htmlFor="OneTimeHelp">
                      One Time Help
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="MaterialNeed"
                      name="requestType"
                      value="MaterialNeed"
                      onChange={() => setRequestType("Material Need")} // Set the selected request type directly
                    />
                    <Label htmlFor="MaterialNeed">
                      Material Need
                    </Label>
                  </div>
                </fieldset>

                <div id="fileUpload">
                  <div className="mb-2 flex-row">
                    <div className='flex mb-2'>
                      <Label
                        htmlFor="base"
                        value="Upload: "
                        className=' font-extrabold'
                      />
                      <div>
                        <p className='text-red-500'>(only one photo)</p>
                      </div>
                    </div>

                  </div>
                  <FileInput
                    helperText="accepeted .jpg, .jpeg, .png only. Must be less than 5mb."
                    id="file"
                    name="image"
                    multiple={false}
                    onChange={(e) => setImages(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button type="submit" className=" bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 " >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  );
}

export default MakeRequestForm







import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Label, Textarea, Radio, FileInput, Button, TextInput } from 'flowbite-react';
import { MapPinIcon, DocumentIcon, DocumentTextIcon, XCircleIcon } from "@heroicons/react/24/outline";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import API_BASE_URL from '../../config/apiConfig';
import { token } from '../../utils/auth';

const MakeRequestForm = ({ setModalOn }) => {
  const [requestData, setRequestData] = useState("");
  const [address, setAddress] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requestType, setRequestType] = useState("");
  const [images, setImages] = useState(null); // Store the selected image as a state
  const current_user = JSON.parse(sessionStorage.getItem('user'));

  const handleCancelClick = () => {
    setModalOn(false)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();


    // Manual validation for address input
    if (!address) {
      toast.error("Please select an address");
      return;
    }



    const formData = new FormData(); // Create a new FormData object
    formData.append('request[owner_id]', current_user.id);
    formData.append('request[address]', address);
    formData.append('request[title]', title);
    formData.append('request[description]', description);
    formData.append('request[request_type]', requestType);
    formData.append('request[images]', images); // Append the image to the form data
    console.log("form data", formData);

    try {
      const res = await fetch(`${API_BASE_URL}/requests`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        const json = await res.json();
        setRequestData(json);
        console.log("request data:", json);
        toast.success("Request has been created successfully!");
      } else {
        const errorResponse = await res.json();
        console.log("Error response:", errorResponse);
        toast.error(errorResponse.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }

  };

  //192.168.1.170:5717
  return (
    <>
      <div className="bg-gray-800 px-4 bg-opacity-50 fixed inset-0 flex items-center justify-center shadow-lg z-50">
        <div className="flex h-screen w-screen justify-center items-center ">
          <div className="relative mt-8 flex-col justify-center bg-white py-10 px-8 rounded-xl shadow-xl">
            <div className='absolute -top-[40px] md:-top-[30px] -right-[30px] md:-right-[50px]'>
              <button onClick={handleCancelClick} className=''>
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
                      required
                      apiKey="AIzaSyCZ0M7Vq0tuaUL7LrGd7ViN2iYl2YUZ96I"
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
                    placeholder="should be maximum 50 characters."
                    required
                    className='mb-2'
                    maxLength={50}
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
                      required
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
                    required
                    multiple={false}
                    onChange={(e) => setImages(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button type="submit" className=" background-color hover:bg-yellow-900 " >
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







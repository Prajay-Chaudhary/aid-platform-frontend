
import React from 'react'
import { Label, Textarea, Radio, FileInput, Button } from 'flowbite-react'
import { MapPinIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';



const MakeRequest = ({ setModalOn }) => {
  const handleOKClick = () => {
    setModalOn(false)
  }
  const handleCancelClick = () => {
    setModalOn(false)
  }


  return (
    <>
      <div className="bg-zinc-200 opacity-95 fixed inset-0 z-50">
        <div className="flex h-screen w-screen justify-center items-center ">
          <div className="flex-col justify-center bg-white py-10 px-8 rounded-xl">
            <div className='flex float-right pl-0.5'>
              <button onClick={handleCancelClick} className='absolute  right-30 top-10'>
                <XCircleIcon className="h-9 w-20 text-red-500" />
              </button>
            </div>
            <div>
              <h1 className='text-red-800 font-bolder text-4xl'>Create a new request</h1>
            </div>
            <form className="flex flex-col gap-4 mt-2">
              <div>
                <div className="mb-2 flex-row">
                  <div className='flex mb-2'>
                    <Label
                      htmlFor="base"
                      value="Address:"
                      className=' font-extrabold'
                    />
                    <div>
                      <MapPinIcon className="h-6 w-6 text-yellow-700" />
                    </div>
                  </div>
                  <div className='mb-2'>
                    <GooglePlacesAutocomplete
                      apiKey="AIzaSyDnYe4Bf7o8tg27Hkuf7vd_ynFBHcXrfvM"
                    />
                  </div>

                  <div className="mb-2 flex-row font-extrabold">
                    <div className='flex mb-2'>
                      <Label
                        htmlFor="base"
                        value="Description:"
                        className=' font-extrabold'
                      />
                      <div>
                        <DocumentTextIcon className="h-6 w-6 text-yellow-700" />
                      </div>
                    </div>

                  </div>
                  <Textarea
                    id="comment"
                    placeholder="should be maximum 300 characters."
                    required
                    rows={4}
                    className='mb-2'
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
                      id="one-time-help"
                      name="requestType"
                      value="OneTimeHelp"
                    />
                    <Label htmlFor="one-time-help">
                      One Time Help
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="material-help"
                      name="requestType"
                      value="material-help"
                    />
                    <Label htmlFor="material-help">
                      Material  Help
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
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button onClick={handleOKClick} className=" bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 " >Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  );
}

export default MakeRequest





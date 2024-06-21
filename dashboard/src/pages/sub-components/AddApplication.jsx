import { Label } from '@/components/ui/label';
import { LucideUpload } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import SpecialLoadingButton from './SpecialLoadingButton';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addNewApplication, clearAllApplicationError, clearAllApplicationMessage, getAllApplications, resetApplicationSlice } from '@/store/slices/application.slice';
import { toast } from 'react-toastify';

function AddApplication() {

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const { loading, message, error } = useSelector((state) => state.application);

  const handleAddNewApplication = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("image", image);

    dispatch(addNewApplication(formdata));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationError())
    }
    if (message) {
      toast.success(message);
      dispatch(clearAllApplicationMessage())
      dispatch(getAllApplications())
      dispatch(resetApplicationSlice())

      setName("");
      setImage("");
      setImagePreview("");
    }
  }, [dispatch, loading, error, message]);

  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form
          className="w-[100%] px-5 md:w-[650px]"
          onSubmit={handleAddNewApplication}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                ADD A NEW APPLICATION
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        placeholder="Application Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Skill Image
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Image"
                          className="mx-auto h-12 w-12 text-gray-300"
                          viewBox="0 0 24 24"
                        />
                      ) : (
                        <LucideUpload
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                      )}

                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleImage}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {loading ? (
              <SpecialLoadingButton content={"Adding"} />
            ) : (
              <Button type="submit" className="w-full">
                Add Application
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default AddApplication
//css here
import { TextInput, Textarea, Button } from "flowbite-react";
import cloud from "../assets/images/cloudupload.svg";
import plus from "../assets/images/plusupload.svg";

// component here
import Header from "../component/Header";

//react here
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";
import dataURItoBlob from "../lib/dataBlob";

export default function Uploads() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    post_image: [],
  });

  const { title, description, post_image } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // to show selected image
  const handleImageChange = (event) => {
    setSelectedFiles([]);

    // Maximum 5 images are allowed at a time
    if (event.target.files.length > 5) {
      event.target.value = null;
      return alert("Only 5 images are allowed at a time");
    }

    const images = Array.from(event.target.files);

    const selectedImages = [];
    images.forEach((image) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        selectedImages.push({ image: e.target.result, name: image.name });
        if (selectedImages.length === images.length) {
          setSelectedFiles(selectedImages);
        }
      };
      reader.readAsDataURL(image);
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      };

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (selectedFiles.length !== 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append(
            "post_image",
            dataURItoBlob(selectedFiles[i].image),
            selectedFiles[i].name
          );
        }
      }

      const response = await API.post("/post", formData, config);
      console.log("ini response post", response);

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Post has been uploaded",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Please try again",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/uploads");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Header />
      <div className="mt-5">
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="grid grid-cols-2 gap-5 ms-5 mx-5">
            {selectedFiles.length > 0 ? (
              <>
                <div className="">
                  <div className="flex items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <label>
                      <img
                        src={selectedFiles[0].image}
                        alt=""
                        className="object-cover full-w h-96 object-center"
                      />
                      <input
                        type="file"
                        hidden
                        multiple
                        id="post_image"
                        name="post_image"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-4 gap-3 mt-5">
                    <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <label>
                        <img
                          src={selectedFiles[1].image}
                          alt=""
                          className="object-cover object-center"
                        />
                        
                      </label>
                    </div>

                    <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <label>
                        <img
                          src={selectedFiles[2].image}
                          alt=""
                          className="object-cover object-center"
                        />
                        
                      </label>
                    </div>

                    <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <label>
                        <img
                          src={selectedFiles[3].image}
                          alt=""
                          className="object-cover object-center"
                        />
                        
                      </label>
                    </div>

                    <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <label>
                        <img
                          src={selectedFiles[4].image}
                          alt=""
                          className="object-cover object-center"
                        />
                        
                      </label>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="">
                  <div className="flex items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <label>
                      <img
                        src={cloud}
                        alt=""
                        className="object-cover object-center"
                      />
                      <input
                        type="file"
                        hidden
                        multiple
                        onChange={handleImageChange}
                        id="post_image"
                        name="post_image"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-4 gap-3 mt-5">
                    <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <label>
                        <img
                          src={plus}
                          alt=""
                          className="object-cover object-center"
                        />
                        
                      </label>
                    </div>

                    <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <label>
                        <img
                          src={plus}
                          alt=""
                          className="object-cover object-center"
                        />
                        
                      </label>
                    </div>

                    <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <label>
                        <img
                          src={plus}
                          alt=""
                          className="object-cover object-center"
                        />
                        
                      </label>
                    </div>

                    <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <label>
                        <img
                          src={plus}
                          alt=""
                          className="object-cover object-center"
                        />
                        
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* disini */}

            <div>
              <div className="mb-5">
                <TextInput
                  placeholder="Title"
                  name="title"
                  id="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Textarea
                  rows="9"
                  placeholder="Description"
                  name="description"
                  id="description"
                  value={description}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-center mt-20">
                <Button className="mx-5" type="submit">
                  Post
                </Button>
                <Link to={"/"}>
                  <Button className="mx-5">Cancel</Button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

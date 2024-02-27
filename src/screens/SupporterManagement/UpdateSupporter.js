import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import { MdClose } from "react-icons/md";

const UpdateSupporter = ({
  isModalOpen,
  setIsModalOpen,
  closeModal,
  singleUser,
  setUsers,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages,setSelectedImages]= useState([])
  console.log(selectedImage);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImages(file)
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const bannerSubmit = async (values) => {
    if (!selectedImage) {
      toast.error("Please choose your profile!");
    } else {
      let profilephoto = " ";

      try {
        let param = new FormData();

        param.append("avatars", selectedImages);

        profilephoto = await axios.post(`${Base_url}/UploadImage`, param);

        console.log(profilephoto, "=====profile photo===");
        // console.log(profilephoto?.data?.response,'=====profile photo2===');
      } catch (error) {
        console.log(error);
      }

      const params = {
        userId: singleUser._id,
        name: values.name.value,
        nickName: values.nickName.value,
        phoneNumber: values.phoneNumber.value,
        usertype: "supporter",
        gender: values.gender.value,
        age: values.age.value,
        audioCall: values.audioCall.value,
        videoCall: values.videoCall.value,
        chat: values.chat.value,
        walletAmount: values.walletAmount.value,
        chatPrice: values.chatPrice.value,
        audioCallPrice: values.audioCallPrice.value,
        videoCallPrice: values.videoCallPrice.value,
        profileImage: profilephoto?.data[0].url,
      };
      await axios
        .post(`${Base_url}/UpdateUser`, params)
        .then((res) => {
          console.log(res);

          if (res.status === 200) {
            toast.success("User Update Successfully!");
            setIsModalOpen(false);
            axios
              .get(`${Base_url}/getAllUsers`)
              .then((res) => {
                console.log(res.data);

                setUsers(res.data.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* Modal Content */}
        <div className="">
          <div className=" p-3 flex justify-between items-center">
            <div></div>
            <h1 className="capitalize h4 font-semibold">Add Supporter</h1>
            <MdClose onClick={() => setIsModalOpen(false)} size={25} />
          </div>
          <hr />
          <div className=" p-5">
            <div className=" text-center my-2">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  className="mx-auto w-28  h-28  rounded-full"
                  alt=""
                />
              ) : (
                <>
                  <img
                    src={require("../../assets/image/profile.jpg")}
                    className="mx-auto  w-28  h-28  rounded-full"
                    alt=""
                  />
                </>
              )}

              <div className="  my-5">
                <label
                  htmlFor="fileInput"
                  className="px-12 py-2 bg-white  font-semibold text-primary border   border-gray-200 rounded-lg cursor-pointer"
                >
                  Browse File
                </label>
                <input
                  accept="image/*"
                  onChange={handleFileChange}
                  name="profileImage"
                  type="file"
                  id="fileInput"
                  className="hidden"
                />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                bannerSubmit(e.target);
              }}
            >
              <div className=" flex gap-5 flex-wrap">
                <div className=" md:w-[48%] w-[100%]">
                  <Input
                    label={"Username"}
                    placeholder={""}
                    name={"name"}
                    className={"border  w-full  py-3"}
                  />
                </div>
                <div className=" md:w-[48%] w-[100%]">
                  <Input
                    label={"Nick Name"}
                    placeholder={""}
                    name={"nickName"}
                    className={"border  w-full  py-3"}
                  />
                </div>

                <div className=" md:w-[48%] w-[100%]">
                 
                    <label for="gender" className=' block mb-2 text-sm font-medium  text-gray-900'> Gender</label>
                   <select   name={"gender"} className="outline-none bg-lightGray border w-full py-3  p-2.5 text-primary  text-lg placeholder:text-primary rounded-md">
                    <option>select option...</option>
                    <option value={'male'}>Male</option>
                    <option value={'female'}>Female</option>
                  </select>
                </div>
                <div className=" md:w-[48%] w-[100%]">
                  <Input
                    label={"Age"}
                    placeholder={""}
                    name={"age"}
                    className={"border  w-full  py-3"}
                  />
                </div>
                <div className=" md:w-[48%] w-[100%]">
                 
                     <label for="audioCall" className=' block mb-2 text-sm font-medium  text-gray-900'>Audio Call</label>
                  <select   name={"audioCall"} className="outline-none bg-lightGray border w-full py-3  p-2.5 text-primary  text-lg placeholder:text-primary rounded-md">
                    <option>select option...</option>
                    <option value={'available'}>Available</option>
                    <option value={'notavailable'}>Not available</option>
                  </select>
                </div>
                <div className=" md:w-[48%] w-[100%]">
                 
                    <label for="videoCall" className=' block mb-2 text-sm font-medium  text-gray-900'>Video Call</label>
                  <select   name={"videoCall"} className="outline-none bg-lightGray border w-full py-3  p-2.5 text-primary  text-lg placeholder:text-primary rounded-md">
                    <option>select option...</option>
                    <option value={'available'}>Available</option>
                    <option value={'notavailable'}>Not available</option>
                  </select>
                </div>
                <div className=" md:w-[48%] w-[100%]">
                
                    <label for="chat" className=' block mb-2 text-sm font-medium  text-gray-900'>Chat</label>
                  <select   name={"chat"} className="outline-none bg-lightGray border w-full py-3  p-2.5 text-primary  text-lg placeholder:text-primary rounded-md">
                    <option>select option...</option>
                    <option value={'available'}>Available</option>
                    <option value={'notavailable'}>Not available</option>
                  </select>
                </div>
                <div className=" md:w-[48%] w-[100%]">
                  <Input
                    label={"Wallet Amount"}
                    placeholder={""}
                    name={"walletAmount"}
                    className={"border  w-full  py-3"}
                  />
                </div>

                <div className=" md:w-[48%] w-[100%]">
                  <Input
                    label={"Phone Number"}
                    placeholder={""}
                    name={"phoneNumber"}
                    className={"border  w-full  py-3"}
                  />
                </div>
                <div className=" md:w-[48%] w-[100%]">
                  <Input
                    label={"Chat price"}
                    placeholder={""}
                    name={"chatPrice"}
                    className={"border  w-full  py-3"}
                  />
                </div>
                <div className=" md:w-[48%] w-[100%]">
                  <Input
                    label={"Audio call price"}
                    name={"audioCallPrice"}
                    placeholder={""}
                    className={"border  w-full  py-3"}
                  />
                </div>
                <div className=" md:w-[48%] w-[100%]">
                  <Input
                    label={"Video call price"}
                    placeholder={""}
                    name={"videoCallPrice"}
                    className={"border  w-full  py-3"}
                  />
                </div>
              </div>

              <Button
                label={"save"}
                type={"submit"}
                className={
                  "  bg-[#A47ABF] mt-3 uppercase text-white py-2 w-full"
                }
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateSupporter;

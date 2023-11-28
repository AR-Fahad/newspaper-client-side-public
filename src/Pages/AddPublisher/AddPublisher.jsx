import axios from "axios";
import { useForm } from "react-hook-form";
import axiosInstance from "../../AxiosInstance/instance";
import Swal from "sweetalert2";
import usePublishers from "../../Hooks/usePublishers";
const imageKey = import.meta.env.VITE_IMAGE_API_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageKey}`;
const AddPublisher = () => {
  const { register, handleSubmit, reset } = useForm();
  const { refetch } = usePublishers();
  const add = async (data) => {
    const imgFile = { image: data.logo[0] };
    const res = await axios.post(imageHostingApi, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    data.logo = res.data.data.display_url;
    const publisherInfo = {
      ...data,
    };
    console.log(publisherInfo);
    axiosInstance.post("/publishers", publisherInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Publisher added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        reset();
      }
    });
  };
  return (
    <>
      <div className="w-full py-10 px-2 md:w-4/5 mx-auto">
        <h3 className="text-3xl uppercase text-purple-500 font-bold text-center">
          Add Publisher
        </h3>
        <div className="card w-full shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(add)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Publisher Name*</span>
              </label>
              <input
                type="text"
                placeholder="Publisher Name"
                {...register("publisher")}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label-text">Logo*</label>
              <input
                type="file"
                {...register("logo")}
                className="file-input w-full"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline border-purple-500 text-purple-500 w-full btn-md">
                Add Publisher
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPublisher;

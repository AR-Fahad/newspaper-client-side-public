import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { AuthContext } from "../../Provider/AuthProvider";
import moment from "moment/moment";
import axiosInstance from "../../AxiosInstance/instance";
import Swal from "sweetalert2";
const imageKey = import.meta.env.VITE_IMAGE_API_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageKey}`;
const AddArticles = () => {
  const { user } = useContext(AuthContext);
  const t = [
    { value: "#politics", label: "Politics" },
    { value: "#technology", label: "Technology" },
    { value: "#sports", label: "Sports" },
    { value: "#education", label: "Education" },
    { value: "#health", label: "Health" },
  ];
  const [tagsOption, setTagsOption] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const add = async (data) => {
    data.tags = tagsOption.value;
    const imgFile = { image: data.img[0] };
    const res = await axios.post(imageHostingApi, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    data.img = res.data.data.display_url;
    const article = {
      author_name: user?.displayName,
      author_email: user?.email,
      author_img: user?.photoURL,
      ...data,
      status: "pending",
      postedDate: moment().format("Do MMMM, YYYY"),
    };
    // console.log(article);
    axiosInstance.post("/articles", article).then((res) => {
      // console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    });
  };
  return (
    <>
      <div className="w-full py-10 px-2 md:w-4/5 mx-auto">
        <h3 className="text-3xl uppercase text-purple-500 font-bold text-center">
          Add Articles
        </h3>
        <div className="card w-full shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(add)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title*</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                {...register("title")}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control grid lg:grid-cols-2 lg:gap-6">
              <div>
                <label className="label">
                  <span className="label-text">Tags*</span>
                </label>
                <Select
                  className="form-control"
                  {...register("tags")}
                  defaultValue={tagsOption}
                  onChange={setTagsOption}
                  options={t}
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Publisher*</span>
                </label>
                <select
                  {...register("publisher")}
                  className="select select-bordered w-full"
                  defaultValue=""
                  required
                >
                  <option disabled value="">
                    Select...
                  </option>
                  <option value="The New York Times">The New York Times</option>
                  <option value="BBC News">BBC News</option>
                  <option value="The Washington Post">
                    The Washington Post
                  </option>
                  <option value="Reuters">Reuters</option>
                </select>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description*</span>
              </label>
              <textarea
                placeholder="Description"
                {...register("description")}
                className="textarea textarea-bordered textarea-lg"
              ></textarea>
            </div>
            <div className="form-control">
              <input
                type="file"
                {...register("img")}
                className="file-input w-full"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline border-purple-500 text-purple-500 w-full btn-md">
                Add Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddArticles;

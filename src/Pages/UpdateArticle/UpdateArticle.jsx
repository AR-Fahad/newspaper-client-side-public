import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosInstance/instance";
import Swal from "sweetalert2";

const UpdateArticle = () => {
  const article = useLoaderData();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const update = async (data) => {
    const updatedArticle = {
      ...data,
    };

    axiosInstance
      .patch(`/articles/${article?._id}`, updatedArticle)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully updated",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/myArticles");
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>NewsNook | Update Article</title>
      </Helmet>
      <div className="w-full py-10 px-2 md:w-4/5 mx-auto">
        <h3 className="text-3xl uppercase text-purple-500 font-bold text-center">
          Update Article
        </h3>
        <div className="card w-full shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(update)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title*</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                defaultValue={article?.title}
                {...register("title")}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description*</span>
              </label>
              <textarea
                placeholder="Description"
                {...register("description")}
                defaultValue={article?.description}
                className="textarea textarea-bordered textarea-lg"
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline border-purple-500 text-purple-500 w-full btn-md">
                Update Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateArticle;

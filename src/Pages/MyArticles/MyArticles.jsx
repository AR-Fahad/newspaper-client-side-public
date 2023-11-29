import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axiosInstance from "../../AxiosInstance/instance";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyArticles = () => {
  const { user } = useContext(AuthContext);
  const { data: myArticles = [], refetch } = useQuery({
    queryKey: ["myArticles", user?.email],
    queryFn: () =>
      axiosInstance
        .get(`/user/articles?email=${user?.email}`)
        .then((res) => res.data),
  });
  const handleDelete = (article) => {
    axiosInstance.delete(`/articles/${article._id}`).then((res) => {
      if (res.data.deletedCount) {
        Swal.fire({
          position: "top-end",
          title: "Post deleted",
        });
        refetch();
      }
    });
  };
  return (
    <div className="py-10 mx-auto w-11/12">
      <Helmet>
        <title>NewsNook | myArticles</title>
      </Helmet>
      <h3 className="font-bold text-purple-500 text-3xl text-center">
        MY POSTED ARTICLES: {myArticles.length}
      </h3>
      <br />
      <div className="overflow-x-auto rounded-t-2xl">
        <table className="table">
          {/* head */}
          <thead className="bg-purple-500 text-white">
            <tr>
              <th>Serial No.</th>
              <th>Title</th>
              <th>Details</th>
              <th>Status</th>
              <th>Is Premium</th>
              <th>Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {myArticles.map((article, idx) => (
              <tr key={article._id} className="bg-base-200">
                <th>{idx + 1}</th>
                <th>{article.title}</th>
                <th>
                  <p>Publisher: {article.publisher}</p>
                  <p>Tags: #{article.tags}</p>
                </th>
                <th>
                  {!(article?.status === "declined") ? (
                    <p className="uppercase text-purple-500">
                      {article.status}
                    </p>
                  ) : (
                    <>
                      <div>
                        <p className="uppercase text-purple-500">DECLINED</p>
                        <div>
                          <button
                            onClick={() =>
                              document
                                .getElementById(`my_modal_${article._id}`)
                                .showModal()
                            }
                            className="btn btn-xs btn-outline border-purple-500 text-purple-500"
                          >
                            Reasons
                          </button>
                          <dialog
                            id={`my_modal_${article._id}`}
                            className="modal"
                          >
                            <div className="modal-box">
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                  ✕
                                </button>
                              </form>
                              <h3 className="font-bold text-lg">Reasons:</h3>
                              <p className="py-4">{article?.reasons}</p>
                            </div>
                          </dialog>
                        </div>
                      </div>
                    </>
                  )}
                </th>
                <th>
                  {article?.isPremium ? (
                    <p className="text-purple-500">YES</p>
                  ) : (
                    <p>NO</p>
                  )}
                </th>
                <th>
                  <Link
                    to={`/updateArticles/${article._id}`}
                    className="btn btn-sm btn-outline border-purple-500 text-purple-500"
                  >
                    Update
                  </Link>
                </th>
                <th>
                  <button
                    onClick={() => handleDelete(article)}
                    className="btn btn-sm btn-outline border-purple-500 text-purple-500"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyArticles;

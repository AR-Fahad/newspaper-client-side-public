import { Helmet } from "react-helmet-async";
import useAllArticles from "../../Hooks/useAllArticles";
import profile from "../../assets/profile.jpg";
import Swal from "sweetalert2";
import axiosInstance from "../../AxiosInstance/instance";

const AllArticles = () => {
  const { articles, refetch } = useAllArticles();
  const handleUpdate = async (article, status) => {
    let updateArticle;
    if (status === "declined") {
      const { value: reasons = "Don't interested", isConfirmed } =
        await Swal.fire({
          input: "textarea",
          inputLabel: "Reasons",
          inputPlaceholder: "Type reasons here...",
          inputAttributes: {
            "aria-label": "Type your message here",
          },
          showCancelButton: true,
        });

      if (isConfirmed) {
        updateArticle = {
          status,
          reasons,
        };
      }
    } else {
      updateArticle = {
        status,
        reasons: null,
      };
    }

    if (updateArticle) {
      axiosInstance
        .patch(`/admin/articles/${article._id}`, updateArticle)
        .then((res) => {
          // console.log(res.data);
          if (res.data?.modifiedCount === 1) {
            Swal.fire({
              text: "Updated successfully",
              icon: "success",
            });
          }
          refetch();
        });
    }
  };
  const makePremium = (article) => {
    axiosInstance.patch(`/admin/articles/${article._id}`).then((res) => {
      if (res.data?.modifiedCount === 1) {
        Swal.fire({
          text: "Updated successfully",
          icon: "success",
        });
        refetch();
      }
    });
  };
  const handleDelete = (article) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosInstance.delete(`/articles/${article._id}`).then((res) => {
            console.log(res.data);
            if (res.data.deletedCount) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "This article has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };
  return (
    <div className="py-10 px-1 md:px-5">
      <Helmet>
        <title>NewsNook | Dashboard | AllArticles</title>
      </Helmet>
      <h3 className="font-bold text-purple-500 text-3xl text-center">
        TOTAL ARTICLES: {articles.length}
      </h3>
      <br />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {articles.map((article) => (
          <div key={article._id} className="card glass">
            <div className="card-body">
              <h2 className="card-title">{article.title}</h2>
              <div className="flex gap-1 items-center">
                <img
                  className="w-8 md:w-10 rounded-full"
                  src={article.author_img ? article.author_img : profile}
                  alt=""
                />
                <div>
                  <p>{article.author_name}</p>
                  <p>{article.author_email}</p>
                </div>
              </div>
              <p>Publisher: {article.publisher}</p>
              <p>Status: {article.status}</p>
              <p>Posted Date: {article.postedDate}</p>
              {article?.isPremium && (
                <p className="text-purple-500 font-bold">PREMIUM</p>
              )}
              <div className="card-actions justify-start">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(article, "approved")}
                    className="btn btn-sm btn-outline border-purple-500 text-purple-500"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleUpdate(article, "declined")}
                    className="btn btn-sm btn-outline border-purple-500 text-purple-500"
                  >
                    Decline
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(article)}
                    className="btn btn-sm btn-outline border-purple-500 text-purple-500"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => makePremium(article)}
                    className="btn btn-sm btn-outline border-purple-500 text-purple-500"
                  >
                    Make Premium
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;

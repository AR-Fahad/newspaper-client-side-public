import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import reg from "../../assets/login.gif";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axiosInstance from "../../AxiosInstance/instance";
import Swal from "sweetalert2";

const Register = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { createAccount, updateUser } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    setError(null);
    if (
      data.password.length < 6 ||
      !/[A-Z]/.test(data.password) ||
      !/[a-z]/.test(data.password) ||
      !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(data.password) ||
      !/\d/.test(data.password)
    ) {
      setError("Password need to be strong and more then 5 characters");
      return;
    }
    createAccount(data.email, data.password)
      .then((result) => {
        updateUser(result.user, data.name, data.img).then(() => {
          const user = { name: data.name, email: data.email, img: data.img };
          axiosInstance.post("/users", user).then((res) => {
            console.log(res.data);
            Swal.fire("Successfully registered account");
            navigate("/");
          });
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Already have an user with this email");
      });
  };
  return (
    <>
      <Helmet>
        <title>NewsNook | Register</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200 my-2">
        <div className="hero-content flex-col gap-5 lg:flex-row">
          <div className="lg:w-1/2">
            <img className="w-full mx-auto" src={reg} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full py-5 max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-4xl font-semibold text-center">Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Name<span className="text-2xl text-purple-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  {...register("name")}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Email<span className="text-2xl text-purple-500">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  {...register("email")}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  placeholder="Photo URL"
                  {...register("img")}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Confirm Password
                    <span className="text-2xl text-purple-500">*</span>
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Your password"
                  {...register("password")}
                  className="input input-bordered"
                  required
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Register"
                  className="btn border-none bg-purple-500 text-white btn-outline"
                />
              </div>
            </form>
            <p className="text-center my-4">
              Already have an account?{" "}
              <Link className="text-purple-500 hover:underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

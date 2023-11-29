import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import profile from "../../assets/profile.jpg";
import { useForm } from "react-hook-form";
import axiosInstance from "../../AxiosInstance/instance";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
const Profile = () => {
  const { user, updateUser, loading, setLoading } = useContext(AuthContext);
  const [disable1, setDisable1] = useState(true);
  const [disable2, setDisable2] = useState(true);
  const { register, handleSubmit } = useForm();
  const submit = (data) => {
    console.log(data);
    updateUser(user, data.name, data.img).then(() => {
      axiosInstance
        .patch(`/users?email=${user?.email}&name=${data.name}&img=${data.img}`)
        .then((res) => {
          //   console.log(res.data);
          if (res.data.modifiedCount === 1) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Profile updated successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            setDisable1(true);
            setDisable2(true);
            setLoading(false);
          }
        });
    });
  };
  const urlChange = (e) => {
    if (e?.target?.value === user?.photoURL || e?.target?.value === "") {
      setDisable1(true);
      return;
    }
    setDisable1(false);
  };
  const makeChange = (e) => {
    if (e.target.value === user?.displayName) {
      setDisable2(true);
      return;
    }
    setDisable2(false);
  };

  if (loading) {
    return (
      <div className="my-10 text-center text-3xl font-bold,">Loading...</div>
    );
  }

  return (
    <div className="my-10 px-1">
      <Helmet>
        <title>NewsNook | Profile</title>
      </Helmet>
      <div>
        <div>
          <img
            className="w-32 mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
            src={user?.photoURL ? user.photoURL : profile}
          />
        </div>
        <br />
        <p className="text-center text-lg font-semibold">
          Email: {user?.email}
        </p>
        <br />
        <form onSubmit={handleSubmit(submit)} className="text-center">
          <div>
            <p className="text-xl font-semibold">Name:</p>
            <input
              type="text"
              {...register("name")}
              defaultValue={user?.displayName}
              onChange={makeChange}
              placeholder="Type your name here..."
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <br />
          <div>
            <p className="text-xl font-semibold">PhotoURL:</p>
            <input
              type="url"
              defaultValue={user?.photoURL}
              {...register("img")}
              onChange={urlChange}
              placeholder="PhotoURL here..."
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Save Changes"
              className="btn btn-outline btn-sm btn-primary"
              disabled={
                (!disable1 && disable2) ||
                (disable1 && !disable2) ||
                (!disable1 && !disable2)
                  ? false
                  : true
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

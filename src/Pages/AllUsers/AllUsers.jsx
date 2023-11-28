import useUsers from "../../Hooks/useUsers";
import { RiUser2Fill } from "react-icons/ri";
import profile from "../../assets/profile.jpg";
import Swal from "sweetalert2";
import axiosInstance from "../../AxiosInstance/instance";
import { Helmet } from "react-helmet-async";
const AllUsers = () => {
  const { users, refetch } = useUsers();
  const makeAdmin = (user) => {
    axiosInstance.patch(`/users/${user._id}`).then((res) => {
      if (res.data.modifiedCount === 1) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin from now`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  return (
    <div className="py-10 mx-auto w-11/12">
      <Helmet>
        <title>NewsNook | Dashboard | AllUsers</title>
      </Helmet>
      <h3 className="font-bold text-purple-500 text-3xl text-center">
        TOTAL USERS: {users.length}
      </h3>
      <br />
      <div className="overflow-x-auto rounded-t-2xl">
        <table className="table">
          {/* head */}
          <thead className="bg-purple-500 text-white">
            <tr>
              <th></th>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {users.map((user, idx) => (
              <tr key={user._id} className="bg-base-200">
                <th>{idx + 1}</th>
                <th>
                  <img
                    className="w-10 rounded-full"
                    src={user.img ? user.img : profile}
                  />
                </th>
                <th>
                  <p>{user.name}</p>
                </th>
                <td>
                  <p>{user.email}</p>
                </td>
                <td>
                  {user?.role === "admin" ? (
                    <p className="text-purple-500">ADMIN</p>
                  ) : (
                    <button
                      onClick={() => makeAdmin(user)}
                      className="btn btn-sm bg-purple-500 text-white"
                    >
                      <RiUser2Fill />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

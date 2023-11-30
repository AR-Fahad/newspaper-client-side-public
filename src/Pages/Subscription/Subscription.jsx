import Swal from "sweetalert2";
import useUser from "../../Hooks/useUser";
import ban from "../../assets/3079.jpg";
import axiosInstance from "../../AxiosInstance/instance";
import { Helmet } from "react-helmet-async";

const Subscription = () => {
  const { userDetails, refetch } = useUser();
  const payment = (e) => {
    e.preventDefault();
    const form = e.target;
    const period = form.period.value;
    const makeSubscription = {
      user: { email: userDetails?.email },
      period,
    };
    // console.log(makeSubscription);
    if (userDetails?.subscription) {
      Swal.fire({
        position: "center",
        title: "You already our subscriber",
      });
      return;
    }
    axiosInstance.post("/makeSubscription", makeSubscription).then((res) => {
      if (res.data?.token) {
        axiosInstance
          .patch(`/users?email=${userDetails?.email}&token=${res.data.token}`)
          .then((r) => {
            if (r.data?.modifiedCount) {
              Swal.fire({
                position: "center",
                title: `You successfully taken subscription for ${period}`,
              });
              refetch();
            }
          });
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>NewsNook | Subscription</title>
      </Helmet>
      <div>
        <img src={ban} alt="" />
      </div>
      <div className="my-10">
        <form onSubmit={payment} action="">
          <div className="w-full md:w-1/2 mx-auto">
            <select
              name="period"
              defaultValue=""
              className="select select-secondary w-full"
            >
              <option value="" disabled>
                Pick your subscription period
              </option>
              <option value="1m">1 minute For $5</option>
              <option value="1h">1 hour For $20</option>
              <option value="1d">1 day For $50</option>
            </select>
          </div>
          <br />
          <div className="text-center">
            <input
              className="btn btn-secondary text-white"
              type="submit"
              value="Make Payment"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Subscription;

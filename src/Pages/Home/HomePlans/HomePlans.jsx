const HomePlans = () => {
  return (
    <div className="my-5">
      <h3 className="text-center uppercase text-purple-500 text-xl md:text-3xl font-bold">
        Future Plans
      </h3>
      <br />
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card border-2 border-blue-600">
          <div className="card-body">
            <h2 className="card-title">Premium Individual</h2>
            <div className="badge badge-secondary text-white">
              Free For 1 Month
            </div>
            <p>$10/months after</p>
            <div>
              <ul className="list-item">
                <li className="list-disc">1 Premium Account</li>
                <li className="list-disc">Cancel Anytime</li>
                <li className="list-disc">
                  15 hours/month of listening time from our audio books
                  subscriber catalog
                </li>
              </ul>
            </div>
            <div>
              <button className="btn w-full bg-blue-600 text-white">
                Try Free For 1 Month
              </button>
            </div>
          </div>
        </div>
        <div className="card border-2 border-purple-600">
          <div className="card-body">
            <h2 className="card-title">Premium Duo</h2>
            <div className="badge badge-secondary text-white">
              Free For 14 Days
            </div>
            <p>$14.5/months after</p>
            <div>
              <ul className="list-item">
                <li className="list-disc">Duo Premium Account</li>
                <li className="list-disc">Cancel Anytime</li>
                <li className="list-disc">
                  15 hours/month of listening time from our audio books
                  subscriber catalog
                </li>
              </ul>
            </div>
            <div>
              <button className="btn w-full bg-purple-600 text-white">
                Try Free For 15 days
              </button>
            </div>
          </div>
        </div>
        <div className="card border-2 border-sky-600">
          <div className="card-body">
            <h2 className="card-title">Premium Family</h2>
            <div className="badge badge-secondary text-white">
              Free For a Week
            </div>
            <p>$20/months after</p>
            <div>
              <ul className="list-item">
                <li className="list-disc">Family Premium Account</li>
                <li className="list-disc">Cancel Anytime</li>
                <li className="list-disc">
                  15 hours/month of listening time from our audio books
                  subscriber catalog
                </li>
              </ul>
            </div>
            <div>
              <button className="btn w-full bg-sky-600 text-white">
                Try Free For 1 Week
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePlans;

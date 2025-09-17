import { useEffect, useState } from "react";

const Leads = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

  useEffect(() => {
    const url = "https://be-major-project-2.vercel.app/leads";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load leads");
        setLoading(false);
      });
  }, []);

  // Bootstrap badge colors mapped to status
  const badgeColors = {
    New: "primary",
    Contacted: "warning",
    Qualified: "success",
    "Proposal Sent": "info",
    Closed: "danger",
  };

  if (loading) return <p className="text-center my-3">Loading...</p>;
  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <div>
      <div className="p-3 border rounded bg-light">
        <h5 className="mb-3">Lead Status:</h5>
        <ul className="list-group ">
          {statuses.map((status) => {
            const count =
              data?.filter((item) => item.status === status).length || 0;
            if (count === 0) return null;

            return (
              <li
                key={status}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  <span className={`badge bg-${badgeColors[status]} me-2`}>
                    {status}
                  </span>
                  Leads
                </span>
                <span className="badge bg-secondary rounded-pill">{count}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4">
        <label className="form-label mb-2">Quick Filters:</label>
        <div className="dropdown w-100">
          <button
            className="btn btn-secondary dropdown-toggle w-100 text-start"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select Status
          </button>

          <ul className="dropdown-menu w-100">
            <li>
              <button className="dropdown-item">New</button>
            </li>
            <li>
              <button className="dropdown-item">Contacted</button>
            </li>
            <li>
              <button className="dropdown-item">Qualified</button>
            </li>
            <li>
              <button className="dropdown-item">Proposal Sent</button>
            </li>
            <li>
              <button className="dropdown-item">Closed</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Leads;

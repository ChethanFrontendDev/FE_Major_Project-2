import { useEffect, useState } from "react";

const Settings = () => {
  const [leadList, setLeadList] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = (id) => {
    fetch(`https://be-major-project-2.vercel.app/leads/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage("Lead Deleted Successfully.");
        setError("");
        fetchLeadStatusList();
      })
      .catch((error) => {
        setMessage("");
        setError("Failed to delete a lead.");
      });
  };

  const fetchLeadStatusList = () => {
    const url = `https://be-major-project-2.vercel.app/leads`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLeadList(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLeadStatusList();
  }, []);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, error]);

  return (
    <>
      {loading && <p className="text-center alert alert-info">Loading...</p>}
      {error && <p className="text-center alert alert-danger">{error}</p>}
      {message && <p className="text-center alert alert-success">{message}</p>}
      <div className="row">
        {leadList?.map((item) => (
          <div key={item._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title mb-0">{item.name}</h5>
                  <span
                    className="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </span>
                </div>

                <ul className="list-unstyled small text-muted mb-0">
                  <li className="mb-1">
                    <strong>Agent Name:</strong> {item.salesAgent.name}
                  </li>
                  <li className="mb-1">
                    <strong>Source:</strong> {item.source}
                  </li>
                  <li className="mb-1">
                    <strong>Status:</strong> {item.status}
                  </li>
                  <li className="mb-1">
                    <strong>Priority:</strong> {item.priority}
                  </li>
                  <li>
                    <strong>Time to Close:</strong> {item.timeToClose}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Settings;

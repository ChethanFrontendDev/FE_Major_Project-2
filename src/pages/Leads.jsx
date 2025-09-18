import { useEffect, useState } from "react";

const Leads = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  const clearFilter = () => {
    setSelectedStatus(null);
  };

  const filteredData = selectedStatus
    ? data.filter((item) => item.status === selectedStatus)
    : data;

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

      <div className="mt-4 d-flex align-items-end gap-2">
        <div className="dropdown flex-grow-1" style={{ maxWidth: "800px" }}>
          <label className="form-label mb-2 d-block">Quick Filters:</label>
          <button
            className="btn btn-secondary dropdown-toggle w-100 text-start"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedStatus || "Select Status"}
          </button>

          <ul className="dropdown-menu w-100">
            {statuses.map((status) => (
              <li key={status}>
                <button
                  onClick={() => handleStatusSelect(status)}
                  className="dropdown-item"
                >
                  {status}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="btn btn-outline-danger"
          onClick={clearFilter}
          disabled={!selectedStatus}
        >
          Clear Filter
        </button>
      </div>

      <div className="row mt-4">
        {filteredData.length === 0 ? (
          <p>No cards found for selected status.</p>
        ) : (
          filteredData.map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{item.name}</h5>
                    <span
                      className={`badge bg-${
                        badgeColors[item.status] || "secondary"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <ul className="list-unstyled small text-muted mb-0">
                    <li className="mb-1">
                      <strong>Source:</strong> {item.source || "N/A"}
                    </li>
                    <li className="mb-1">
                      <strong>Priority:</strong> {item.priority || "N/A"}
                    </li>
                    <li>
                      <strong>Time to Close:</strong>{" "}
                      {item.timeToClose || "N/A"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leads;

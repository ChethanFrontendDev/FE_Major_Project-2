import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Leads = () => {
  const navigate = useNavigate();
  const [leadStatusList, setLeadStatusList] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [agentList, setAgentList] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");

  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleAgentChange = (event) => {
    setSelectedAgent(event.target.value);
  };

  const clearFilter = () => {
    setSelectedStatus("");
    setSelectedAgent("");
  };

  const handleNewLead = () => {
    navigate("/lead-form");
  };

  const fetchLeadStatusList = () => {
    const url = `https://be-major-project-2.vercel.app/leads`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLeadStatusList(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const fetchLeadsData = () => {
    const query = `status=${selectedStatus}&salesAgent=${selectedAgent}`;
    const url = `https://be-major-project-2.vercel.app/leads?${query}`;

    setLoader(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No Leads Found for selected filters.");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoader(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoader(false);
      });
  };

  const getAgentList = () => {
    fetch("https://be-major-project-2.vercel.app/agents")
      .then((res) => res.json())
      .then((data) => {
        setAgentList(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    fetchLeadStatusList();
    getAgentList();
  }, []);

  useEffect(() => {
    fetchLeadsData();
  }, [selectedStatus, selectedAgent]);

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
              leadStatusList?.filter((item) => item.status === status).length ||
              0;
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
        <div>
          <label htmlFor="status" className="form-label">
            Quick Filters:
          </label>
          <div className="d-flex gap-2">
            <div style={{ width: "300px" }}>
              <select
                name="status"
                id="status"
                value={selectedStatus}
                className="form-select"
                onChange={handleStatusChange}
              >
                <option value="">Select Status</option>
                {statuses?.map((status) => (
                  <option value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div style={{ width: "300px" }}>
              <select
                name="agent"
                id="agent"
                value={selectedAgent}
                className="form-select"
                onChange={handleAgentChange}
              >
                <option value="">Select Sales Agent</option>
                {agentList.map((agent) => (
                  <option value={agent.name}>{agent.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          className="btn btn-outline-danger"
          onClick={clearFilter}
          disabled={!selectedStatus && !selectedAgent}
        >
          Clear Filter
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={() => handleNewLead()}
        >
          Add New Lead
        </button>
      </div>

      <div className="row mt-4">
        {loader && <p className="text-center">Loading...</p>}
        {data?.length === 0 ? (
          <p>No cards found for selected status.</p>
        ) : (
          data?.map((item) => (
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
                      <strong>Agent Name:</strong> {item.salesAgent.name}
                    </li>
                    <li className="mb-1">
                      <strong>Source:</strong> {item.source}
                    </li>
                    <li className="mb-1">
                      <strong>Priority:</strong> {item.priority}
                    </li>
                    <li>
                      <strong>Time to Close:</strong>
                      {item.timeToClose}
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

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

  const [sortOrder, setSortOrder] = useState(""); // "", "low-high", "high-low"
  const [sortedData, setSortedData] = useState(data || []);

  const [timeSortOrder, setTimeSortOrder] = useState(""); // "asc" or "desc"

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
    setTimeSortOrder("");
    setSortOrder("");
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

  useEffect(() => {
    if (!sortOrder) {
      setSortedData(data);
      return;
    }
    const priorityOrder = { Low: 1, Medium: 2, High: 3 };
    const sorted = [...(data || [])].sort((a, b) => {
      const aPriority = priorityOrder[a.priority] || 0;
      const bPriority = priorityOrder[b.priority] || 0;

      return sortOrder === "low-high"
        ? aPriority - bPriority
        : bPriority - aPriority;
    });

    setSortedData(sorted);
  }, [sortOrder, data]);

  useEffect(() => {
    if (!timeSortOrder) {
      setSortedData(data);
      return;
    }

    const sorted = [...data].sort((a, b) => {
      const aTime = parseInt(a.timeToClose) || 0;
      const bTime = parseInt(b.timeToClose) || 0;
      return timeSortOrder === "low-high" ? aTime - bTime : bTime - aTime;
    });

    setSortedData(sorted);
  }, [timeSortOrder, data]);

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
            <div style={{ width: "400px" }}>
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
            <div style={{ width: "400px" }}>
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
          disabled={
            !selectedStatus && !selectedAgent && !timeSortOrder && !sortOrder
          }
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

      <div className="mt-4">
        <label htmlFor="prioritySort" className="form-label">
          Sort by Priority:
        </label>
        <select
          id="prioritySort"
          className="form-select mb-3"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Select Range</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="timeSort" className="form-label">
          Sort by Time to Close
        </label>
        <select
          id="timeSort"
          className="form-select"
          value={timeSortOrder}
          onChange={(e) => setTimeSortOrder(e.target.value)}
        >
          <option value="">Select Range</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>

      <div className="row mt-4">
        {loader && <p className="text-center">Loading...</p>}

        {!loader &&
          (sortedData?.length === 0 || (!sortedData && data?.length === 0)) && (
            <p>No cards found for selected filters.</p>
          )}

        {(sortedData?.length ? sortedData : data)?.map((item) => (
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
        ))}
      </div>
    </div>
  );
};

export default Leads;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDefaultContext from "../contexts/defaultContext";
import useFetch from "../hooks/useFetch";

const Leads = () => {
  const navigate = useNavigate();
  const { baseUrl, statuses, badgeColors } = useDefaultContext();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "", "low-high", "high-low"
  const [sortedData, setSortedData] = useState([]);
  const [timeSortOrder, setTimeSortOrder] = useState(""); // "asc" or "desc"

  // Fetching leads list
  const {
    data: leadStatusList,
    loading: leadStatusLoading,
    error: leadStatusError,
  } = useFetch(`${baseUrl}/leads`);

  // Fetching Agent list
  const {
    data: agentList,
    loading: agentLoading,
    error: agentError,
  } = useFetch(`${baseUrl}/agents`);

  // Fetching cards by query
  const query = `status=${selectedStatus}&salesAgent=${selectedAgent}`;
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useFetch(`${baseUrl}/leads?${query}`);

  const loading = leadStatusLoading || agentLoading || queryLoading;
  const error = leadStatusError || agentError || queryError;

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
    navigate("/lead-form", { state: { mode: "post" } });
  };

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

  if (loading)
    return <p className="text-center alert alert-info my-3">Loading...</p>;
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
                  <option key={status} value={status}>
                    {status}
                  </option>
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
                  <option key={agent._id} value={agent.name}>
                    {agent.name}
                  </option>
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
        {queryLoading && <p className="text-center">Loading...</p>}

        {!queryLoading &&
          (sortedData?.length === 0 || (!sortedData && data?.length === 0)) && (
            <p>No cards found for selected filters.</p>
          )}

        {sortedData.map((item) => (
          <div
            key={item._id}
            className="col-md-4 mb-4"
            onClick={() => navigate(`/lead/${item._id}`, { state: { item } })}
            style={{ cursor: "pointer" }}
          >
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
                    <strong>Agent Name:</strong> {item?.salesAgent?.name}
                  </li>
                  <li className="mb-1">
                    <strong>Source:</strong> {item.source}
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
    </div>
  );
};

export default Leads;

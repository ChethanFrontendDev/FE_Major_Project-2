import { useEffect, useState } from "react";
import useDefaultContext from "../contexts/defaultContext";
import useFetch from "../hooks/useFetch";

const Settings = () => {
  const { baseUrl } = useDefaultContext();
  const [activeTab, setActiveTab] = useState("leads");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const {
    data: leadList,
    loading: leadListLoader,
    error: leadListError,
    refetch: fetchLeadList,
  } = useFetch(`${baseUrl}/leads`);

  const {
    data: agentList,
    loading: agentListLoader,
    error: agentListError,
    refetch: fetchAgentList,
  } = useFetch(`${baseUrl}/agents`);

  const loading = leadListLoader || agentListLoader;
  const error = leadListError || agentListError;

  const handleDeleteAgent = (id) => {
    fetch(`${baseUrl}/agents/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setDeleteMessage("Agent Deleted Successfully.");
        setDeleteError("");
        fetchAgentList();
      })
      .catch((error) => {
        setDeleteMessage("");
        setDeleteError("Failed to delete");
      });
  };

  const handleDeleteLeads = (id) => {
    fetch(`${baseUrl}/leads/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setDeleteMessage("Lead Deleted Successfully.");
        setDeleteError("");
        fetchLeadList();
      })
      .catch((error) => {
        setDeleteMessage("");
        setDeleteError("Failed to delete a lead.");
      });
  };

  useEffect(() => {
    if (deleteMessage || deleteError) {
      const timer = setTimeout(() => {
        setDeleteMessage("");
        setDeleteError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [deleteMessage, deleteError]);

  return (
    <>
      <div className="container">
        <div className="mb-3 bg-light p-3 rounded">
          <button
            className={`btn btn-outline-primary me-4 ${
              activeTab === "leads" ? "active" : ""
            }`}
            onClick={() => setActiveTab("leads")}
          >
            Leads
          </button>
          <button
            className={`btn btn-outline-primary ${
              activeTab === "agents" ? "active" : ""
            }`}
            onClick={() => setActiveTab("agents")}
          >
            Agents
          </button>
        </div>
      </div>

      {loading && <p className="text-center alert alert-info">Loading...</p>}
      {error && <p className="text-center alert alert-danger">{error}</p>}
      {deleteError && (
        <p className="text-center alert alert-danger">{deleteError}</p>
      )}
      {deleteMessage && (
        <p className="text-center alert alert-success">{deleteMessage}</p>
      )}

      {activeTab === "leads" && (
        <div className="row">
          {leadList?.map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{item.name}</h5>
                    <span
                      className="btn btn-danger"
                      onClick={() => handleDeleteLeads(item._id)}
                    >
                      Delete
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
          {leadList?.length === 0 && (
            <p className="text-center text-muted">No Leads Found</p>
          )}
        </div>
      )}

      {activeTab === "agents" && (
        <div className="row">
          {agentList?.map((agent) => (
            <div key={agent._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <ul className="list-unstyled small text-muted mb-0">
                      <li className="mb-1">
                        <strong>Agent Name:</strong> {agent.name}
                      </li>
                      <li className="mb-1">
                        <strong>Email:</strong> {agent.email}
                      </li>
                    </ul>
                    <span
                      className="btn btn-danger"
                      onClick={() => handleDeleteAgent(agent._id)}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {agentList?.length === 0 && (
            <p className="text-center text-muted">No Agents Found</p>
          )}
        </div>
      )}
    </>
  );
};
export default Settings;

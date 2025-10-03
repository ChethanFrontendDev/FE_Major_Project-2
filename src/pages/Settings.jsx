import { useState } from "react";
import useDefaultContext from "../contexts/defaultContext";
import useDelete from "../hooks/useDelete";
import useFetch from "../hooks/useFetch";

const Settings = () => {
  const { baseUrl } = useDefaultContext();
  const { deleteMessage, deleteError, deleteHandler } = useDelete();
  const [activeTab, setActiveTab] = useState("leads");

  // leads list
  const {
    data: leadList,
    loading: leadListLoader,
    error: leadListError,
    refetch: fetchLeadList,
  } = useFetch(`${baseUrl}/leads`);

  // agents list
  const {
    data: agentList,
    loading: agentListLoader,
    error: agentListError,
    refetch: fetchAgentList,
  } = useFetch(`${baseUrl}/agents`);

  const loading = leadListLoader || agentListLoader;
  const error = leadListError || agentListError;

  // delete lead
  const handleDeleteLeads = (id) => {
    deleteHandler(`${baseUrl}/leads/${id}`).then(() => {
      fetchLeadList();
    });
  };

  // delete agent
  const handleDeleteAgent = (id) => {
    deleteHandler(`${baseUrl}/agents/${id}`).then(() => {
      fetchAgentList();
    });
  };

  return (
    <>
      <div className="container">
        <div className="mb-3 bg-light p-3 rounded d-flex flex-wrap gap-2">
          <button
            className={`btn btn-outline-primary ${
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
            <div
              key={item._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{item.name}</h5>
                    <span
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteLeads(item._id)}
                    >
                      Delete
                    </span>
                  </div>

                  <ul className="list-unstyled small text-muted mb-0">
                    <li>
                      <strong>Agent Name:</strong> {item?.salesAgent?.name}
                    </li>
                    <li>
                      <strong>Source:</strong> {item.source}
                    </li>
                    <li>
                      <strong>Status:</strong> {item.status}
                    </li>
                    <li>
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
            <div
              key={agent._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <ul className="list-unstyled small text-muted mb-0">
                      <li>
                        <strong>Agent Name:</strong> {agent.name}
                      </li>
                      <li>
                        <strong>Email:</strong> {agent.email}
                      </li>
                    </ul>
                    <span
                      className="btn btn-danger btn-sm"
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

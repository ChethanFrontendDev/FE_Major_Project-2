import { useEffect, useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("leads");

  const [leadList, setLeadList] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDeleteAgent = (id) => {
    fetch(`https://be-major-project-2.vercel.app/agents/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage("Agent Deleted Successfully.");
        setError("");
        getAgentList();
      })
      .catch((error) => {
        setMessage("");
        setError("Failed to delete");
      });
  };

  const handleDeleteLeads = (id) => {
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
        setError("");
      })
      .catch((error) => {
        setError("Failed to fetch leads.");
        setLoading(false);
        setLeadList([]);
      });
  };

  const getAgentList = () => {
    fetch("https://be-major-project-2.vercel.app/agents")
      .then((res) => res.json())
      .then((data) => {
        setAgentList(data);
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        setError("Failed to fetch agents.");
        setLoading(false);
        setAgentList([]);
      });
  };

  useEffect(() => {
    fetchLeadStatusList();
    getAgentList();
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
      {message && <p className="text-center alert alert-success">{message}</p>}

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
        </div>
      )}
    </>
  );
};
export default Settings;

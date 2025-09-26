import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Agents = () => {
  const navigate = useNavigate();
  const [agentList, setAgentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getSalesAgentList = () => {
    fetch(`https://be-major-project-2.vercel.app/agents`)
      .then((res) => res.json())
      .then((data) => {
        setAgentList(data);
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        setError("Failed to Fetch Agents.");
        setLoading(false);
      });
  };

  const handleNewAgent = () => {
    navigate("/agent-form");
  };

  useEffect(() => {
    getSalesAgentList();
  }, []);

  return (
    <div className="container my-2">
      {loading && <p className="alert alert-success text-center">Loading...</p>}
      {error && <p className="alert alert-danger text-center">{error}</p>}

      {!loading && (
        <div className="card shadow-sm">
          <div className="card-header">
            <h4 className="mb-0">Sales Agent List</h4>
          </div>
          <div className="card-body">
            <ul className="list-group mb-3">
              {agentList?.map((agent) => (
                <li key={agent._id} className="list-group-item">
                  <strong>Agent:</strong> {agent.name} - {agent.email}
                </li>
              ))}
            </ul>
            <button className="btn btn-primary" onClick={handleNewAgent}>
              Add New Agent
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agents;

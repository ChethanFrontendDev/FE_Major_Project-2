import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDefaultContext from "../contexts/defaultContext";
import useFetch from "../hooks/useFetch";

const Agents = () => {
  const navigate = useNavigate();
  const { baseUrl } = useDefaultContext();

  const { data: agentList, loading, error } = useFetch(`${baseUrl}/agents`);

  const handleNewAgent = () => {
    navigate("/agent-form");
  };

  return (
    <div className="container my-2">
      {loading && <p className="alert alert-info text-center">Loading...</p>}
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

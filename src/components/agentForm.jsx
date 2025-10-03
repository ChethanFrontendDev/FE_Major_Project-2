import { useEffect, useState } from "react";
import useDefaultContext from "../contexts/defaultContext";

const AgentForm = () => {
  const { baseUrl, handleChange } = useDefaultContext();
  const initialFormValues = {
    name: "",
    email: "",
  };
  const [formValue, setFormValue] = useState(initialFormValues);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch(`${baseUrl}/agents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    })
      .then((res) => res.json())
      .then((data) => {
        setFormValue(initialFormValues);
        setMessage("Agent Added Successfully.");
        setError("");
      })
      .catch((error) => {
        setMessage("");
        setError("Failed to Add Agent.");
      });
  };

  useEffect(() => {
    let timer;
    if (message || error) {
      timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [message, error]);

  return (
    <div>
      <h4 className="text-center py-2 fs-4 fw-normal">Agent Form</h4>

      {message && (
        <p className="text-center alert alert-success py-3">{message}</p>
      )}
      {error && <p className="text-center alert alert-danger py-3">{error}</p>}

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Agent Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formValue.name}
            className="form-control"
            onChange={handleChange(setFormValue)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValue.email}
            className="form-control"
            onChange={handleChange(setFormValue)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Agent
        </button>
      </form>
    </div>
  );
};
export default AgentForm;

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useDefaultContext from "../contexts/defaultContext";
import useFetch from "../hooks/useFetch";

const LeadForm = () => {
  const { baseUrl, statuses } = useDefaultContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, formData, refetchLeads } = location.state;
  const initialFormData = {
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: "",
    timeToClose: "",
    priority: "",
  };

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formValues, setFormValues] = useState(() => {
    if (mode === "edit" && formData) {
      return {
        ...formData,
        salesAgent: formData?.salesAgent?._id || formData?.salesAgent,
        tags: Array.isArray(formData.tags)
          ? formData.tags.join(", ")
          : formData.tags,
      };
    } else {
      return initialFormData;
    }
  });

  const { data: agentList } = useFetch(`${baseUrl}/agents`);

  const handleFormValues = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const payload = {
      ...formValues,
      tags: formValues.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    const method = mode === "edit" ? "PUT" : "POST";
    const url =
      mode === "edit"
        ? `${baseUrl}/leads/${formValues._id}`
        : `${baseUrl}/leads`;

    setLoading(true);
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (mode !== "edit") {
          setFormValues(initialFormData);
        }
        setMessage(
          mode === "edit"
            ? "Lead Updated Successfully."
            : "Lead Added Successfully."
        );
        setErrorMessage("");
        setLoading(false);

        setTimeout(() => {
          setMessage("");
          setErrorMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(
          mode === "edit" ? "Failed to Update Lead." : "Failed to Add Lead."
        );
        setMessage("");
        setLoading(false);
      });
  };

  return (
    <div className="bg-light rounded mx-5">
      <h4 className="text-center py-2 fs-4 fw-normal">Add Lead Form</h4>
      <form onSubmit={handleFormSubmit} className="px-5">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Lead Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            className="form-control"
            onChange={handleFormValues}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="source" className="form-label">
            Source:
          </label>
          <select
            id="source"
            className="form-select"
            name="source"
            value={formValues.source}
            onChange={handleFormValues}
            required
          >
            <option value="">Please select source</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Cold Call">Cold Call</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Email">Email</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="salesAgent" className="form-label">
            Sales Agent:
          </label>
          <select
            id="salesAgent"
            name="salesAgent"
            value={formValues.salesAgent}
            className="form-select"
            onChange={handleFormValues}
            required
          >
            <option value="">Please select sales agent</option>
            {agentList?.map((agent) => (
              <option key={agent._id} value={agent._id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={formValues.status}
            className="form-select"
            onChange={handleFormValues}
            required
          >
            <option value="">Please select status</option>
            {statuses?.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags:
          </label>
          <input
            type="text"
            name="tags"
            value={formValues.tags}
            id="tags"
            className="form-control"
            onChange={handleFormValues}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="timeToClose" className="form-label">
            Time to Close:
          </label>
          <input
            type="number"
            name="timeToClose"
            value={formValues.timeToClose}
            id="timeToClose"
            className="form-control"
            onChange={handleFormValues}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="priority" className="form-label">
            Priority:
          </label>
          <select
            id="priority"
            name="priority"
            value={formValues.priority}
            className="form-select"
            onChange={handleFormValues}
            required
          >
            <option value="">Please select priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="pb-3">
          <button className="btn btn-primary" type="submit">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {message && (
          <p className="alert alert-success text-center pt-3">{message}</p>
        )}
        {errorMessage && (
          <p className="alert alert-danger text-center pt-3">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};
export default LeadForm;

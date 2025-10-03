import { useState } from "react";
import useDefaultContext from "../contexts/defaultContext";
import usePost from "../hooks/usePost";

const AgentForm = () => {
  const { baseUrl, handleChange } = useDefaultContext();
  const { addHandler, addMessage, addError, addLoading } = usePost();
  const initialFormValues = {
    name: "",
    email: "",
  };
  const [formValue, setFormValue] = useState(initialFormValues);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addHandler(`${baseUrl}/agents`, formValue).then(() => {
      setFormValue(initialFormValues);
    });
  };

  return (
    <div>
      <h4 className="text-center py-2 fs-4 fw-normal">Agent Form</h4>

      {addMessage && (
        <p className="text-center alert alert-success py-3">{addMessage}</p>
      )}
      {addError && (
        <p className="text-center alert alert-danger py-3">{addError}</p>
      )}

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
          {addLoading ? "Adding Agent" : "Create Agent"}
        </button>
      </form>
    </div>
  );
};
export default AgentForm;

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LeadDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const lead = location.state.item;

  const handleEditLead = () => {
    navigate("/lead-form", { state: { mode: "edit", formData: lead } });
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchCommentList = () => {
    fetch(`https://be-major-project-2.vercel.app/leads/${lead._id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComment(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch comments.");
        setLoading(false);

        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  const handleAddNewComment = () => {
    fetch(`https://be-major-project-2.vercel.app/leads/${lead._id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        salesAgentId: lead.salesAgent._id,
        commentText: newComment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage("Comment Added.");
        setNewComment("");
        fetchCommentList();

        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        setError("Failed to Add Comment.");
        setLoading(false);

        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  useEffect(() => {
    fetchCommentList();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Lead Name: {lead.name}</h4>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-primary" onClick={handleEditLead}>
            Edit Lead Details
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <p>
            <strong>Sales Agent:</strong> {lead?.salesAgent?.name}
          </p>
          <p>
            <strong>Lead Source:</strong> {lead.source}
          </p>
          <p>
            <strong>Lead Status:</strong> {lead.status}
          </p>
        </div>
        <div className="col-md-6">
          <p>
            <strong>Priority:</strong> {lead.priority}
          </p>
          <p>
            <strong>Time to Close:</strong> {lead.timeToClose}
          </p>
        </div>
      </div>

      <hr />

      <div>
        <h5>Comments Section</h5>

        <div className="mb-3">
          <textarea
            className="form-control"
            rows="2"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            placeholder="Add a new comment..."
          ></textarea>
        </div>

        <button className="btn btn-success mb-3" onClick={handleAddNewComment}>
          Submit Comment
        </button>

        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}

        <div>
          {loading && <p className="text-center">Loading...</p>}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {Array.isArray(comment) && comment.length > 0 ? (
            comment?.map((comment) => (
              <div
                key={comment._id}
                className="border rounded p-3 mb-3 shadow-sm bg-light"
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong className="text-primary">
                    {comment?.author?.name}
                  </strong>
                  <small className="text-muted">
                    {new Date(comment?.createdAt).toLocaleString()}
                  </small>
                </div>
                <p className="mb-0">
                  <span className="fw-semibold text-secondary">Comment:</span>{" "}
                  {comment.commentText}
                </p>
              </div>
            ))
          ) : (
            <p>No Comments to Show.</p>
          )}
        </div>
      </div>
    </div>
  );
}

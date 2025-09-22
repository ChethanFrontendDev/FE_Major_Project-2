import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const lead = location.state.item;

  const handleEditLead = () => {
    navigate("/lead-form", { state: { mode: "edit", formData: lead } });
  };
  //   const [comment, setComment] = useState("");
  //   const [comments, setComments] = useState([]);
  //   const [lead, setLead] = useState(null);

  //   const handleAddComment = () => {
  //     if (!comment.trim()) return;

  //     const newComment = {
  //       author: "You",
  //       date: new Date().toISOString().split("T")[0],
  //       text: comment,
  //     };

  //     setComments((prev) => [newComment, ...prev]);
  //     setComment("");
  //   };

  if (!lead) return <p>Loading lead details...</p>;

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
            <strong>Sales Agent:</strong> {lead.salesAgent.name}
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

      {/* <div>
        <h5>Comments Section</h5>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a new comment..."
          ></textarea>
        </div>
        <button className="btn btn-success mb-3" onClick={handleAddComment}>
          Submit Comment
        </button>

        <div>
          {comments.length === 0 && <p>No comments yet.</p>}
          {comments.map((c, index) => (
            <div key={index} className="border rounded p-2 mb-2">
              <div className="d-flex justify-content-between">
                <strong>{c.author}</strong>
                <small>{c.date}</small>
              </div>
              <p className="mb-0">Comment: {c.text}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

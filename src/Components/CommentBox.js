import React, { useState } from "react";


const CommentBox = () => {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const postComment = async () => {
    const response = await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: comment }),
    });

    const data = await response.json();
    if (data.removed) {
      setMessage({ text: "Hate speech detected! Comment removed.", type: "danger" });
    } else {
      setMessage({ text: "Comment posted successfully!", type: "success" });
    }
    setComment("");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center text-primary mb-3">🚀 Comment Moderation</h2>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control border-primary"
            placeholder="Type your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="btn btn-primary" onClick={postComment}>
            Post Comment
          </button>
        </div>

        {message && (
          <div className={`alert alert-${message.type} mt-3`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentBox;

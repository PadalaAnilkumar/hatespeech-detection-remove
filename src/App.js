import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import CommentBox from "./Components/CommentBox";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const postComment = async () => {
    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });

    const data = await response.json();
    setMessage(data.isHateSpeech ? 
      { text: "🚨 Hate speech detected! Comment removed.", type: "danger" } : 
      { text: "✅ Comment posted successfully!", type: "success" }
    );
    setComment(""); 
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center text-primary mb-4">📝 Comment Moderation</h2>

        <textarea
          className="form-control border-primary mb-3"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment..."
        ></textarea>

        <button className="btn btn-primary w-100" onClick={postComment}>
          🚀 Post Comment
        </button>

        {message && (
          <div className={`alert alert-${message.type} mt-3 fade show`} role="alert">
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

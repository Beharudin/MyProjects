"use client";
import React, { useEffect, useState } from "react";

function Comments() {
  const [data, setdata] = useState([]);
  const [name, setname] = useState("");
  const [comment, setcomment] = useState("");

  const getComments = async () => {
    const resp = await fetch("api/comments");
    const data = await resp.json();
    setdata(data);
  };

  const submitComments = async () => {
    const resp = await fetch("api/comments", {
      method: "POST",
      body: JSON.stringify({ name, comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    console.log("data: ", data);
  };

  const updateComments = async () => {
    const resp = await fetch("api/comments", {
      method: "PUT",
      body: JSON.stringify({ name, comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    const status = resp.status;
    console.log("data: ", data.data);
    console.log("status: ", status);
    console.log("message: ", data.message);
  };

  const deleteMessage = async (comment) => {
    const resp = await fetch("api/comments", {
      method: "DELETE",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();
    console.log("Deleted: ", data.data, data.message);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Comment"
          value={comment}
          onChange={(e) => setcomment(e.target.value)}
        />
        <button onClick={submitComments}>Submit</button>
        <button onClick={updateComments}>Update</button>
      </div>
      <button onClick={getComments}>Comments</button>
      <div>
        {data &&
          data.map((item, index) => (
            <div key={index} onDoubleClick={() => deleteMessage(item)}>
              <h1 className="bg-red-400">{item.name}</h1>
              <h3>{item.text}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Comments;

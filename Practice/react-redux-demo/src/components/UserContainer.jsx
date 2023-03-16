import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux";

function UserContainer() {
  const userData = useSelector((state)=>state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {userData.loading ? (
        <h2>Loading...</h2>
      ) : userData.error ? (
        <h2>Error...</h2>
      ) : (
        <div>
          <h2>List of Users</h2>
          {userData && 
            (userData.users).map((user) =>
              <p>{user}</p>
            )}
        </div>
      )}
    </div>
  );
}

export default UserContainer;

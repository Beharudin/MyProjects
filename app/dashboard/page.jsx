"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [loading, setloading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && !session) {
      signIn();
    } else {
      setloading(false);
    }
  }, [session]);

  if (loading) return <h2>Loading...</h2>;

  return <div>Dashboard page</div>;
}

export default Dashboard;

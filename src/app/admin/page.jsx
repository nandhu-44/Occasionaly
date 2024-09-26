"use client";

import React, { useState, useEffect } from "react";

const Page = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res?.json();
    setData(data.message);
  };

  return <div>{data}</div>;
};

export default Page;

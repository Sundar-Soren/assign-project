"use client";
import React, { useEffect, useState } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return true;

  return <>{children}</>;
};

export default Providers;

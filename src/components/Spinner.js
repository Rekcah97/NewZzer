import React from "react";
import loading from "./loader2.gif";
export default function Spinner() {
  return (
    <div className="text-center">
      <img src={loading} alt="loading" />
    </div>
  );
}

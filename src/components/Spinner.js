import React from "react";
import loading from "./loader2.gif";
export default function Spinner() {
  return (
    <div className="text-center">
      <img className="my-3" src={loading} alt="loading" />
    </div>
  );
}

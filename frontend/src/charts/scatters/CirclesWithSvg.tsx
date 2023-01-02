import React, { useState } from "react";
import { generateDataset, generateRandomDataset } from "../helpers";

export const CirclesWithSvg = () => {
  const [dataset, setDataset] = useState(generateRandomDataset());

  return (
    <div>
      <svg viewBox="0 0 100 50" style={{ backgroundColor: "red" }}>
        {dataset.map((d) => (
          <circle key={d[0]} cx={d[0]} cy={d[1]} r={3}></circle>
        ))}
      </svg>
    </div>
  );
};

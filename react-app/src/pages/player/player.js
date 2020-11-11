import React from "react";

export function Player({ details, name, onUpdateScore, winner }) {
  console.log(details, name);
  const addToScore = () => {
    if (!winner) {
      onUpdateScore(details._id);
    }
  };
  return (
    <>
      <div className="col-6" align="center">
        <h1>{name}</h1>
        <div className="p-3 mb-2 bg-light text-dark" onClick={addToScore}>
          {details.score}
        </div>
        {details.isServing && (
          <div className="alert alert-info">Is serving</div>
        )}
        {details.winner && <div className="alert alert-success">Winner</div>}
      </div>
    </>
  );
}

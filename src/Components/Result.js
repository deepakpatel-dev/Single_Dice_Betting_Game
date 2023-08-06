import React from "react";

const Result = ({ winner, amount }) => {
  return (
    <div>
      {winner ? (
        <div>
          <h2>Winner: Dice {winner}</h2>
          <p>You won ${amount}</p>
        </div>
      ) : (
        <div>
          <h2>No Winner</h2>
          <p>You lost ${amount}</p>
        </div>
      )}
    </div>
  );
};

export default Result;

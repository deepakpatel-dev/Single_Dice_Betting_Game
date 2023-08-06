import React, { useState, useEffect } from "react";

const Timer = ({ onTimeout }) => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(timer);
      onTimeout(); // Call the onTimeout function when the timer reaches 0
    }

    return () => clearInterval(timer);
  }, [seconds, onTimeout]);

  return <div>Time Left: {seconds} seconds</div>;
};

export default Timer;

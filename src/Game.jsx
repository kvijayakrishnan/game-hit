import React, { useState, useEffect } from "react";

const Game = () => {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [activeBox, setActiveBox] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setGameOver(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * 9);
        setActiveBox(randomIndex);

        setTimeout(() => {
          setActiveBox(null);
        }, 1000);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [gameOver]);

  const handleClick = (index) => {
    if (index === activeBox) {
      setScore((prev) => prev + 5);
      setActiveBox(null);
    } else {
      setScore((prev) => prev - 2.5);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Click the Box Game</h1>
      <h2>Score: {score}</h2>
      <h2>Time Left: {timeLeft}s</h2>
      {gameOver ? (
        <h2>Game Over! Final Score: {score}</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 100px)",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {grid.map((_, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: activeBox === index ? "yellow" : "lightgray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid black",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              {activeBox === index ? "Keyword" : ""}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Game;

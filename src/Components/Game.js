import React, { useState } from "react";
import { Grid, Typography, AppBar, Toolbar, Box, Button } from "@mui/material";
import DicePosition from "./DicePosition";
import Timer from "./Timer";
import Result from "./Result";

const Game = () => {
  const [balance, setBalance] = useState(100);
  const [bets, setBets] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  const [disabled, setDisabled] = useState(true);
  const [result, setResult] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleBetChange = (position, amount) => {
    setBets((prevBets) => ({
      ...prevBets,
      [position]: amount
    }));
  };

  const startGame = () => {
    // Reset the board for a new game
    setResult(null);
    setBets({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    setDisabled(false);
    setGameStarted(true);
  };

  const handleTimerTimeout = () => {
    // Disable betting after 10 seconds
    setDisabled(true);

    // Roll the dice and determine the winner after 12 seconds
    setTimeout(() => {
      const winner = Math.floor(Math.random() * 6) + 1;
      const amount = bets[winner] * 2;
      setResult({ winner, amount });

      // Update the balance based on the result
      setBalance((prevBalance) =>
        winner ? prevBalance + amount : prevBalance - bets[winner]
      );

      // Wait for 5 seconds and then start a new game
      setTimeout(() => {
        setGameStarted(false);
      }, 5000);
    }, 12000);
  };

  return (
    <div>
      <AppBar position="static" style={{ background: "#2196f3" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Single Dice Betting Game
          </Typography>
        </Toolbar>
      </AppBar>
      <Box p={2} bgcolor="#f5f5f5">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {Object.keys(bets).map((position) => (
            <Grid item key={position} xs={12} sm={6} md={4} lg={2}>
              <DicePosition
                position={parseInt(position)}
                bet={bets[position]}
                onChange={handleBetChange}
                disabled={disabled || !gameStarted}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            {result ? (
              <Result winner={result.winner} amount={result.amount} />
            ) : (
              gameStarted && (
                <Timer onTimeout={handleTimerTimeout} disabled={disabled} />
              )
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Balance: ${balance}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {!gameStarted && (
              <Button variant="contained" color="primary" onClick={startGame}>
                Start Game
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Game;

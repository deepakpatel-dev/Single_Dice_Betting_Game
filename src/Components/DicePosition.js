import React from "react";
import { Grid, Typography, Button } from "@mui/material";

const DicePosition = ({ position, bet, onChange, disabled }) => {
  const handleBetClick = (amount) => {
    onChange(position, amount);
  };

  const diceColors = [
    "#f44336",
    "#ff9800",
    "#ffeb3b",
    "#4caf50",
    "#2196f3",
    "#9c27b0"
  ];
  const enabledButtonStyle = { backgroundColor: "#2196f3", color: "white" };
  const disabledButtonStyle = {
    backgroundColor: "#f5f5f5",
    color: "rgba(0, 0, 0, 0.26)"
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={2} textAlign="center">
      <div
        style={{
          background: diceColors[position - 1],
          padding: "10px",
          borderRadius: "5px"
        }}
      >
        <Typography variant="h5" color="white">
          Dice {position}
        </Typography>
        <Typography variant="subtitle1" color="white">
          Current Bet: ${bet}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => handleBetClick(bet + 1)}
          disabled={disabled}
          style={disabled ? disabledButtonStyle : enabledButtonStyle}
        >
          +
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleBetClick(Math.max(bet - 1, 0))}
          disabled={disabled}
          style={disabled ? disabledButtonStyle : enabledButtonStyle}
        >
          -
        </Button>
      </div>
    </Grid>
  );
};

export default DicePosition;

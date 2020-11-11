import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    players: [],
  },
  reducers: {
    addPlayer: (state, action) => {
      state.players = [...state.players, action.payload]; // state.players.push(action.payload)
    },
    updatePlayers: (state, action) => {
      state.players = action.payload;
    },
  },
});

//actions
export const { addPlayer, updatePlayers } = gameSlice.actions;

//slector
export const players = (state) => state.game.players;

export default gameSlice.reducer;

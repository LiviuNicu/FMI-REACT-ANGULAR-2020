import { createSlice } from "@reduxjs/toolkit";
import { privateApi } from "../api";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    players: [],
    games: [],
  },
  reducers: {
    addPlayer: (state, action) => {
      state.players = [...state.players, action.payload]; // state.players.push(action.payload)
    },
    updatePlayers: (state, action) => {
      state.players = action.payload;
    },
    setGames: (state, action) => {
      state.games = action.payload.data;
    },
  },
});

//actions
export const { addPlayer, updatePlayers, setGames } = gameSlice.actions;

//slector
export const players = (state) => state.game.players;
export const games = (state) => state.game.games;

export const doGetHistory = () => async (dispatch) => {
  try {
    const response = await privateApi.get("game/getHistory");
    if (response.status === 200) {
      dispatch(setGames(response));
    }
  } catch (e) {}
};

export const doSaveScore = (data) => async (dispatch) => {
  try {
    const response = await privateApi.post("game/add", data);
    if (response.status === 200) {
      dispatch(doGetHistory());
    }
  } catch (e) {}
};

export default gameSlice.reducer;

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import counterReducer from "./features/counter/counterSlice";
import userReducer from "./slices/userSlice";
import gameSlice from "./slices/gameSlice";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    user: userReducer,
    game: gameSlice,
  });
export default createRootReducer;

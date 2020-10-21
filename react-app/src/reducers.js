import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import counterReducer from "./features/counter/counterSlice";
import userReducer from "./slices/userSlice";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    user: userReducer,
  });
export default createRootReducer;

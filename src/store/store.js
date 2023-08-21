import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import entryReducer from "./entry";

const rootReducer = combineReducers({
  user: userReducer,
  entry: entryReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

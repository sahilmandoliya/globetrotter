import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "./slices/placesSlices"; 
import appReducer from "./slices/appSlice";

const store = configureStore({
  reducer: {
    places: placesReducer,
    app: appReducer,
  },
});

export default store;

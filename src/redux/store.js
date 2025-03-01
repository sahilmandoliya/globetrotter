import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "./slices/placesSlices"; 

const store = configureStore({
  reducer: {
    places: placesReducer,
  },
});

export default store;

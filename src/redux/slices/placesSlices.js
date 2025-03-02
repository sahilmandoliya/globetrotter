import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  places: [],
  loading: false,
  error: null,
};

export const fetchPlaces = createAsyncThunk("places/fetchPlaces", async () => {
  const resp = await fetch("https://globetrottle-server.onrender.com/places");
  if (!resp.ok) throw new Error("Failed to fetch places");
  return resp.json();
});

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default placesSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch leaderboard data
export const fetchLeaderboard = createAsyncThunk(
  "app/fetchLeaderboard",
  async () => {
    const response = await fetch("https://globetrottle-server.onrender.com/leaderboard");
    const data = await response.json();
    return data;
  }
);

const appSlice = createSlice({
  name: "app",
  initialState: {
    username: "", 
    leaderboard: [],
    loading: false,
    error: null,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUsername } = appSlice.actions;
export default appSlice.reducer;

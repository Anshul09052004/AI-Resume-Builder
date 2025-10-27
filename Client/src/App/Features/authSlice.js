import { createSlice } from "@reduxjs/toolkit";

// 🔹 Step 1: Load saved data from localStorage (if available)
const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: savedToken || null,
    user: savedUser || null,
    loading: false,
  },
  reducers: {
    // 🔹 When login happens
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      // ✅ Save in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    // 🔹 When logout happens
    logout: (state) => {
      state.token = null;
      state.user = null;

      // ✅ Remove from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    // 🔹 For managing loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;

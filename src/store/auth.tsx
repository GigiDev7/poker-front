import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../api/auth";

interface IState {
  user: {
    email: string;
    firstname: string;
    lastname: string;
    _id: string;
  } | null;
  error: string | null;
  loading: boolean;
}

const initialState: IState = { user: null, error: null, loading: false };

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(data.email, data.password);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    data: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await authAPI.register(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    }),
      builder.addCase(loginUser.rejected, (state, action: any) => {
        state.error = action.payload.msg || "Something went wrong";
        state.loading = false;
      }),
      builder.addCase(loginUser.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(registerUser.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
      }),
      builder.addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.msg || "Something went wrong";
      }),
      builder.addCase(registerUser.pending, (state) => {
        state.loading = true;
      });
  },
});

export const authAction = authSlice.actions;

export default authSlice;

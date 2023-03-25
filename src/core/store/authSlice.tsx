import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOCALSTORAGE_USERS_KEY } from "commons/constants/auth";
import { UserAuthData } from "types/shared.types";
import { mock } from "utils/helpers";
import { RootState } from "./store";

export interface AuthStateInterface {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialAuthState: AuthStateInterface = {
  isAuthenticated: false,
  isLoading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (values: UserAuthData) => {
    let isUserFound = false;
    let isPasswordCorrect = false;
    const usersArray: Array<UserAuthData> = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_USERS_KEY)!
    );
    isUserFound = usersArray.find((x) => x.email === values.email)
      ? true
      : false;
    if (isUserFound) {
      isPasswordCorrect = usersArray.find((x) => x.password === values.password)
        ? true
        : false;
    }
    try {
      return await mock(isPasswordCorrect, 2000);
    } catch (error) {
      throw new Error();
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { logout } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.authSlice.isAuthenticated;
export const selectIsAuthenticationPending = (state: RootState) =>
  state.authSlice.isLoading;

export default authSlice.reducer;

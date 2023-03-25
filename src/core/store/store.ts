import {
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import profilesSlice from "features/Profiles/redux/profilesSlice";
import authSlice from "./authSlice";

const combinedReducer = combineReducers({
  profilesSlice: profilesSlice,
  authSlice: authSlice,
});

export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/logout") {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

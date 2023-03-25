import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "core/store/store";
import { Profile, ProfileFormValuesInterface } from "types/shared.types";
import { formValuesToStateValues, mock } from "utils/helpers";
import { v4 as uuidv4 } from "uuid";

export interface ProfilesStateInterface {
  profiles: Profile[];
  isLoading: boolean;
}

const initialProfilesState: ProfilesStateInterface = {
  profiles: [
    {
      id: uuidv4(),
      name: "Name",
      surname: "Surname",
      email: "test@mail.com",
      date: "19.06.1994",
      userType: "Administrator",
      gdpr: false,
    },
    {
      id: uuidv4(),
      name: "John",
      surname: "Doe",
      email: "test@mail.com",
      date: "12.03.1999",
      userType: "Administrator",
      gdpr: false,
    },
    {
      id: uuidv4(),
      name: "Adam",
      surname: "Kowalski",
      email: "test@mail.com",
      date: "12.03.2008",
      userType: "Basic user",
      gdpr: true,
    },
    {
      id: uuidv4(),
      name: "Mary",
      surname: "Jane",
      email: "test@mail.com",
      date: "12.03.1990",
      userType: "Administrator",
      gdpr: true,
    },
    {
      id: uuidv4(),
      name: "Peter",
      surname: "Parker",
      email: "test@mail.com",
      date: "10.10.1986",
      userType: "Superuser",
      gdpr: false,
    },
  ],
  isLoading: false,
};

export const addProfile = createAsyncThunk(
  "profiles/addProfile",
  async (values: ProfileFormValuesInterface) => {
    try {
      await mock(true, 1000);
      return {
        id: uuidv4(),
        ...formValuesToStateValues(values),
      };
    } catch (error) {
      throw new Error();
    }
  }
);

export const deleteProfile = createAsyncThunk(
  "profiles/deleteProfile",
  async (id: string) => {
    try {
      await mock(true, 1000);
      return id;
    } catch (error) {
      throw new Error();
    }
  }
);

export const editProfile = createAsyncThunk(
  "profiles/editProfile",
  async (values: { id: string; formValues: ProfileFormValuesInterface }) => {
    try {
      await mock(true, 1000);
      const response = {
        id: values.id,
        ...formValuesToStateValues(values.formValues),
      };
      return response;
    } catch (error) {
      throw new Error();
    }
  }
);

const profilesSlice = createSlice({
  name: "profiles",
  initialState: initialProfilesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProfile.fulfilled, (state, action) => {
      state.profiles = [...state.profiles, action.payload];
      state.isLoading = false;
    });
    builder.addCase(deleteProfile.fulfilled, (state, action) => {
      const id = action.payload;
      state.profiles = state.profiles.filter((profile) => profile.id !== id);
      state.isLoading = false;
    });
    builder.addCase(
      editProfile.fulfilled,
      (state, action: PayloadAction<Profile>) => {
        let profileIndex = state.profiles.findIndex(
          (profile) => profile.id === action.payload.id
        );

        if (profileIndex >= 0) {
          state.profiles[profileIndex] = action.payload;
        }
        state.isLoading = false;
      }
    );
    builder.addCase(editProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProfile.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const selectProfiles = (state: RootState) =>
  state.profilesSlice.profiles;
export const selectIsProfilesLoading = (state: RootState) =>
  state.profilesSlice.isLoading;

export default profilesSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getMyProfile, createProfile, updateProfile, uploadResume } from './profileAPI';

export const fetchProfile = createAsyncThunk(
    "profile/fetchProfile",

    async (_, thunkAPI) => {
        try {
            const res = await getMyProfile();

            return res.data.profile;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data
            );
        }
    }
);

//create profile
export const createProfileThunk = createAsyncThunk(
    "profile/createProfile",

    async (data, thunkAPI) => {
        try{
            const res = await createProfile(data);

            return res.data.profile;
        }
        catch(err){
             return thunkAPI.rejectWithValue(
                err.response.data
             );
        }
    }
);

//update profile
export const updateProfileThunk = createAsyncThunk(
    "profile/updateProfile",

    async(data, thunkAPI) => {
        try{
            const res = await updateProfile(data);
            return res.data.profile;
        }
        catch(err){
            return thunkAPI.rejectWithValue(
                err.response.data
            );
        }
    }
);

//UPLOAD RESUME
export const uploadResumeThunk = createAsyncThunk(
    "profile/uploadResume",

    async(formData, thunkAPI) => {
       try{
        const res = await uploadResume(formData);

        return res.data.profile;
       }
       catch(err){
          return thunkAPI.rejectWithValue(
            err.response.data
          );
       }
    }
);

const profileSlice = createSlice({
    name: "profile",

    initialState: {
        profile: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder 
        // FETCH PROFILE
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })

      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE PROFILE
      .addCase(createProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      // UPDATE PROFILE
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      // UPLOAD RESUME
      .addCase(uploadResumeThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
    },
});

export default profileSlice.reducer;
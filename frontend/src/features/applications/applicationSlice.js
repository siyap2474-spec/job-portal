import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { applyForJob, getMyApplications } from "./applicationAPI";

//apply job
export const applyForJobThunk = createAsyncThunk(
    'applications/applyForJob',

    async (jobId, thunkAPI) => {
        try {
            const res = await applyForJob(jobId);

            return res.data.application;

        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data
            );
        }
    }
);

//fetch application
export const fetchApplications = createAsyncThunk(
    'application/fetchApplications',

    async (_, thunkAPI) => {

        try {
            const res = await getMyApplications();
            return res.data.applications;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data
            );
        }
    }
);

const applicationSlice = createSlice({
    name: "applications",
    initialState: {
        applications: [],
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(fetchApplications.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload;
            })

            .addCase(fetchApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //apply job
            .addCase(applyForJobThunk.fulfilled, (state, action) => {
                state.applications.push(action.payload);
            });
    },
});


export default applicationSlice.reducer;
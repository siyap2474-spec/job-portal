import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { saveJob, getSavedJobs, removeSavedJob } from "./savedJobsAPI"

//GET SAVED JOBS
export const fetchSavedJobs = createAsyncThunk(
    "savedJobs/fetchSavedJobs",
    async(_, thunkAPI) => {
        try{
            const res = await getSavedJobs();
            return res.data.savedJobs;
        } 
        catch(err){
            return thunkAPI.rejectWithValue(err.respomse.data);
        }
    }
);

//SAVE JOB
export const saveJobThunk = createAsyncThunk(
    "savedJobs/saveJob",
    async(jobId, thunkAPI) => {
        try{
            const res = await saveJob(jobId);
            return res.data.saved;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

//REMOVE SAVED JOB
export const removeSavedJobThunk = createAsyncThunk(
    "savedJobs/removeSavedJob",
    async(jobId, thunkAPI) => {
        try{
            await removeSavedJob(jobId);
            return jobId;
        }
        catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


const savedJobsSlice = createSlice({
    name: "savedJobs",
    initialState: {
        savedJobs: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder

        //GET SAVED JOBS
        .addCase(fetchSavedJobs.pending, (state) => {
            state.loading = true;
        })

        .addCase(fetchSavedJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.savedJobs = action.payload;
        })

        .addCase(fetchSavedJobs.rejected, (state, action ) => {
            state.loading = false;
            state.error= action.payload;
        })



        //SAVE JOB
        .addCase(saveJobThunk.fulfilled, (state,action) => {
            state.savedJobs.push(action.payload);
        })

        //REMOVE JOB
        .addCase(removeSavedJobThunk.fulfilled, (state, action) => {
            state.savedJobs = state.savedJobs.filter(
                (job) => job.job._id !== action.payload
            );
        });
    },
});

export default savedJobsSlice.reducer;
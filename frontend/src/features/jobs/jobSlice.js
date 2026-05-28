import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createJob, getRecruiterJobs, deleteJob } from './jobAPI';

// FETCH RECRUITER JOBS
export const fetchRecruiterJobs = createAsyncThunk(
    "jobs/fetchRecruiterJobs",

    async (_, thunkAPI) => {

        try {

            const res = await getRecruiterJobs();

            return res.data.jobs;

        } catch (err) {

            return thunkAPI.rejectWithValue(
                err.response.data
            );

        }

    }

);

// DELETE JOB
export const deleteJobThunk = createAsyncThunk(
    "jobs/deleteJob",

    async (jobId, thunkAPI) => {

        try {

            await deleteJob(jobId);

            return jobId;

        } catch (err) {

            return thunkAPI.rejectWithValue(
                err.response.data
            );

        }

    }
);

//create job thunk
export const createJobThunk = createAsyncThunk(
    'jobs/createJob',

    async (jobData, thunkAPI) => {
        try {
            const res = await createJob(jobData);

            return res.data.job;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data
            );
        }
    }
);

const jobSlice = createSlice({
    name: "jobs",

    initialState: {
        jobs: [],
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder


            // FETCH RECRUITER JOBS
            .addCase(fetchRecruiterJobs.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchRecruiterJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })

            .addCase(fetchRecruiterJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // DELETE JOB
            .addCase(deleteJobThunk.pending, (state) => {
                state.loading = true;
            })

            .addCase(deleteJobThunk.fulfilled, (state, action) => {
                state.loading = false;

                state.jobs = state.jobs.filter(
                    (job) => job._id !== action.payload
                );
            })

            .addCase(deleteJobThunk.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            })

            //create job
            .addCase(createJobThunk.pending, (state) => {
                state.loading = true;
            })

            .addCase(createJobThunk.fulfilled, (state, action) => {
                state.loading = false;

                state.jobs.push(action.payload);
            })

            .addCase(createJobThunk.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            });
    },
});

export default jobSlice.reducer;
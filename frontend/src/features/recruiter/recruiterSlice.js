import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import {
  getApplicantsForJob,
  updateApplicationStatus
} from "./recruiterAPI";


// FETCH APPLICANTS
export const fetchApplicantsThunk =
  createAsyncThunk(
    "recruiter/fetchApplicants",

    async (jobId, thunkAPI) => {
      try {

        const res =
          await getApplicantsForJob(jobId);

        return res.data.applications;

      } catch (err) {

        return thunkAPI.rejectWithValue(
          err.response.data
        );

      }
    }
  );


// UPDATE STATUS
export const updateStatusThunk =
  createAsyncThunk(
    "recruiter/updateStatus",

    async (
      { applicationId, status },
      thunkAPI
    ) => {

      try {

        const res =
          await updateApplicationStatus(
            applicationId,
            status
          );

        return res.data.application;

      } catch (err) {

        return thunkAPI.rejectWithValue(
          err.response.data
        );

      }
    }
  );



const recruiterSlice = createSlice({
  name: "recruiter",

  initialState: {
    applicants: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      // FETCH APPLICANTS

      .addCase(
        fetchApplicantsThunk.pending,
        (state) => {

          state.loading = true;

        }
      )

      .addCase(
        fetchApplicantsThunk.fulfilled,
        (state, action) => {

          state.loading = false;

          state.applicants =
            action.payload;

        }
      )

      .addCase(
        fetchApplicantsThunk.rejected,
        (state, action) => {

          state.loading = false;

          state.error = action.payload;

        }
      )


      // UPDATE STATUS

      .addCase(updateStatusThunk.fulfilled, (state, action) => {
        const updatedApplication = action.payload;

        state.applicants = state.applicants.map((app) =>
          app._id === updatedApplication._id
            ? {
              ...app,
              ...updatedApplication,
              applicant: app.applicant // preserve name/email
            }
            : app
        );
      });
  }
});

export default recruiterSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getMyNotifications,
    markNotificationAsRead,
} from './notificationAPI';

// FETCH NOTIFICATION 
export const fetchNotifications = createAsyncThunk(
    "notifications/fetchNotifications",

    async(_, thunkAPI) => {
        try{
            const res = await getMyNotifications();

            return res.data.notifications()
        }
        catch(err) {
            return thunkAPI.rejectWithValue(
                Error.RESPONSE.DATA
            );
        }
    }
);

//MARK AS READ
export const markAsReadThunk = createAsyncThunk(
    "notifications/markAsRead",

    async(_, thunkAPI) => {
        try{
            const res = await markNotificationAsRead(id);

            return res.data.notification;
        }
        catch(err){
            return thunkAPI.rejectWithValue(
                err.response.data
            );
        }
    }
);


const notificationSlice = createSlice({
    name: "notifications",

    initialState:{
    notifications: [],
    loading: false,
    error: null,

},

    reducers: {},

    extraReducers: (builder) => {
        builder

        //FETCH
        .addCase(fetchNotifications.pending, (state) => {
            state.loading = true;
        })

        .addCase(fetchNotifications.fulfilled, (state, action) => {
             state.loading = false;
             state.notifications = action.payload;
        })

        .addCase(fetchNotifications.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //MARK AS READ
        .addCase(markAsReadThunk.fulfilled, (state,action) => {
            const updateNotification = action.payload;

            const index = state.notifications = action.findIndex(
                (n) => n._id === updateNotification._id
            );
          
            if(index !== -1){
                state.notifications[index] = updatedNotification;
            }
        });
    },
});

export default notificationSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000"

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    massage: ""
};

export const loginUser = createAsyncThunk("user/loginUser", async(user, thunkAPI) => {
    try {
        const response = await axios.post(`${baseUrl}/login`, {
            username: user.username,
            password: user.password
        });

        return response.data;
    } catch (error) {
        if(error.response){
            const massage = error.response.data.msg;
            return thunkAPI.rejectWithValue(massage);
        }
    }
})

export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
    try {
        const response = await axios.get(`${baseUrl}/me`);

        return response.data;
    } catch (error) {
        if(error.response){
            const massage = error.response.data.msg;
            return thunkAPI.rejectWithValue(massage);
        }
    }
})

export const logout = createAsyncThunk("user/logout", async() => {
    await axios.delete(`${baseUrl}/logout`);
})



export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            console.log(state.user);
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.massage = action.payload;
        })


        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.massage = action.payload;
        })
    }
})


export const {reset} = authSlice.actions;
export default authSlice.reducer;
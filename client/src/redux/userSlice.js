import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const API_REGISTER = `http://localhost:5000/api/users/`;
const API_LOGIN = `http://localhost:5000/api/users/login`;
const API_FETCH_USERS = `http://localhost:5000/api/users/login`;
const API_CURRENT_USER= `http://localhost:5000/api/users/me`;
export const register = createAsyncThunk('user/register', async (userData, {rejectWithValue}) => {
    try {
       const res = await axios.post(API_REGISTER, userData);
       return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Erreur API');
    }
});
export const login = createAsyncThunk('user/login', async (userData, {rejectWithValue}) => {
  try {
      const res = await axios.post(API_LOGIN, userData);
      return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Erreur API');
  }
});

export const authMe = createAsyncThunk('user/currentUser', async(_, {rejectWithValue}) => {
  try {
      const token = localStorage.getItem('token');
      const config = {headers: {Authorization:`Bearer ${token}`}}
      const res = await axios.get(API_CURRENT_USER, config);
      return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Erreur API');
  }
});
export const fetchAllUsers = createAsyncThunk('user/fetchUsers', async (_, {rejectWithValue}) => {
    try {
        const token = localStorage.getItem('token');
        const config = {headers: {Authorization:`Bearer ${token}`}}
        const res= await axios.get(API_FETCH_USERS, config);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Erreur API');
    }
})


const userSlice = createSlice({
    name:'user',
    initialState: {
        user: null,
        loading: false,
        isConnected: false,
        errors: [],
        users: []
    },
    reducers:{
      reducers: (state) => {
        state.isConnected= false;
        state.user = null;
      }
    },
    extraReducers:(builder) => {
        builder
          .addCase(register.pending, (state, {payload}) => {
            state.loading= true;
            state.errors = null;
          })
          .addCase(register.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.errors = null;
            state.user = payload;
          })
          .addCase(register.rejected, (state, {payload}) => {
            state.loading = false;
            state.errors = payload.errors;
          })
          .addCase(login.pending, (state, {payload}) => {
            state.loading = true;
            state.errors = [];
            state.isConnected = false;
          })
          .addCase(login.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.errors = [];
            state.isConnected = true;
            localStorage.setItem('token', payload.user.token)
          })
          .addCase(login.rejected, (state, {payload}) => {
            state.loading = false;
            state.errors = payload.errors;
            state.isConnected = false;
          })
          .addCase(fetchAllUsers.pending, (state, {payload}) => {
            state.loading = true;
            state.errors = [];
            state.users = payload;
          })
          .addCase(fetchAllUsers.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.errors = [];
          })
          .addCase(fetchAllUsers.rejected, (state, {payload}) => {
            state.loading = false;
            state.errors = payload.errors;
          })
          .addCase(authMe.pending, (state, {payload}) => {
            state.user = null;
            state.loading = true;
            state.errors = [];
          })
          .addCase(authMe.fulfilled, (state, {payload}) => {
            state.user = payload;
            state.errors = [];
          })
          .addCase(authMe.rejected, (state, {payload}) => {
            state.user =  null;
            state.errors = payload.errors;
          })
    },
})

export default userSlice.reducer;